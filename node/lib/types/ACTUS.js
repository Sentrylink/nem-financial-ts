"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// IPS
var P;
(function (P) {
    P[P["D"] = 0] = "D";
    P[P["W"] = 1] = "W";
    P[P["M"] = 2] = "M";
    P[P["Q"] = 3] = "Q";
    P[P["H"] = 4] = "H";
    P[P["Y"] = 5] = "Y";
})(P = exports.P || (exports.P = {})); // P=[D=Days, W=Weeks, M=Months, Q=Quarters, H=Halfyear, Y=Year]
var S;
(function (S) {
    S[S["LONG"] = 0] = "LONG";
    S[S["SHORT"] = 1] = "SHORT";
})(S = exports.S || (exports.S = {})); // S=[+=long stub,- short stub, {} if S empty then - for short stub]
var BusinessDayConvention;
(function (BusinessDayConvention) {
    BusinessDayConvention[BusinessDayConvention["NULL"] = 0] = "NULL";
    BusinessDayConvention[BusinessDayConvention["SCF"] = 1] = "SCF";
    BusinessDayConvention[BusinessDayConvention["SCMF"] = 2] = "SCMF";
    BusinessDayConvention[BusinessDayConvention["CSF"] = 3] = "CSF";
    BusinessDayConvention[BusinessDayConvention["CSMF"] = 4] = "CSMF";
    BusinessDayConvention[BusinessDayConvention["SCP"] = 5] = "SCP";
    BusinessDayConvention[BusinessDayConvention["SCMP"] = 6] = "SCMP";
    BusinessDayConvention[BusinessDayConvention["CSP"] = 7] = "CSP";
    BusinessDayConvention[BusinessDayConvention["CSMP"] = 8] = "CSMP";
})(BusinessDayConvention = exports.BusinessDayConvention || (exports.BusinessDayConvention = {}));
var Calendar;
(function (Calendar) {
    Calendar[Calendar["NULL"] = 0] = "NULL";
    Calendar[Calendar["NOCALENDAR"] = 1] = "NOCALENDAR";
    Calendar[Calendar["MondayToFriday"] = 2] = "MondayToFriday";
})(Calendar = exports.Calendar || (exports.Calendar = {}));
// @ts-ignore:6196
var ClearingHouse;
(function (ClearingHouse) {
    ClearingHouse[ClearingHouse["YES"] = 0] = "YES";
    ClearingHouse[ClearingHouse["NO"] = 1] = "NO";
})(ClearingHouse = exports.ClearingHouse || (exports.ClearingHouse = {}));
var ContractRole;
(function (ContractRole) {
    ContractRole[ContractRole["RPA"] = 0] = "RPA";
    ContractRole[ContractRole["RPL"] = 1] = "RPL";
    ContractRole[ContractRole["LG"] = 2] = "LG";
    ContractRole[ContractRole["ST"] = 3] = "ST";
    ContractRole[ContractRole["RFL"] = 4] = "RFL";
    ContractRole[ContractRole["BUYER"] = 5] = "BUYER";
    ContractRole[ContractRole["PFL"] = 6] = "PFL";
    ContractRole[ContractRole["SELLER"] = 7] = "SELLER";
    ContractRole[ContractRole["GUARANTOR"] = 8] = "GUARANTOR";
    ContractRole[ContractRole["OBLIGEE"] = 9] = "OBLIGEE";
})(ContractRole = exports.ContractRole || (exports.ContractRole = {}));
var ContractStatus;
(function (ContractStatus) {
    ContractStatus[ContractStatus["PF"] = 0] = "PF";
    ContractStatus[ContractStatus["DL"] = 1] = "DL";
    ContractStatus[ContractStatus["DQ"] = 2] = "DQ";
    ContractStatus[ContractStatus["DF"] = 3] = "DF";
})(ContractStatus = exports.ContractStatus || (exports.ContractStatus = {}));
var ContractType;
(function (ContractType) {
    ContractType[ContractType["PAM"] = 0] = "PAM";
    ContractType[ContractType["ANN"] = 1] = "ANN";
    ContractType[ContractType["NAM"] = 2] = "NAM";
    ContractType[ContractType["LAM"] = 3] = "LAM";
    ContractType[ContractType["LAX"] = 4] = "LAX";
    ContractType[ContractType["CLM"] = 5] = "CLM";
    ContractType[ContractType["UMP"] = 6] = "UMP";
    ContractType[ContractType["CSH"] = 7] = "CSH";
    ContractType[ContractType["STK"] = 8] = "STK";
    ContractType[ContractType["COM"] = 9] = "COM";
    ContractType[ContractType["SWAPS"] = 10] = "SWAPS";
    ContractType[ContractType["SWPPV"] = 11] = "SWPPV";
    ContractType[ContractType["FXOUT"] = 12] = "FXOUT";
    ContractType[ContractType["CAPFL"] = 13] = "CAPFL";
    ContractType[ContractType["FUTUR"] = 14] = "FUTUR";
    ContractType[ContractType["OPTNS"] = 15] = "OPTNS";
    ContractType[ContractType["CEG"] = 16] = "CEG";
    ContractType[ContractType["CEC"] = 17] = "CEC";
})(ContractType = exports.ContractType || (exports.ContractType = {}));
// @ts-ignore:6196
var CyclePointOfInterestPayment;
(function (CyclePointOfInterestPayment) {
    CyclePointOfInterestPayment[CyclePointOfInterestPayment["EndOf"] = 0] = "EndOf";
    CyclePointOfInterestPayment[CyclePointOfInterestPayment["BeginningOf"] = 1] = "BeginningOf";
})(CyclePointOfInterestPayment = exports.CyclePointOfInterestPayment || (exports.CyclePointOfInterestPayment = {}));
// @ts-ignore:6196
var CyclePointOfRateReset;
(function (CyclePointOfRateReset) {
    CyclePointOfRateReset[CyclePointOfRateReset["BeginningOf"] = 0] = "BeginningOf";
    CyclePointOfRateReset[CyclePointOfRateReset["EndOf"] = 1] = "EndOf";
})(CyclePointOfRateReset = exports.CyclePointOfRateReset || (exports.CyclePointOfRateReset = {}));
// @ts-ignore:6196
var CycleTriggerOfOptionality;
(function (CycleTriggerOfOptionality) {
    CycleTriggerOfOptionality[CycleTriggerOfOptionality["IP"] = 0] = "IP";
    CycleTriggerOfOptionality[CycleTriggerOfOptionality["PR"] = 1] = "PR";
    CycleTriggerOfOptionality[CycleTriggerOfOptionality["RR"] = 2] = "RR";
})(CycleTriggerOfOptionality = exports.CycleTriggerOfOptionality || (exports.CycleTriggerOfOptionality = {}));
var DayCountConvention;
(function (DayCountConvention) {
    DayCountConvention[DayCountConvention["A/AISDA"] = 0] = "A/AISDA";
    DayCountConvention[DayCountConvention["A/360"] = 1] = "A/360";
    DayCountConvention[DayCountConvention["A/365"] = 2] = "A/365";
    DayCountConvention[DayCountConvention["30E/360ISDA"] = 3] = "30E/360ISDA";
    DayCountConvention[DayCountConvention["30E/360"] = 4] = "30E/360";
    DayCountConvention[DayCountConvention["30/360"] = 5] = "30/360";
    DayCountConvention[DayCountConvention["BUS/252"] = 6] = "BUS/252";
})(DayCountConvention = exports.DayCountConvention || (exports.DayCountConvention = {}));
var EndOfMonthConvention;
(function (EndOfMonthConvention) {
    EndOfMonthConvention[EndOfMonthConvention["SD"] = 0] = "SD";
    EndOfMonthConvention[EndOfMonthConvention["EOM"] = 1] = "EOM";
})(EndOfMonthConvention = exports.EndOfMonthConvention || (exports.EndOfMonthConvention = {}));
// @ts-ignore:6196
var EventLevel;
(function (EventLevel) {
    EventLevel[EventLevel["P"] = 0] = "P";
})(EventLevel = exports.EventLevel || (exports.EventLevel = {}));
var EventType;
(function (EventType) {
    EventType[EventType["AD"] = 0] = "AD";
    EventType[EventType["CD"] = 1] = "CD";
    EventType[EventType["DV"] = 2] = "DV";
    EventType[EventType["XD"] = 3] = "XD";
    EventType[EventType["FP"] = 4] = "FP";
    EventType[EventType["IED"] = 5] = "IED";
    EventType[EventType["IPCB"] = 6] = "IPCB";
    EventType[EventType["IPCI"] = 7] = "IPCI";
    EventType[EventType["IP"] = 8] = "IP";
    EventType[EventType["MR"] = 9] = "MR";
    EventType[EventType["MD"] = 10] = "MD";
    EventType[EventType["PY"] = 11] = "PY";
    EventType[EventType["PD"] = 12] = "PD";
    EventType[EventType["PRF"] = 13] = "PRF";
    EventType[EventType["PP"] = 14] = "PP";
    EventType[EventType["PR"] = 15] = "PR";
    EventType[EventType["PRD"] = 16] = "PRD";
    EventType[EventType["RRF"] = 17] = "RRF";
    EventType[EventType["RR"] = 18] = "RR";
    EventType[EventType["SC"] = 19] = "SC";
    EventType[EventType["STD"] = 20] = "STD";
    EventType[EventType["TD"] = 21] = "TD";
})(EventType = exports.EventType || (exports.EventType = {}));
var FeeBasis;
(function (FeeBasis) {
    FeeBasis[FeeBasis["A"] = 0] = "A";
    FeeBasis[FeeBasis["N"] = 1] = "N";
})(FeeBasis = exports.FeeBasis || (exports.FeeBasis = {}));
// @ts-ignore:6196
var InterestCalculationBase;
(function (InterestCalculationBase) {
    InterestCalculationBase[InterestCalculationBase["NT"] = 0] = "NT";
    InterestCalculationBase[InterestCalculationBase["NTIED"] = 1] = "NTIED";
    InterestCalculationBase[InterestCalculationBase["NTL"] = 2] = "NTL";
})(InterestCalculationBase = exports.InterestCalculationBase || (exports.InterestCalculationBase = {}));
// @ts-ignore:6196
var MarketObjectCodeOfRateReset;
(function (MarketObjectCodeOfRateReset) {
    MarketObjectCodeOfRateReset[MarketObjectCodeOfRateReset["USD_SWP"] = 0] = "USD_SWP";
    MarketObjectCodeOfRateReset[MarketObjectCodeOfRateReset["USD_GOV"] = 1] = "USD_GOV";
    MarketObjectCodeOfRateReset[MarketObjectCodeOfRateReset["CHF_SWP"] = 2] = "CHF_SWP";
})(MarketObjectCodeOfRateReset = exports.MarketObjectCodeOfRateReset || (exports.MarketObjectCodeOfRateReset = {}));
// @ts-ignore:6196
var ObjectCodeOfPrepaymentModel;
(function (ObjectCodeOfPrepaymentModel) {
    ObjectCodeOfPrepaymentModel[ObjectCodeOfPrepaymentModel["IDXY"] = 0] = "IDXY";
})(ObjectCodeOfPrepaymentModel = exports.ObjectCodeOfPrepaymentModel || (exports.ObjectCodeOfPrepaymentModel = {}));
// @ts-ignore:6196
var OptionExecutionType;
(function (OptionExecutionType) {
    OptionExecutionType[OptionExecutionType["E"] = 0] = "E";
    OptionExecutionType[OptionExecutionType["B"] = 1] = "B";
    OptionExecutionType[OptionExecutionType["A"] = 2] = "A";
})(OptionExecutionType = exports.OptionExecutionType || (exports.OptionExecutionType = {}));
// @ts-ignore:6196
var OptionStrikeDriver;
(function (OptionStrikeDriver) {
    OptionStrikeDriver[OptionStrikeDriver["FX"] = 0] = "FX";
    OptionStrikeDriver[OptionStrikeDriver["IR"] = 1] = "IR";
    OptionStrikeDriver[OptionStrikeDriver["PR"] = 2] = "PR";
})(OptionStrikeDriver = exports.OptionStrikeDriver || (exports.OptionStrikeDriver = {}));
// @ts-ignore:6196
var OptionType;
(function (OptionType) {
    OptionType[OptionType["C"] = 0] = "C";
    OptionType[OptionType["P"] = 1] = "P";
    OptionType[OptionType["CP"] = 2] = "CP";
})(OptionType = exports.OptionType || (exports.OptionType = {}));
var PenaltyType;
(function (PenaltyType) {
    PenaltyType[PenaltyType["O"] = 0] = "O";
    PenaltyType[PenaltyType["A"] = 1] = "A";
    PenaltyType[PenaltyType["N"] = 2] = "N";
    PenaltyType[PenaltyType["I"] = 3] = "I";
})(PenaltyType = exports.PenaltyType || (exports.PenaltyType = {}));
// @ts-ignore:6196
var PrepaymentEffect;
(function (PrepaymentEffect) {
    PrepaymentEffect[PrepaymentEffect["N"] = 0] = "N";
    PrepaymentEffect[PrepaymentEffect["A"] = 1] = "A";
    PrepaymentEffect[PrepaymentEffect["M"] = 2] = "M";
})(PrepaymentEffect = exports.PrepaymentEffect || (exports.PrepaymentEffect = {}));
var ScalingEffect;
(function (ScalingEffect) {
    ScalingEffect[ScalingEffect["000"] = 0] = "000";
    ScalingEffect[ScalingEffect["0N0"] = 1] = "0N0";
    ScalingEffect[ScalingEffect["00M"] = 2] = "00M";
    ScalingEffect[ScalingEffect["0NM"] = 3] = "0NM";
    ScalingEffect[ScalingEffect["I00"] = 4] = "I00";
    ScalingEffect[ScalingEffect["IN0"] = 5] = "IN0";
    ScalingEffect[ScalingEffect["I0M"] = 6] = "I0M";
    ScalingEffect[ScalingEffect["INM"] = 7] = "INM";
})(ScalingEffect = exports.ScalingEffect || (exports.ScalingEffect = {}));
// @ts-ignore:6196
var Seniority;
(function (Seniority) {
    Seniority[Seniority["S"] = 0] = "S";
    Seniority[Seniority["J"] = 1] = "J";
})(Seniority = exports.Seniority || (exports.Seniority = {}));
// @ts-ignore:6196
var Unit;
(function (Unit) {
    Unit[Unit["BRL"] = 0] = "BRL";
    Unit[Unit["BSH"] = 1] = "BSH";
    Unit[Unit["GLN"] = 2] = "GLN";
    Unit[Unit["CUU"] = 3] = "CUU";
    Unit[Unit["MWH"] = 4] = "MWH";
    Unit[Unit["PND"] = 5] = "PND";
    Unit[Unit["STN"] = 6] = "STN";
    Unit[Unit["TON"] = 7] = "TON";
    Unit[Unit["TRO"] = 8] = "TRO";
})(Unit = exports.Unit || (exports.Unit = {}));
