<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL">
  <Communication><SubNetwork name="StationBus" type="8-MMS"><ConnectedAP iedName="IED_BLANK" apName="AP1"><GSE ldInst="LD0" cbName="gcbStatus"><Address><P type="APPID">1001</P></Address></GSE></ConnectedAP></SubNetwork></Communication>
  <IED name="IED_BLANK"><AccessPoint name="AP1"><Server><LDevice inst="LD0"><LN0 lnClass="LLN0" inst=""><DataSet name="dsStatus"><FCDA ldInst="LD0" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST"/></DataSet><GSEControl name="gcbStatus" datSet="dsStatus"/></LN0><LN lnClass="XCBR" inst="1" lnType="XCBR_TYPE"/></LDevice></Server></AccessPoint></IED>
  <DataTypeTemplates><LNodeType id="XCBR_TYPE" lnClass="XCBR"><DO name="Pos" type="SPS_TYPE"/></LNodeType><DOType id="SPS_TYPE" cdc="SPS"><DA name="stVal" bType="BOOLEAN" fc="ST"/></DOType></DataTypeTemplates>
</SCL>
