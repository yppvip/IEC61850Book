<?xml version="1.0" encoding="UTF-8"?>
<!-- Original partial SCL teaching model. XML well-formed; not a complete XSD-conformant or deployable SCD. -->
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
  <Header id="PacketTeachingOnly"/>
  <Communication>
    <SubNetwork name="DemoNet" type="8-MMS">
      <ConnectedAP iedName="Demo" apName="AP1">
        <Address><P type="IP">192.0.2.20</P></Address>
        <GSE ldInst="LD0" cbName="gcbPos">
          <Address><P type="MAC-Address">01-0C-CD-01-00-01</P><P type="APPID">1001</P></Address>
          <MinTime unit="s" multiplier="m">4</MinTime><MaxTime unit="s" multiplier="m">1000</MaxTime>
        </GSE>
        <SMV ldInst="SV0" cbName="smv01">
          <Address><P type="MAC-Address">01-0C-CD-04-00-01</P><P type="APPID">4001</P></Address>
        </SMV>
      </ConnectedAP>
    </SubNetwork>
  </Communication>
  <IED name="Demo">
    <AccessPoint name="AP1"><Server>
      <LDevice inst="LD0">
        <LN0 lnClass="LLN0" inst="" lnType="DemoLLN0">
          <DataSet name="dsPos">
            <FCDA ldInst="LD0" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
            <FCDA ldInst="LD0" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="q" fc="ST"/>
          </DataSet>
          <GSEControl name="gcbPos" type="GOOSE" appID="DemoPos" datSet="dsPos" confRev="1"/>
          <ReportControl name="brcbPos" rptID="DemoPosReport" datSet="dsPos" confRev="1" buffered="true" bufTime="0">
            <TrgOps dchg="true" qchg="true"/><OptFields seqNum="true" dataSet="true" reasonCode="true"/>
          </ReportControl>
        </LN0>
        <LN lnClass="XCBR" inst="1" prefix="" lnType="DemoXCBR"/>
      </LDevice>
      <LDevice inst="SV0">
        <LN0 lnClass="LLN0" inst="" lnType="DemoLLN0">
          <DataSet name="dsSV">
            <FCDA ldInst="SV0" lnClass="TCTR" lnInst="1" doName="Amp" daName="instMag.i" fc="MX"/>
            <FCDA ldInst="SV0" lnClass="TCTR" lnInst="1" doName="Amp" daName="q" fc="MX"/>
            <FCDA ldInst="SV0" lnClass="TCTR" lnInst="2" doName="Amp" daName="instMag.i" fc="MX"/>
            <FCDA ldInst="SV0" lnClass="TCTR" lnInst="2" doName="Amp" daName="q" fc="MX"/>
            <FCDA ldInst="SV0" lnClass="TCTR" lnInst="3" doName="Amp" daName="instMag.i" fc="MX"/>
            <FCDA ldInst="SV0" lnClass="TCTR" lnInst="3" doName="Amp" daName="q" fc="MX"/>
            <FCDA ldInst="SV0" lnClass="TCTR" lnInst="4" doName="Amp" daName="instMag.i" fc="MX"/>
            <FCDA ldInst="SV0" lnClass="TCTR" lnInst="4" doName="Amp" daName="q" fc="MX"/>
            <FCDA ldInst="SV0" lnClass="TVTR" lnInst="1" doName="Vol" daName="instMag.i" fc="MX"/>
            <FCDA ldInst="SV0" lnClass="TVTR" lnInst="1" doName="Vol" daName="q" fc="MX"/>
            <FCDA ldInst="SV0" lnClass="TVTR" lnInst="2" doName="Vol" daName="instMag.i" fc="MX"/>
            <FCDA ldInst="SV0" lnClass="TVTR" lnInst="2" doName="Vol" daName="q" fc="MX"/>
            <FCDA ldInst="SV0" lnClass="TVTR" lnInst="3" doName="Vol" daName="instMag.i" fc="MX"/>
            <FCDA ldInst="SV0" lnClass="TVTR" lnInst="3" doName="Vol" daName="q" fc="MX"/>
            <FCDA ldInst="SV0" lnClass="TVTR" lnInst="4" doName="Vol" daName="instMag.i" fc="MX"/>
            <FCDA ldInst="SV0" lnClass="TVTR" lnInst="4" doName="Vol" daName="q" fc="MX"/>
          </DataSet>
          <SampledValueControl name="smv01" smvID="DemoSV1" datSet="dsSV" confRev="1" multicast="true" smpRate="80" nofASDU="2">
            <SmvOpts refreshTime="false" sampleSynchronized="true" sampleRate="false" dataSet="false" security="false"/>
          </SampledValueControl>
        </LN0>
        <LN lnClass="TCTR" inst="1" lnType="DemoTCTR"/><LN lnClass="TCTR" inst="2" lnType="DemoTCTR"/>
        <LN lnClass="TCTR" inst="3" lnType="DemoTCTR"/><LN lnClass="TCTR" inst="4" lnType="DemoTCTR"/>
        <LN lnClass="TVTR" inst="1" lnType="DemoTVTR"/><LN lnClass="TVTR" inst="2" lnType="DemoTVTR"/>
        <LN lnClass="TVTR" inst="3" lnType="DemoTVTR"/><LN lnClass="TVTR" inst="4" lnType="DemoTVTR"/>
      </LDevice>
    </Server></AccessPoint>
  </IED>
  <DataTypeTemplates>
    <LNodeType id="DemoLLN0" lnClass="LLN0"/>
    <LNodeType id="DemoXCBR" lnClass="XCBR"><DO name="Pos" type="DemoDPC"/></LNodeType>
    <LNodeType id="DemoTCTR" lnClass="TCTR"><DO name="Amp" type="DemoSAV"/></LNodeType>
    <LNodeType id="DemoTVTR" lnClass="TVTR"><DO name="Vol" type="DemoSAV"/></LNodeType>
    <DOType id="DemoDPC" cdc="DPC"><DA name="stVal" bType="Dbpos" fc="ST" dchg="true"/><DA name="q" bType="Quality" fc="ST" qchg="true"/><DA name="t" bType="Timestamp" fc="ST"/></DOType>
    <DOType id="DemoSAV" cdc="SAV"><DA name="instMag" bType="Struct" type="DemoAnalogue" fc="MX"/><DA name="q" bType="Quality" fc="MX"/><DA name="t" bType="Timestamp" fc="MX"/></DOType>
    <DAType id="DemoAnalogue"><BDA name="i" bType="INT32"/></DAType>
  </DataTypeTemplates>
</SCL>
