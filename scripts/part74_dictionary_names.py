"""Chapter 6 table 9 names, visually checked in the supplied scan. Keep printed variants."""
NAMES_TEXT='''79|AcsCtlFail AcuPaDsch AgeRat Alm AlmLstOv AlmThm AlmVal Amp Ang AngCor AngInd AngLod AnIn ArcCntRs ARtg AStr AuthFail Auto
80|AutoRecSt AutoUpLod AuxSCO AvAmps AVCrv AVSt AvVA AvVAr AvVolts AvW BatHi BatLo BatTest Beh
81|BinIn BkrTmms BlkA BlkAOv BlkCls BlkEF BlkLV BlkOpn BlkRec BlkRV BlkV BlkVal BlkValA BlkValV BlkVOv BlkZn BndCtr BndWid CapDS CarRx CBOpCap CECtl
82|CGAlm ChaMotEna ChkRec ChNum ChrAng Chtrg CircA ClkRot CntClkRot ColPos ColTapPos ConsTms Cor CrdTmms CtlDlTmms CtlV DeaBusVal DeaLinVal Den DenAlm DetValA DExt Diag DifAClc DifAng DifAngClc DifHz DifHzClc DifV DifVClc Dir
83|DirMod DltRcd DmdPwr DmdVArh DmdWh DPCSO DQ0Seq DschBlk DurTmms ECA Echo EEHealth EEName EnaCls EnaOpn EndPosL EndPosR EnvTmp EqTmm EvTmms ExclTmms FACntRs FADet Fail
84|FailMod FailTmms FanA FanCtlGen FanCtl FanFlw FanOvCur FltDiskm FltLoop FltNum FltZ FuFail GasFlwTr GasInsAlm GasInsTr GnCtl
85|GndDlMod GndDlTmms GndStr GnSp GnSt GrAlm GrdRx GriFltNum GrWrn H2 H2Alm H2O H2OTmp HA HaAmp HaAmpTm HaCfAmp HaCfVol HaKFact HaRmsAmp HaRmsVol HaRst HaTdFact HaTiFact HATm HaTsWatt HaTuWatt
86|HaVol HaVolAmp HaVolAmpr HaWatt HCfA HCfPhV HCfPPV Health HiBatVal HiCtlV HiDmdA HiSet HiTapPos HiTrgLev HiVRtg Hkf HPhV HPPV HPTmp HPTmpAlm HPTmpTr HRmsA HRmsPhV HRmsPPV HTdf HTif
87|HTsW HTuW HVA HVAr HVStr HW Hz HzInd HzRtg HzSet IhA IhAmp IhPhV IhPPV IhVA IhVAr IhVol IhVolAmp IhVolAmpr IhW IhWatt ImbA ImbNgA ImbNgV ImbPPV ImbV ImbZroA ImbZroV Ina Ind InhTmm
88|InOv InsAlm InsBlk InsLevMax InsLevMin InsTr IntIn ISCSO K0Fact K0FactAng LCol LDC LDCR LDCX LDCZ LEDRs Lev LevMod LHz LimAOv LimLodA LimVOv LinAng LinCapac LinLenKm
89|LivBusVal LivDeaMod LivLinVal LoBatVal Loc LoCtlV LodA LodRsvAlm LodRsvTr LokRotTms LoSet LosFact LosOfGrd LosOil LosVac LoTapPos LoTrgLev LoVRtg LTCBlk LTCDragRs LV MaxAmps
90|MaxDlTmms MaxEna MaxFwdAng MaxImbA MaxImbPPV MaxImbV MaxNumRcd MaxNumStr MaxOpCap MaxOpTmms MaxRvAng MaxStrTmm MaxVA MaxVAr MaxVolts MaxW MaxWrmStr MemClr MemFull MemOv MmeRs MemUsed MinAmps MinFwdAng MinOpTmms MinPPV MinRvAng MinVA MinVAr MinVolts MinW
91|Mod MotDrvA MotStr
92|MstAlm NamPlt NeutAlm NgEna NomA NumCntRs NumCyc NumPwrUp NumRcd OANL Ofs OilFil OilMotA OilTmpIn OilTmpOut OilTmpSet Op OpARem OpCls OpCnt OpCntRs OpDlTmms OpEx OpIn OpOpn OpOvA OpOvExt OpOvV OPSA OpTmh OpUnExt
93|OpUnV OutOv PaDschAlm ParOp PctOfs PctRch PerTrgTms PF PhA PhAng PhDlMod PhDlTmms PhGndVal PhStop PhStr PhV PhVA PhVAr PhW PhyHealth PhyNam PhZ PlsTmms PmpAlm
94|PmpCtlGen PmpCtl PmpOvCur PolQty PoRch Pos PosA PosB PosC POWCap PPV PPVVal Pres
95|PresAlm PresTr PreTmms ProRx ProTx Proxy PstTmms PwrDn PwrFact PwrRtg PwrSupAlm PwrUp R0 R1 Rat RcdMade RcdMod RcdStr RcdTrg RclTmms RCol ReactPwrL ReactPwrR Rec1Tmms Rec2Tmms Rec3Tmms RefPF RefReact RefV
96|Rel ReTrgMod ReTrMod RHz RisGndRch RisLod RisPhRch Rm0 RnbkRV RsDlTmms RsStat RstA
97|RstMod RV RvABlk RvAMod RvATmms RvRsTmms SchTyp SecTmms SeqA SeqV SetA SetTms
98|ShOpCap SPCSO SPlTrTmms StopVlv Str StrInh StrInhTmm StrPOW StrVal SumSwARs SupVArh SupWh SvcViol SwArcDet SwgReact SwgRis SwgTmms SwgVal
99|SwOpCap SwTyp SynPrg TapBlkL TapBlkR TapChg TapPos TddA TddAmp TddEvnA TddEvnAmp TddOddA TddOddAmp TestRsl ThdA ThdAmp ThdATmms ThdAVal ThdEvnA ThdEvnAmp ThdEvnPhV
100|ThdEvnPPV ThdEvnVol ThdOddA ThdOddAmp ThdOddPhV ThdOddPPV ThdOddVol ThdPhV ThdPPV ThdVol ThdVTmms ThdVVal TmACrv TmDlChr TmDlMod TmExc TmMult Tmp TmpAlm TmpMax TmpRl TmTmpCrv TmTmpSt TmVCrv TmVSt Torq TotPF TotVA
101|TotVAh TotVAr TotVArh TotW TotWh TPTrTmms Tr TrgMod TrMod TrPlsTmms TypRsCrv UnBlkMod UnBlkTmms
102|VHzCrv VHzSt VInd Vol VoltAmp VoltAmpr VolChgRte VOvSt VRed VRedVal VRtg VStr WacTrg Watt WeiMod WeiOp WeiTmms WrmStr X0 X1 Xm0 Z0Ang Z0Mod Z1Ang Z1Mod ZeroEna Zm0Ang Zm0Mod'''
NAMES={int(n):v.split() for n,v in (l.split('|') for l in NAMES_TEXT.splitlines())}
