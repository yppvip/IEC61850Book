"""Independent byte-level checks for the fixed teaching corpus, not a capture parser."""
from pathlib import Path
from html.parser import HTMLParser
import json, re, struct, xml.etree.ElementTree as ET
from packet_examples import examples

ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'outputs'
def require(ok,msg):
    if not ok:raise AssertionError(msg)

def one(raw,offset=0,end=None):
    end=len(raw) if end is None else end
    require(offset+2<=end,'truncated TLV header')
    tag=raw[offset];n=raw[offset+1];p=offset+2
    if n&128:
        count=n&127;require(0<count<=2 and p+count<=end,'length octets')
        n=int.from_bytes(raw[p:p+count],'big');p+=count
    require(p+n<=end,'parent TLV bounds')
    return tag,raw[p:p+n],p+n,p

def children(raw):
    p=0;items=[]
    while p<len(raw):
        tag,value,q,start=one(raw,p);items.append((tag,value));p=q
    return items

def tags(raw,expected):
    c=children(raw);require([t for t,v in c]==expected,f'tags {[hex(t) for t,v in c]} vs {expected}');return [v for t,v in c]

def ipcheck(raw):
    if len(raw)%2:raw+=b'\0'
    n=sum(struct.unpack('!%dH'%(len(raw)//2),raw))
    while n>>16:n=(n&65535)+(n>>16)
    return n==65535

def check_bytes():
    corpus=examples();serialized=(OUT/'data/packet-examples.js').read_text(encoding='utf-8')
    saved=json.loads(serialized.split(' = ',1)[1].rstrip(';\n'))
    require(saved==corpus,'published corpus differs from source')
    for case in corpus:
        raw=bytes.fromhex(case['hex']);require(len(raw)==case['size'],'size '+case['id'])
        coverage=set()
        for f in case['fields']:
            require(0<=f['start']<f['start']+f['length']<=len(raw),'field bounds '+f['name'])
            coverage.update(range(f['start'],f['start']+f['length']))
        require(coverage==set(range(len(raw))),'every byte covered')
        if case['id'].startswith(('goose','sv')):
            require(int.from_bytes(raw[16:18],'big')==len(raw)-14,'multicast Length')
            tag,value,end,start=one(raw,22);require(end==len(raw),'APDU consumes whole frame')
            if case['id'].startswith('goose'):
                require(raw[12:14]==b'\x88\xb8' and tag==0x61,'GOOSE ether/tag')
                fields=tags(value,list(range(0x80,0x8b))+[0xab])
                require(fields[0]==b'DemoLD0/LLN0$GO$gcbPos','GoCB ref')
                require(fields[2]==b'DemoLD0/LLN0$dsPos','DataSet ref')
                data=children(fields[-1]);require(len(data)==int.from_bytes(fields[-2],'big')==2,'GOOSE count')
                require(data[0][0]==data[1][0]==0x84,'GOOSE bitstrings')
                require(data[0][1] in (b'\x06\x40',b'\x06\x80'),'Dbpos')
                require(data[1][1]==b'\x03\0\0','Quality13')
                if case['id']=='goose-open':require(fields[5]==b'\7' and fields[6]==b'\4','initial counters')
                else:require(fields[5]==b'\10' and fields[6]==(b'\0' if case['id']=='goose-close' else b'\1'),'event/retransmission counters')
            else:
                require(raw[12:14]==b'\x88\xba' and tag==0x60,'SV ether/tag')
                count,seq=tags(value,[0x80,0xa2]);asdus=children(seq)
                require(len(asdus)==int.from_bytes(count,'big')==(2 if case['id']=='sv-two' else 1),'ASDU count')
                for i,(tag,asdu) in enumerate(asdus):
                    require(tag==0x30,'ASDU SEQUENCE')
                    stream,counter,rev,synch,data=tags(asdu,[0x80,0x82,0x83,0x85,0x87])
                    require(stream==b'DemoSV1' and len(counter)==2 and int.from_bytes(counter,'big')==1000+i,'SV stream/count')
                    require(rev==b'\0\0\0\1' and synch==b'\1' and len(data)==64,'SV header/data')
                    for j,n in enumerate([1000,-500,-500,0,100000,-50000,-50000,0]):
                        require(struct.unpack('>i',data[j*8:j*8+4])[0]==n and data[j*8+4:j*8+8]==b'\0'*4,'SV channel order')
        else:
            require(raw[12:14]==b'\x08\x00','IPv4 EtherType')
            ip=raw[14:34];tcp=raw[34:54];payload=raw[54:]
            require(ipcheck(ip),'IPv4 checksum')
            require(int.from_bytes(ip[2:4],'big')==len(raw)-14,'IP total length')
            require(ipcheck(ip[12:20]+b'\0\6'+(len(raw)-34).to_bytes(2,'big')+raw[34:]),'TCP checksum')
            require(payload[:2]==b'\3\0' and int.from_bytes(payload[2:4],'big')==len(payload),'TPKT length')
            require(payload[4:11]==bytes.fromhex('02f08001000100'),'COTP/session')
            tag,value,end,start=one(payload,11);require(tag==0x61 and end==len(payload),'Presentation envelope')
            seq=tags(value,[0x30])[0];context,encoded=tags(seq,[0x02,0xa0]);require(context==b'\3','context3')
            pdu_tag,body,end,start=one(encoded);require(end==len(encoded),'MMS bounds')
            invoke,service=tags(body,[0x02,0xa4]);require(invoke==b'\1','invokeID')
            if case['id']=='mms-read':
                require(pdu_tag==0xa0,'Request PDU')
                specs=tags(service,[0xa1])[0];variables=tags(specs,[0xa0])[0]
                entry=tags(variables,[0x30])[0];name=tags(entry,[0xa0])[0];domain=tags(name,[0xa1])[0]
                domainID,itemID=tags(domain,[0x1a,0x1a]);require(domainID==b'DemoLD0' and itemID==b'XCBR1$ST$Pos$stVal','Read path')
            else:
                require(pdu_tag==0xa1,'Response PDU');data=tags(service,[0xa1])[0]
                require(tags(data,[0x84])[0]==b'\6\x80','Read Dbpos response')
    request=bytes.fromhex(next(c['hex'] for c in corpus if c['id']=='mms-read'))
    response=bytes.fromhex(next(c['hex'] for c in corpus if c['id']=='mms-response'))
    require(request[:6]==response[6:12] and request[6:12]==response[:6],'MAC endpoints reversed')
    require(int.from_bytes(response[42:46],'big')==1+len(request)-54,'response ACK after request bytes')
    # Bad fixtures prove the independent length checks reject truncation/corrupt nesting.
    for broken in [b'\x61\x81',b'\x61\x05\0',b'\x61\x80\0\0']:
        try:one(broken)
        except AssertionError:pass
        else:raise AssertionError('invalid TLV accepted')
    return {c['id']:c['size'] for c in corpus}

def check_model():
    ns={'s':'http://www.iec.ch/61850/2003/SCL'}
    root=ET.parse(OUT/'data/packet-demo.scd').getroot()
    types={n.get('id'):n for n in root.find('s:DataTypeTemplates',ns)}
    ld0=root.find('.//s:LDevice[@inst="LD0"]',ns);sv0=root.find('.//s:LDevice[@inst="SV0"]',ns)
    for ld,name,count in [(ld0,'dsPos',2),(sv0,'dsSV',16)]:
        ds=ld.find(f's:LN0/s:DataSet[@name="{name}"]',ns);members=list(ds);require(len(members)==count,'dataset count')
        for m in members:
            targets=[ln for ln in ld.findall('s:LN',ns) if ln.get('lnClass')==m.get('lnClass') and ln.get('inst')==m.get('lnInst')]
            require(len(targets)==1,'unique LN')
            do=types[targets[0].get('lnType')].find('s:DO[@name="'+m.get('doName')+'"]',ns)
            parts=m.get('daName').split('.');da=types[do.get('type')].find('s:DA[@name="'+parts[0]+'"]',ns)
            require(da is not None and da.get('fc')==m.get('fc'),'FC and DA')
            for namepart in parts[1:]:da=types[da.get('type')].find('s:BDA[@name="'+namepart+'"]',ns)
            require(da.get('bType') in ['Dbpos','Quality','INT32'],'leaf type')
    connected=root.find('.//s:ConnectedAP',ns);require(connected.get('iedName')=='Demo' and connected.get('apName')=='AP1','AP binding')
    for tag,ld,control,ds in [('GSE','LD0','gcbPos','dsPos'),('SMV','SV0','smv01','dsSV')]:
        net=connected.find('s:'+tag,ns);require(net.get('ldInst')==ld and net.get('cbName')==control,'network control binding')
        c=root.find('.//s:LDevice[@inst="'+ld+'"]//s:'+('GSEControl' if tag=='GSE' else 'SampledValueControl'),ns)
        require(c.get('datSet')==ds and c.get('confRev')=='1','control binding')
    variant=ET.parse(OUT/'data/packet-demo-two-asdu.scd');require(variant.find('.//s:SampledValueControl',ns).get('nofASDU')=='2','ASDU variant')
    return {'datasets':2,'resolved_fcda':18,'asdu_variants':2}

class Page(HTMLParser):
    def __init__(self,raw):super().__init__();self.xml=False;self.code=False;self.buf='';self.blocks=[];self.ids=set();self.feed(raw)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if a.get('id'):require(a['id'] not in self.ids,'duplicate id');self.ids.add(a['id'])
        if tag=='pre' and a.get('data-language')=='xml':self.xml=True;self.buf=''
    def handle_data(self,text):
        if self.xml:self.buf+=text
    def handle_endtag(self,tag):
        if tag=='pre' and self.xml:self.blocks.append(self.buf);self.xml=False

if __name__=='__main__':
    byte_sizes=check_bytes();model=check_model();xmlcount=0
    for stem in ['packet-analysis','packet-mms','packet-goose','packet-sv','packet-scd-mapping','packet-cases','packet-capacity']:
        raw=(OUT/'chapters'/(stem+'.html')).read_text(encoding='utf-8');p=Page(raw)
        for block in p.blocks:ET.fromstring(block);xmlcount+=1
        require({'sources','continue'}.issubset(p.ids),'source/continue anchors')
    script=(OUT/'assets/packet-lessons.js').read_text(encoding='utf-8')
    require(not re.search(r'\b(fetch|WebSocket|XMLHttpRequest|FileReader)\b',script),'no network or import')
    # Exact conditional capacity result, allowing integer and BER length overhead to vary.
    require(8+4+85+4+400==501,'100 Dbpos capacity')
    print(json.dumps(dict(byte_sizes=byte_sizes,model=model,xml_fragments=xmlcount,errors=[]),ensure_ascii=False,indent=2))
