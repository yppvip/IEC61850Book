"""Original, fixed teaching frames. No capture reader or network operations."""
from dataclasses import dataclass, field
import struct, socket, json
from datetime import datetime, timezone

@dataclass
class Part:
    name: str
    raw: bytes = b''
    children: list = field(default_factory=list)
    tag: int | None = None
    layer: str = 'APDU'
    value: str = ''
    meaning: str = ''
    scd: str = ''
    ws: str = ''
    dtype: str = ''

    def encode(self):
        body = b''.join(c.encode() for c in self.children) if self.children else self.raw
        if self.tag is None:
            return body
        n = len(body)
        length = bytes([n]) if n < 128 else bytes([0x81, n]) if n < 256 else b'\x82' + n.to_bytes(2, 'big')
        return bytes([self.tag]) + length + body

    def flatten(self, start=0, depth=0):
        raw = self.encode()
        body_len = sum(len(c.encode()) for c in self.children) if self.children else len(self.raw)
        head = len(raw) - body_len
        result = [dict(name=self.name,start=start,length=len(raw),header=head,depth=depth,layer=self.layer,
                       value=self.value,meaning=self.meaning,scd=self.scd,ws=self.ws,dtype=self.dtype)]
        p = start + head
        for c in self.children:
            result += c.flatten(p, depth+1)
            p += len(c.encode())
        return result

def plain(name, raw, layer, value='', meaning='', scd='', ws='', dtype='octets'):
    return Part(name,raw,layer=layer,value=str(value),meaning=meaning,scd=scd,ws=ws,dtype=dtype)

def tlv(name,tag,raw=b'',children=None,value='',meaning='',scd='',ws='',dtype='ASN.1',layer='APDU'):
    return Part(name,raw,children or [],tag,layer=layer,value=str(value),meaning=meaning,scd=scd,ws=ws,dtype=dtype)

