<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL">
  <Communication>
    <SubNetwork name="StationBus" type="8-MMS">
      <ConnectedAP iedName="IED_DEMO" apName="AP1">
        <GSE ldInst="LD0" cbName="gcbStatus"><Address><P type="APPID">1000</P></Address></GSE>
      </ConnectedAP>
    </SubNetwork>
  </Communication>
  <IED name="IED_DEMO">
    <AccessPoint name="AP1"><Server><LDevice inst="LD0">
      <LN0 lnClass="LLN0" inst="">
        <DataSet name="dsStatus">
          <FCDA ldInst="LD0" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST" desc="断路器合分位置"/>
          <FCDA ldInst="LD0" lnClass="XCBR" lnInst="1" doName="Loc" daName="stVal" fc="ST"/>
        </DataSet>
        <GSEControl name="gcbStatus" datSet="dsStatus"/>
      </LN0>
      <LN lnClass="XCBR" inst="1" lnType="XCBR_TYPE"/>
    </LDevice></Server></AccessPoint>
  </IED>
  <DataTypeTemplates>
    <LNodeType id="XCBR_TYPE" lnClass="XCBR">
      <DO name="Pos" type="DPC_TYPE"/><DO name="Loc" type="SPS_TYPE"/>
    </LNodeType>
    <DOType id="DPC_TYPE" cdc="DPC" desc="断路器位置">
      <DA name="stVal" bType="Enum" type="POS_ENUM" fc="ST" desc="断路器位置状态"/>
    </DOType>
    <DOType id="SPS_TYPE" cdc="SPS"><DA name="stVal" bType="BOOLEAN" fc="ST"/></DOType>
    <EnumType id="POS_ENUM"><EnumVal ord="0">off</EnumVal><EnumVal ord="1">on</EnumVal></EnumType>
  </DataTypeTemplates>
</SCL>
