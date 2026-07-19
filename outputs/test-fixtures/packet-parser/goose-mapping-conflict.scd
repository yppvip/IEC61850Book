<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL">
  <Communication><SubNetwork name="StationBus" type="8-MMS">
    <ConnectedAP iedName="IED_CONFLICT_A" apName="AP1"><GSE ldInst="LD0" cbName="gcbShared"><Address><P type="APPID">1002</P></Address></GSE></ConnectedAP>
    <ConnectedAP iedName="IED_CONFLICT_B" apName="AP1"><GSE ldInst="LD0" cbName="gcbShared"><Address><P type="APPID">1002</P></Address></GSE></ConnectedAP>
  </SubNetwork></Communication>
  <IED name="IED_CONFLICT_A"><AccessPoint name="AP1"><Server><LDevice inst="LD0"><LN0 lnClass="LLN0" inst=""><DataSet name="dsA"><FCDA ldInst="LD0" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST" desc="候选 A"/></DataSet><GSEControl name="gcbShared" datSet="dsA"/></LN0></LDevice></Server></AccessPoint></IED>
  <IED name="IED_CONFLICT_B"><AccessPoint name="AP1"><Server><LDevice inst="LD0"><LN0 lnClass="LLN0" inst=""><DataSet name="dsB"><FCDA ldInst="LD0" lnClass="XSWI" lnInst="1" doName="Pos" daName="stVal" fc="ST" desc="候选 B"/></DataSet><GSEControl name="gcbShared" datSet="dsB"/></LN0></LDevice></Server></AccessPoint></IED>
</SCL>