def number(name,tag,n,**kw):
    raw=n.to_bytes(max(1,(n.bit_length()+7)//8),'big')
    if raw[0]&128:raw=b'\x00'+raw
    return tlv(name,tag,raw,value=n,dtype='BER INTEGER',**kw)

def text(name,tag,s,**kw):return tlv(name,tag,s.encode('ascii'),value=s,dtype='VisibleString / Identifier',**kw)

def eth(kind):
    goose=kind=='GOOSE'; dest='010ccd010001' if goose else '010ccd040001'
    return Part('Ethernet II',children=[
        plain('Destination',bytes.fromhex(dest),'Ethernet',':'.join(dest[i:i+2] for i in range(0,12,2)),scd='Communication/ConnectedAP/GSE|SMV/Address/MAC-Address',ws='eth.dst'),
        plain('Source',bytes.fromhex('020000000001'),'Ethernet','02:00:00:00:00:01',meaning='原创本地管理地址；不能由它推断业务',ws='eth.src'),
        plain('EtherType',bytes.fromhex('88b8' if goose else '88ba'),'Ethernet','0x88B8' if goose else '0x88BA',ws='eth.type',dtype='uint16 big-endian')],layer='Ethernet')

def multicast(kind,apdu):
    prefix=kind.lower() if kind=='GOOSE' else 'sv'
    n=8+len(apdu.encode())
    return Part(kind+' frame',children=[eth(kind),Part(kind+' Header',children=[
        plain('APPID',bytes.fromhex('1001' if kind=='GOOSE' else '4001'),'Header','0x1001' if kind=='GOOSE' else '0x4001',scd='GSE|SMV/Address/P[@type="APPID"]（十六进制）',ws=prefix+'.appid',dtype='uint16'),
        plain('Length',n.to_bytes(2,'big'),'Header',n,meaning='从 APPID 开始计数：8 字节固定头 + APDU，不含 Ethernet/FCS',ws=prefix+'.length',dtype='uint16'),
        plain('Reserved1',b'\0\0','Header',0,meaning='本例保留位为零；测试/仿真扩展须按适用版次核对',ws=prefix+'.reserve1'),
        plain('Reserved2',b'\0\0','Header',0,ws=prefix+'.reserve2')],layer='Header'),apdu],layer='Ethernet')

def goose(state=1,st=7,sq=4,seconds=0x65000000,tal=1000):
    ts=seconds.to_bytes(4,'big')+b'\0\0\0\x8a'
    utc=datetime.fromtimestamp(seconds,timezone.utc).isoformat()
    fields=[
        text('gocbRef',0x80,'DemoLD0/LLN0$GO$gcbPos',scd='IED Demo / LD0 / LN0 / GSEControl@name=gcbPos',ws='goose.gocbRef'),
        number('timeAllowedToLive',0x81,tal,meaning='毫秒；下一帧允许等待时间，不等于固定重传周期',ws='goose.timeAllowedtoLive'),
        text('datSet',0x82,'DemoLD0/LLN0$dsPos',scd='GSEControl@datSet=dsPos → DataSet@name=dsPos',ws='goose.datSet'),
        text('goID',0x83,'DemoPos',scd='GSEControl@appID（字符串）',ws='goose.goID'),
        tlv('t / timestamp',0x84,ts,value=utc,meaning='4 字节 UTC 秒 + 3 字节秒小数 + 1 字节时间品质；8A 表示 leapSecondsKnown 和精度码10，教学时间声明',ws='goose.t',dtype='UtcTime (8 octets)'),
        number('stNum',0x85,st,meaning='本例数据集状态变化时加一',ws='goose.stNum'),
        number('sqNum',0x86,sq,meaning='新状态首帧为0；相同状态的后续重传增加',ws='goose.sqNum'),
        tlv('test（早期基线）',0x87,b'\0',value='false',meaning='早期8-1 test；新版本/解码器可能标为simulation，不能混同q.test或保留头S位',ws='goose.simulation / goose.test（依版本）',dtype='BOOLEAN'),
        number('confRev',0x88,1,scd='GSEControl@confRev=1；运行时还应核对当前配置',ws='goose.confRev'),
        tlv('ndsCom',0x89,b'\0',value='false',meaning='无需进一步配置的教学值；不是网络健康证明',ws='goose.ndsCom',dtype='BOOLEAN'),
        number('numDatSetEntries',0x8a,2,scd='dsPos 的两个 FCDA，按声明顺序',ws='goose.numDatSetEntries'),
        tlv('allData',0xab,children=[
            tlv('成员1 · XCBR1.Pos.stVal',0x84,bytes([6,state<<6]),value='1 · off / 分位' if state==1 else '2 · on / 合位',meaning='Dbpos 两个有效位；06是末尾未用位数，40=01xxxxxx，80=10xxxxxx',scd='dsPos/FCDA[1] → XCBR1.Pos.stVal [ST] / bType=Dbpos',ws='goose.bit_string',dtype='BIT STRING (2 bits)',layer='Data'),
            tlv('成员2 · XCBR1.Pos.q',0x84,b'\x03\0\0',value='13 bits = 0',meaning='03为未用位数；validity=good、process源，其余标志清零；只表示本例品质',scd='dsPos/FCDA[2] → XCBR1.Pos.q [ST] / bType=Quality',ws='goose.bit_string',dtype='BIT STRING (13 bits)',layer='Data')],value='2 members',meaning='两个标量成员按dsPos声明顺序组织；Value共9字节',scd='GSEControl@datSet → DataSet dsPos → FCDA[1..2]',ws='goose.allData',dtype='SEQUENCE OF Data',layer='Data')]
    return multicast('GOOSE',tlv('GOOSE APDU',0x61,children=fields,ws='goose.goosePdu_element'))

CHANNELS=['IA','IB','IC','IN','UA','UB','UC','UN']
VALUES=[1000,-500,-500,0,100000,-50000,-50000,0]
def sv(asdus=1):
    frames=[]
    for j in range(asdus):
        channels=[]
        for i,(ch,val) in enumerate(zip(CHANNELS,VALUES)):
            ln=('TCTR' if i<4 else 'TVTR')+str(i%4+1)
            mapping=f'dsSV/FCDA[{2*i+1}] → {ln}.Amp.instMag.i' if i<4 else f'dsSV/FCDA[{2*i+1}] → {ln}.Vol.instMag.i'
            channels += [plain(ch+' value',struct.pack('>i',val),'Data',val,meaning='本教学契约：电流0.001 A/计数、电压0.01 V/计数；瞬时二次值，非RMS',scd=mapping,ws='sv.meas_value（启用相应解码偏好时）',dtype='INT32 big-endian'),
                         plain(ch+' quality',b'\0'*4,'Data','0x00000000',meaning='4字节Quality编码容器；有效品质位与保留位按9-2映射，不能照搬GOOSE的BER位串',scd=f'dsSV/FCDA[{2*i+2}] → {ln}.'+('Amp.q' if i<4 else 'Vol.q'),ws='sv.meas_quality（依配置文件/偏好）',dtype='Quality 4 octets')]
        frames.append(tlv('ASDU '+str(j+1),0x30,children=[
            text('svID',0x80,'DemoSV1',scd='SampledValueControl@smvID=DemoSV1',ws='sv.svID'),
            tlv('smpCnt',0x82,(1000+j).to_bytes(2,'big'),value=1000+j,meaning='2字节采样计数；回绕与时间关联由采样模式/配置文件决定',ws='sv.smpCnt',dtype='unsigned 16-bit mapping'),
            tlv('confRev',0x83,b'\0\0\0\1',value=1,scd='SampledValueControl@confRev=1',ws='sv.confRev',dtype='unsigned 32-bit mapping'),
            tlv('smpSynch',0x85,b'\x01',value=1,meaning='本例选择local同步标识；不能只由它推出UTC精度/授时有效性，版次须核对',ws='sv.smpSynch',dtype='mapped integer'),
            tlv('sequence of Data / seqData',0x87,children=channels,value='64 octets',meaning='8通道 × (4字节值 + 4字节品质)；字段内没有每通道BER Tag',ws='sv.seqData',dtype='OCTET STRING')],ws='sv.ASDU_element'))
    return multicast('SV',tlv('SV APDU / SavPdu',0x60,children=[number('noASDU',0x80,asdus,ws='sv.noASDU'),tlv('seqASDU',0xa2,children=frames,ws='sv.seqASDU')],ws='sv.savPdu_element'))

def mms_pdu(response=False):
    if response:
        service=tlv('Read Response',0xa4,children=[tlv('listOfAccessResult',0xa1,children=[tlv('AccessResult.success · Pos.stVal',0x84,b'\x06\x80',value='2 · on / 合位',meaning='success直接使用Data的类型标签，不额外包一层success标签；06是未用位数',scd='与同一关联invokeID=1的请求按结果位置对应',ws='mms.bit_string',dtype='BIT STRING (Dbpos)')],ws='mms.listOfAccessResult')],ws='mms.read_element')
    else:
        obj=tlv('domain-specific ObjectName',0xa1,children=[text('domainID',0x1a,'DemoLD0',scd='IED@name=Demo + LDevice@inst=LD0；本例无显式ldName',ws='mms.domainId'),text('itemID',0x1a,'XCBR1$ST$Pos$stVal',scd='XCBR1 / FC=ST / Pos / stVal',ws='mms.itemId')],dtype='ObjectName CHOICE')
        variable=tlv('VariableSpecification.name',0xa0,children=[obj],ws='mms.name')
        variables=tlv('listOfVariable',0xa0,children=[tlv('variable entry',0x30,children=[variable])],ws='mms.listOfVariable')
        service=tlv('Read Request / Service',0xa4,children=[tlv('VariableAccessSpecification [1]',0xa1,children=[variables],meaning='显式包装CHOICE；这里按一个变量读取，不要求DataSet或ReportControl',ws='mms.variableAccessSpecification')],meaning='A4在ConfirmedServiceRequest上下文选择read操作及其参数',ws='mms.read_element')
    return tlv('MMS Confirmed-'+('Response' if response else 'Request')+'PDU',0xa1 if response else 0xa0,children=[number('invokeID',0x02,1,meaning='只在同一关联内将请求和响应配对；InformationReport没有此字段',ws='mms.invokeID'),service],ws='mms.confirmed_ResponsePDU_element' if response else 'mms.confirmed_RequestPDU_element')

def checksum(b):
    if len(b)%2:b+=b'\0'
    n=sum(struct.unpack('!%dH'%(len(b)//2),b))
    while n>>16:n=(n&65535)+(n>>16)
    return (~n)&65535

def mms(response=False):
    pdu=mms_pdu(response)
    pres=tlv('Presentation fully-encoded-data',0x61,children=[tlv('PDV-list',0x30,children=[number('presentation-context-identifier',0x02,3,meaning='本例假定关联已协商MMS上下文ID=3，不能当成所有连接固定值'),tlv('single-ASN1-type',0xa0,children=[pdu])])])
    session=plain('Session DATA / tokens',bytes.fromhex('01000100'),'Transport',meaning='已建立关联中的数据阶段；本帧没有重复ACSE建关联封装')
    cotp=plain('COTP DT',bytes.fromhex('02f080'),'Transport','DT, EOT=1',ws='cotp.type')
    n=4+3+4+len(pres.encode())
    tpkt=plain('TPKT',bytes([3,0])+n.to_bytes(2,'big'),'Transport',n,meaning='版本3、保留0、16位总长度；TCP可分段或合并TPKT',ws='tpkt.length')
    payload=Part('ISO-on-TCP data',children=[tpkt,cotp,session,pres],layer='Transport')
    src=socket.inet_aton('192.0.2.20' if response else '192.0.2.10');dst=socket.inet_aton('192.0.2.10' if response else '192.0.2.20')
    plen=len(payload.encode()); sport,dport=(102,49152) if response else (49152,102)
    tcp=struct.pack('!HHIIHHHH',sport,dport,100 if response else 1,67 if response else 100,0x5018,8192,0,0)
    tcp=tcp[:16]+checksum(src+dst+struct.pack('!BBH',0,6,20+plen)+tcp+payload.encode()).to_bytes(2,'big')+tcp[18:]
    ip=struct.pack('!BBHHHBBH',0x45,0,40+plen,1,0x4000,64,6,0)+src+dst
    ip=ip[:10]+checksum(ip).to_bytes(2,'big')+ip[12:]
    return Part('MMS Ethernet frame',children=[plain('Ethernet II',bytes.fromhex('0200000000010200000000020800' if response else '0200000000020200000000010800'),'Ethernet','IPv4 / 0x0800',meaning='文档专用IP；MAC为原创占位',ws='eth'),plain('IPv4 Header',ip,'Transport',f'{socket.inet_ntoa(src)} → {socket.inet_ntoa(dst)}',meaning='IHL=20，DF=1，TTL=64，Protocol=6，校验和已计算',ws='ip'),plain('TCP Header',tcp,'Transport',f'{sport} → {dport}',meaning='20字节头、PSH/ACK；流号/确认号仅演示同一已建立关联中的数据帧；非完整握手抓包',ws='tcp'),payload],layer='Ethernet')

def examples():
    cases=[('goose-open','GOOSE · 分位稳定重传',goose()),('goose-close','GOOSE · 合位新事件首帧',goose(2,8,0,0x65000001,20)),('goose-retransmit','GOOSE · 合位相同状态重传',goose(2,8,1,0x65000001,40)),('sv-one','SV · 八通道单ASDU',sv()),('sv-two','SV · 两个连续ASDU',sv(2)),('mms-read','MMS · Read Request完整数据帧',mms()),('mms-response','MMS · Read Response完整数据帧',mms(True))]
    result=[]
    for key,label,p in cases:
        data=p.encode()
        result.append(dict(id=key,label=label,hex=data.hex(' '),size=len(data),fields=p.flatten()[1:],note='原创、脱敏、无VLAN；从目的MAC到APDU末尾的完整教学数据帧，不含前导码/SFD/FCS。MMS假定关联已建立，完整请求和响应均列出。'))
    return result

if __name__=='__main__':
    print(json.dumps(examples(),ensure_ascii=False,indent=2))
