"""Technical row transcription, checked against temporary scan column images.
O is default; /M, /C, /C1, /C2 mark presence, trailing T marks transient.
Public inherited rows are represented once, rather than repeated as 91 copies.
"""
FIELD_TEXT='''LPHD|PhyName:DPL/M PhyHealth:INS/M OutOv:SPS Proxy:SPS/M InOv:SPS NumPwrUp:INS WrmStr:INS WacTrg:INS PwrUp:SPS PwrDn:SPS PwrSupAlm:SPS RsStat:SPC/OT
COMMON|Mod:INC/M Beh:INS/M Health:INS/M NamPlt:LPL/M Loc:SPS EEHealth:INS EEName:DPL OpCntRs:INC OpCnt:INS OpTmh:INS
LLN0|Loc:SPS OpTmh:INS Diag:SPC LEDRs:SPC/OT
PDIF|OpCntRs:INC Str:ACD Op:ACT/MT TmASt:CSD DiffAClc:WYE RstA:WYE LinCapac:ASG LoSet:ING HiSet:ING MinOpTmms:ING MaxOpTmms:ING RstMod:ING RsDlTmms:ING TmACrv:CURVE
PDIR|OpCntRs:INC Str:ACD/M Op:ACT/MT RsDlTmms:ING
PDIS|OpCntRs:INC Str:ACD/M Op:ACT/MT PoRch:ASG PhStr:ASG GndStr:ASG DirMod:ING PctRch:ASG Ofs:ASG PctOfs:ASG RisLod:ASG AngLod:ASG TmDlMod:SPG OpDlTmms:ING PhDlMod:SPG PhDlTmms:ING GndDlMod:SPG GndDlTmms:ING X1:ASG LinAng:ASG RisGndRch:ASG RisPhRch:ASG K0Fact:ASG K0FactAng:ASG RsDlTmms:ING
PDOP|OpCntRs:INC Str:ACD/M Op:ACT/MT DirMod:ING StrVal:ASG OpDlTmms:ING RsDlTmms:ING
PDUP|OpCntRs:INC Str:ACD/M Op:ACT/MT StrVal:ASG OpDlTmms:ING RsDlTmms:ING DirMod:ING
PFRC|OpCntRs:INC Str:ACD/M Op:ACT/MT BlkV:SPS StrVal:ASG BlkVal:ASG OpDlTmms:ING RsDlTmms:ING
PHAR|OpCntRs:INC Str:ACD/M HaRst:ING PhStr:ASG PhStop:ASG OpDlTmms:ING RsDlTmms:ING
PHIZ|OpCntRs:INC Str:ACD/M Op:ACT/MT AStr:ASG VStr:ASG HVStr:ASG OpDlTmms:ING RsDlTmms:ING
PIOC|OpCntRs:INC Str:ACD Op:ACT/MT StrVal:ASG
PMRI|OpCntRs:INC Op:ACT/OT StrInh:SPS StrInhTmm:INS SetA:ASG SetTms:ING MaxNumStr:ING MaxWrmStr:ING MaxStrTmm:ING EqTmm:ING InhTmm:ING
PMSS|OpCntRs:INC Str:ACD Op:ACT/OT SetA:ASG SetTms:ING MotStr:ASG LokRotTms:ING
POPF|OpCntRs:INC Str:ACD/M Op:ACT/MT BlkA:SPS BlkV:SPS StrVal:ASG OpDlTmms:ING RsDlTmms:ING BlkValA:ASG BlkValV:ASG
PPAM|OpCntRs:INC Str:ACD/M Op:ACT/MT StrVal:ASG
PSCH|OpCntRs:INC ProTx:SPS/MT ProRx:SPS/MT Str:ACD/M Op:ACT/MT CarRx:ACT LosOfGrd:SPS Echo:ACT WeiOp:ACT RvABlk:ACT GrdRx:SPS SchTyp:ING OpDlTmms:ING CrdTmms:ING DurTmms:ING UnBlkMod:ING SecTmms:ING WeiMod:ING WeiTms:ING PPVVal:ASG PhGndVal:ASG RvAMod:ING RvATmms:ING RvRsTmms:ING
PSDE|OpCntRs:INC Str:ACD/M Op:ACT/OT Ang:ASG GndStr:ASG GndOp:ASG StrDlTmms:ASG OpDlTmms:ASG DirMod:ING
PTEF|OpCntRs:INC Str:ACD/C Op:ACT/CT GndStr:ASG DirMod:ING
PTOC|OpCntRs:INC Str:ACD/M Op:ACT/MT TmASt:CSD TmACrv:CURVE StrVal:ASG TmMult:ASG MinOpTmms:ING MaxOpTmms:ING OpDlTmms:ING TypRsCrv:ING RsDlTmms:ING DirMod:ING
PTOF|OpCntRs:INC Str:ACD/M Op:ACT/MT BlkV:SPS StrVal:ASG/M BlkVal:ASG OpDlTmms:ING RsDlTmms:ING
PTOV|OpCntRs:INC Str:ACD/M Op:ACT/OT TmVSt:CSD TmVCrv:CURVE StrVal:ASG TmMult:ASG MinOpTmms:ING MaxOpTmms:ING OpDlTmms:ING RsDlTmms:ING
PTRC|OpCntRs:INC Tr:ACT/C Op:ACT/C Str:ACD TrMod:ING TrPlsTmms:ING
PTTR|OpCntRs:INC Amp:MV Tmp:MV TmpRl:MV LodRsvAlm:MV LodRsvTr:MV AgeRat:MV Str:ACD Op:ACT/MT AlmThm:ACT TmTmpSt:CSD TmASt:CSD TmTmpCrv:CURVE TmACrv:CURVE TmpMax:ASG StrVal:ASG OpDlTmms:ING MinOpTmms:ING MaxOpTmms:ING RsDlTmms:ING ConsTms:ING AlmVal:ASG
PTUC|OpCntRs:INC Str:ACD/M Op:ACT/MT TmASt:CSD TmACrv:CURVE StrVal:ASG OpDlTmms:ING TmMult:ASG MinOpTmms:ING MaxOpTmms:ING TypRsCrv:ING RsDlTmms:ING DirMod:ING
PTUV|OpCntRs:INC Str:ACD/M Op:ACT/MT TmVSt:CSD TmVCrv:CURVE StrVal:ASG TmMult:ASG MinOpTmms:ING MaxOpTmms:ING OpDlTmms:ING RsDlTmms:ING
PUPF|OpCntRs:INC Str:ACD/M Op:ACT/MT BlkA:SPS BlkV:SPS StrVal:ASG OpDlTmms:ING RsDlTmms:ING BlkValA:ASG BlkValV:ASG
PTUF|OpCntRs:INC Str:ACD/M Op:ACT/MT BlkV:SPS StrVal:ASG BlkVal:ASG OpDlTmms:ING RsDlTmms:ING
PVOC|OpCntRs:INC Str:ACD/M Op:ACT/MT AVSt:CSD TmASt:CSD AVCrv:CURVE TmACrv:CURVE TmMult:ASG MinOpTmms:ING MaxOpTmms:ING OpDlTmms:ING TypRsCrv:ING RsDlTmms:ING
PVPH|OpCntRs:INC Str:ACD/M Op:ACT/MT VHzSt:CSD VHzCrv:CURVE StrVal:ASG OpDlTmms:ING TypRsCrv:ING RsDlTmms:ING TmMult:ASG MinOpTmms:ING MaxOpTmms:ING
PZSU|OpCntRs:INC Str:ACD/M Op:ACT/MT StrVal:ASG OpDlTmms:ING RsDlTmms:ING
RDRE|OpCntRs:INC RcdTrg:SPC MemRs:SPC/OT MemClr:SPC/OT RcdMade:SPS/M FltNum:INS/M GriFltNum:INS RcdStr:SPS MemUsed:INS TrgMod:ING LevMod:ING PreTmms:ING PstTmms:ING MemFull:ING MaxNumRcd:ING ReTrgMod:ING PerTrgTms:ING ExclTmms:ING OpMod:ING
RADR|OpCntRs:INC COMTRADE:INC/M ChTrg:SPS/M ChNum:ING TrgMod:ING LevMod:ING HiTrgLev:ASG LoTrgLev:ASG PreTmms:ING PstTmms:ING
RBDR|OpCntRs:INC COMTRADE:INC/M ChTrg:SPS/M ChNum:ING TrgMod:ING LevMod:ING PreTmms:ING PstTmms:ING
RDRS|AutoUpLod:SPC DltRcd:SPC
RBRF|OpCntRs:INC Str:ACD OpEx:ACT/CT OpIn:ACT/CT FailMod:ING FailTmms:ING SPlTrTmms:ING TPTrTmms:ING DetValA:ASG ReTrMod:ING
RDIR|Dir:ACD/M ChrAng:ASG MinFwdAng:ASG MinRvAng:ASG MaxFwdAng:ASG MaxRvAng:ASG BlkValA:ASG BlkValV:ASG PolQty:ING MinPPV:ASG
RFLO|OpCntRs:INC FltZ:CMV/M FltDiskm:MV/M FltLoop:ACT LinLenKm:ASG R1:ASG X1:ASG R0:ASG X0:ASG Z1Mod:ASG Z1Ang:ASG Z0Mod:ASG Z0Ang:ASG Rm0:ASG Xm0:ASG Zm0Mod:ASG Zm0Ang:ASG
RPSB|OpCntRs:INC Str:ACD/C1 Op:ACT/C2 BlkZn:SPG/C1 ZeroEna:SPG NgEna:SPG MaxEna:SPG SwgVal:ASG SwgRis:ASG SwgReact:ASG SwgTmms:ING UnBlkTmms:ING MaxNumSlp:ING EvTmms:ING
RREC|OpCntRs:INC BlkRec:SPC ChkRec:SPC Auto:SPS Op:ACT/MT AutoRecSt:INS/M Rec1Tmms:ING Rec2Tmms:ING Rec3Tmms:ING PlsTmms:ING RclTmms:ING
RSYN|RHz:SPC LHz:SPC RV:SPC LV:SPC Rel:SPS/M VInd:SPS AngInd:SPS HzInd:SPS SynPrg:SPS DifVClc:MV DifHzClc:MV DifAngClc:MV DifV:ASG DifHz:ASG DifAng:ASG LivDeaMod:ING DeaLinVal:ASG LivLinVal:ASG DeaBusVal:ASG LivBusVal:ASG PlsTmms:ING BkrTmms:ING
CALH|GrAlm:SPS/M GrWrn:SPS AlmLstOv:SPS
CCGR|EEHealth:INS EEName:DPL OpTmh:INS EnvTmp:MV OilTmpIn:MV OilTmpOut:MV OilMotA:MV FanFlw:MV FanA:MV CECtl:SPC PumpCtlGen:INC PumpCtl:INC FanCtlGen:INC FanCtl:INC Auto:SPS FanOvCur:SPS PumpOvCur:SPS PumpAlm:SPS OilTmpSet:ASG
CILO|EnaOpn:SPS/M EnaCls:SPS/M
CPOW|TmExc:SPS/M StrPOW:SPS OpOpn:ACT/OT OpCls:ACT/OT MaxDlTmms:ING
CSWI|Loc:SPS OpCntRs:INC Pos:DPC/M PosA:DPC PosB:DPC PosC:DPC OpOpn:ACT/OT OpCls:ACT/OT
GAPC|Loc:SPS OpCntRs:INC SPCSO:SPC DPCSO:DPC ISCSO:ISC Auto:SPS Str:ACD/M Op:ACT/MT StrVal:ASG
GGIO|EEHealth:INS EEName:DPL Loc:SPS OpCntRs:INC AnIn:MV SPCSO:SPC DPCSO:DPC ISCSO:ISC IntIn:INS Alm:SPS Ind:SPS
GSAL|OpCntRs:INC/M NumCntRs:INC/M AuthFail:SEC/M AcsCtlFail:SEC/M SvcViol:SEC/M Ina:SEC/M
IARC|OpCntRs:INC/M NumCntRs:INC/M MemOv:SPS/M MemUsed:INS NumRcd:INS MaxNumRcd:ING OpMod:ING MemFull:ING
IHMI|
ITCI|
ITMI|
ANCR|Loc:SPS/M OpCntRs:INC TapChg:BSC/M RCol:SPC LCol:SPC Auto:SPC
ARCO|Loc:SPS/M OpCntRs:INC TapChg:BSC/M Auto:SPC VOvSt:SPS NeutAlm:SPS DschBlk:SPS/OT
ATCC|Loc:SPS/M OpCntRs:INC TapChg:BSC/C TapPos:ISC/C ParOp:DPC/M LTCBlk:SPC LTCDragRs:SPC/OT VRed1:SPC VRed2:SPC CtlV:MV/M LodA:MV CircA:MV PhAng:MV HiCtlV:MV LoCtlV:MV HiDmdA:MV Auto:SPS HiTapPos:INS LoTapPos:INS BndCtr:ASG BndWid:ASG CtlDlTmms:ING LDCR:ASG LDCX:ASG BlkLV:ASG BlkRV:ASG RnbkRV:ASG LimLodA:ASG LDC:SPG TmDlChr:SPG LDCZ:ASG VRedVal:ASG TapBlkR:ING TapBlkL:ING
AVCO|Loc:SPS/M OpCntRs:INC TapChg:BSC/M Auto:SPS BlkEF:SPS BlkAOv:SPS BlkVOv:SPS LimAOv:ASG LimVOv:ASG
MDIF|OpARem:WYE/C Amp1:SAV/C Amp2:SAV/C Amp3:SAV/C
MHAI|EEHealth:INS EEName:DPL Hz:MV/C HA:HWYE HPhV:HWYE HPPV:HDEL HW:HWYE HVAr:HWYE HVA:HWYE HRmsA:WYE HRmsPhV:WYE HRmsPPV:DEL HTuW:WYE HTsW:WYE HATm:WYE Hkf:WYE HTdf:WYE ThdA:WYE ThdOddA:WYE ThdEvnA:WYE TddA:WYE TddOddA:WYE TddEvnA:WYE ThdPhV:WYE ThdOddPhV:WYE ThdEvnPhV:WYE ThdPPV:DEL ThdOddPPV:DEL ThdEvnPPV:DEL HCfPhV:WYE HCfPPV:DEL HCfA:WYE HTif:WYE HzSet:ASG/C EvTmms:ASG NumCyc:ING ThdAVal:ASG ThdVVal:ASG ThdATmms:ING ThdVTmms:ING NomA:ASG
MHAN|EEHealth:INS EEName:DPL Hz:MV/C HaAmp:HMV HaVol:HMV HaWatt:HMV HaVolAmpr:HMV HaVolAmp:HMV HaRmsAmp:MV HaRmsVol:MV HaTuWatt:MV HaTsWatt:MV HaAmpTm:MV HaKFact:MV HaTdFact:MV ThdAmp:MV ThdOddAmp:MV ThdEvnAmp:MV TddAmp:MV TddOddAmp:MV TddEvnAmp:MV ThdVol:MV ThdOddVol:MV ThdEvnVol:MV HaCfAmp:MV HaCfVol:MV HaTiFact:MV HzSet:ASG/C EvTmms:ASG NumCyc:ING ThdAVal:ASG ThdVVal:ASG ThdATmms:ING ThdVTmms:ING NomA:ASG
MMTR|EEHealth:INS EEName:DPL TotVAh:BCR TotWh:BCR TotVArh:BCR SupWh:BCR SupVArh:BCR DmdWh:BCR DmdVArh:BCR
MMXN|EEHealth:INS EEName:DPL Amp:MV Vol:MV Watt:MV VoltAmpr:MV VoltAmp:MV PwrFact:MV Imp:CMV Hz:MV
MMXU|EEHealth:INS TotW:MV TotVAr:MV TotVA:MV TotPF:MV Hz:MV PPV:DEL PhV:WYE A:WYE W:WYE VAr:WYE VA:WYE PF:WYE Z:WYE
MSQI|EEHealth:INS EEName:DPL SeqA:SEQ SeqV:SEQ Dq0Seq:SEQ ImbA:WYE ImbNgA:MV ImbNgV:MV ImbPPV:DEL ImbV:WYE ImbZroA:MV ImbZroV:MV MaxImbA:MV MaxImbPPV:MV MaxImbV:MV
MSTA|EEHealth:INS EEName:DPL AvAmps:MV MaxAmps:MV MinAmps:MV AvVolts:MV MaxVolts:MV MinVolts:MV AvVA:MV MaxVA:MV MinVA:MV AvW:MV MaxW:MV MinW:MV AvVAr:MV MaxVAr:MV MinVAr:MV EvStr:SPC EvTmms:ASG
SARC|EEHealth:INS EEName:DPL OpCntRs:INC FACntRs:INC/M FADet:SPS/M ArcCntRs:INC SwArcDet:SPS
SIMG|EEHealth:INS EEName:DPL Pres:MV Den:MV Tmp:MV InsAlm:SPS/M InsBlk:SPS InsTr:SPS PresAlm:SPS/C DenAlm:SPS/C TmpAlm:SPS/C InsLevMax:SPS InsLevMin:SPS
SIML|EEHealth:INS EEName:DPL Tmp:MV Lev:MV Pres:MV H2O:MV H2OTmp:MV H2:MV InsAlm:SPS/M InsBlk:SPS InsTr:SPS TmpAlm:SPS/C PresTr:SPS/C PresAlm:SPS/C GasInsAlm:SPS GasInsTr:SPS GasFlwTr:SPS InsLevMax:SPS InsLevMin:SPS H2Alm:SPS MstAlm:SPS
SPDC|EEHealth:INS EEName:DPL OpCnt:INS/M AcuPaDsch:MV/C PaDschAlm:SPS/C
XCBR|Loc:SPS/M EEHealth:INS EEName:DPL OpCnt:INS/M Pos:DPC/M BlkOpn:SPC/M BlkCls:SPC/M ChaMotEna:SPC SumSwARs:BCR CBOpCap:INS/M POWCap:INS MaxOpCap:INS
XSWI|Loc:SPS/M EEHealth:INS EEName:DPL OpCnt:INS/M Pos:DPC/M BlkOpn:SPC/M BlkCls:SPC/M ChaMotEna:SPC SwTyp:INS/M SwOpCap:INS/M MaxOpCap:INS
TCTR|EEHealth:INS EEName:DPL OpTmh:INS Amp:SAV/M ARtg:ASG HzRtg:ASG Rat:ASG Cor:ASG AngCor:ASG
TVTR|EEHealth:INS EEName:DPL OpTmh:INS Vol:SAV/M FuFail:SPS VRtg:ASG Rat:ASG Cor:ASG AngCor:ASG
YEFN|Loc:SPS/M EEHealth:INS EEName:DPL OpTmh:INS ECA:MV/M ColTapPos:ISC/M ColPos:APC
YLTC|EEHealth:INS EEName:DPL OpCnt:INS Torq:MV MotDrvA:MV TapPos:ISC/C TapChg:BSC/C EndPosR:SPS/M EndPosL:SPS/M OilFil:SPS
YPSH|EEHealth:INS EEName:DPL OpTmh:INS Pos:DPC/M BlkOpn:SPC/M BlkCls:SPC/M ShOpCap:INS/M ChaMotEna:SPC MaxOpCap:INS
YPTR|EEHealth:INS EEName:DPL OpTmh:INS HPTmp:MV HPTmpAlm:SPS HPTmpTr:SPS/OT OANL:SPS OpOvA:SPS OpOvV:SPS OpUnV:SPS CGAlm:SPS HiVRtg:ASG LoVRtg:ASG PwrRtg:ASG
ZAXN|EEHealth:INS EEName:DPL OpTmh:INS Volt:MV Amp:MV
ZBAT|
ZBSH|RefReact:ASG RefPF:ASG RefV:ASG
ZCAB|EEHealth:INS EEName:DPL OpTmh:INS
ZCAP|EEHealth:INS EEName:DPL OpTmh:INS CapDS:SPS/M DschBlk:SPS/M
ZCON|EEHealth:INS EEName:DPL OpTmh:INS
ZGEN|EEHealth:INS EEName:DPL OpTmh:INS GnCtl:DPC/M DExt:SPC/M AuxSCO:SPC StopVlv:SPC ReactPwrR:SPC ReactPwrL:SPC DmdPwr:MV GnSt:INS/M OANL:SPS/M ClkRot:SPS/M CntClkRot:SPS/M OpUnExt:SPS/M OpOvExt:SPS/M LosOil:SPS LosVac:SPS PresAlm:SPS DmdPwr:ASG PwrRtg:ASG VRtg:ASG
ZGIL|EEHealth:INS EEName:DPL OpTmh:INS
ZLIN|EEHealth:INS EEName:DPL OpTmh:INS
ZMOT|EEHealth:INS EEName:DPL OpTmh:INS DExt:SPC/M LosOil:SPS LosVac:SPS PresAlm:SPS
ZREA|EEHealth:INS EEName:DPL OpTmh:INS
ZRRC|EEHealth:INS EEName:DPL OpTmh:INS
ZSAR|EEHealth:INS EEName:DPL OpCnt:INS OPSA:SPS/MT
ZTCF|EEHealth:INS EEName:DPL OpTmh:INS PwrFrq:ASG
ZTCR|EEHealth:INS EEName:DPL OpTmh:INS'''
FIELDS={}
for line in FIELD_TEXT.splitlines():
    ln,text=line.split('|');FIELDS[ln]=[]
    for token in text.split():
        name,t=token.split(':');parts=t.split('/');cdc=parts[0];flags=parts[1] if len(parts)>1 else 'O'
        transient=flags.endswith('T');presence=flags[:-1] if transient else flags
        FIELDS[ln].append(dict(name=name,cdc=cdc,presence=presence,transient=transient))
