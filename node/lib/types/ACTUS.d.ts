import BigNumber from 'bignumber.js';
export declare enum P {
    D = 0,
    W = 1,
    M = 2,
    Q = 3,
    H = 4,
    Y = 5
}
export declare enum S {
    LONG = 0,
    SHORT = 1
}
export interface IPS {
    i: number;
    p: P;
    s: S;
    isSet: boolean;
}
export interface IP {
    i: number;
    p: P;
    isSet: boolean;
}
export declare enum BusinessDayConvention {
    NULL = 0,
    SCF = 1,
    SCMF = 2,
    CSF = 3,
    CSMF = 4,
    SCP = 5,
    SCMP = 6,
    CSP = 7,
    CSMP = 8
}
export declare enum Calendar {
    NULL = 0,
    NOCALENDAR = 1,
    MondayToFriday = 2
}
export declare enum ClearingHouse {
    YES = 0,
    NO = 1
}
export declare enum ContractRole {
    RPA = 0,
    RPL = 1,
    LG = 2,
    ST = 3,
    RFL = 4,
    BUYER = 5,
    PFL = 6,
    SELLER = 7,
    GUARANTOR = 8,
    OBLIGEE = 9
}
export declare enum ContractStatus {
    PF = 0,
    DL = 1,
    DQ = 2,
    DF = 3
}
export declare enum ContractType {
    PAM = 0,
    ANN = 1,
    NAM = 2,
    LAM = 3,
    LAX = 4,
    CLM = 5,
    UMP = 6,
    CSH = 7,
    STK = 8,
    COM = 9,
    SWAPS = 10,
    SWPPV = 11,
    FXOUT = 12,
    CAPFL = 13,
    FUTUR = 14,
    OPTNS = 15,
    CEG = 16,
    CEC = 17
}
export declare enum CyclePointOfInterestPayment {
    EndOf = 0,
    BeginningOf = 1
}
export declare enum CyclePointOfRateReset {
    BeginningOf = 0,
    EndOf = 1
}
export declare enum CycleTriggerOfOptionality {
    IP = 0,
    PR = 1,
    RR = 2
}
export declare enum DayCountConvention {
    'A/AISDA' = 0,
    'A/360' = 1,
    'A/365' = 2,
    '30E/360ISDA' = 3,
    '30E/360' = 4,
    '30/360' = 5,
    'BUS/252' = 6
}
export declare enum EndOfMonthConvention {
    SD = 0,
    EOM = 1
}
export declare enum EventLevel {
    P = 0
}
export declare enum EventType {
    AD = 0,
    CD = 1,
    DV = 2,
    XD = 3,
    FP = 4,
    IED = 5,
    IPCB = 6,
    IPCI = 7,
    IP = 8,
    MR = 9,
    MD = 10,
    PY = 11,
    PD = 12,
    PRF = 13,
    PP = 14,
    PR = 15,
    PRD = 16,
    RRF = 17,
    RR = 18,
    SC = 19,
    STD = 20,
    TD = 21
}
export declare enum FeeBasis {
    A = 0,
    N = 1
}
export declare enum InterestCalculationBase {
    NT = 0,
    NTIED = 1,
    NTL = 2
}
export declare enum MarketObjectCodeOfRateReset {
    USD_SWP = 0,
    USD_GOV = 1,
    CHF_SWP = 2
}
export declare enum ObjectCodeOfPrepaymentModel {
    IDXY = 0
}
export declare enum OptionExecutionType {
    E = 0,
    B = 1,
    A = 2
}
export declare enum OptionStrikeDriver {
    FX = 0,
    IR = 1,
    PR = 2
}
export declare enum OptionType {
    C = 0,
    P = 1,
    CP = 2
}
export declare enum PenaltyType {
    O = 0,
    A = 1,
    N = 2,
    I = 3
}
export declare enum PrepaymentEffect {
    N = 0,
    A = 1,
    M = 2
}
export declare enum ScalingEffect {
    '000' = 0,
    '0N0' = 1,
    '00M' = 2,
    '0NM' = 3,
    'I00' = 4,
    'IN0' = 5,
    'I0M' = 6,
    'INM' = 7
}
export declare enum Seniority {
    S = 0,
    J = 1
}
export declare enum Unit {
    BRL = 0,
    BSH = 1,
    GLN = 2,
    CUU = 3,
    MWH = 4,
    PND = 5,
    STN = 6,
    TON = 7,
    TRO = 8
}
export interface ContractEvent {
    eventTime: number;
    eventType: EventType;
    currency: string;
    payoff: BigNumber;
    actualEventTime: number;
}
export interface ProtoEvent {
    eventTime: number;
    eventTimeWithEpochOffset: number;
    scheduleTime: number;
    eventType: EventType;
    currency: string;
    pofType: EventType;
    stfType: EventType;
}
export interface ContractState {
    lastEventTime: number;
    nonPerformingDate: number;
    timeFromLastEvent: BigNumber;
    nominalValue: BigNumber;
    nominalAccrued: BigNumber;
    feeAccrued: BigNumber;
    nominalRate: BigNumber;
    interestScalingMultiplier: BigNumber;
    nominalScalingMultiplier: BigNumber;
    nextPrincipalRedemptionPayment: BigNumber;
    contractStatus: ContractStatus;
    contractRoleSign: ContractRole;
}
export declare type ProtoEventSchedule = ProtoEvent[];
export declare type EvaluatedEventSchedule = {
    event: ContractEvent;
    state: ContractState;
}[];
export interface ContractTerms {
    contractType: ContractType;
    calendar: Calendar;
    contractRole: ContractRole;
    creatorID: string;
    counterpartyID: string;
    dayCountConvention: DayCountConvention;
    businessDayConvention: BusinessDayConvention;
    endOfMonthConvention: EndOfMonthConvention;
    currency: string;
    scalingEffect: ScalingEffect;
    penaltyType: PenaltyType;
    feeBasis: FeeBasis;
    contractDealDate: number;
    statusDate: number;
    initialExchangeDate: number;
    maturityDate: number;
    terminationDate: number;
    purchaseDate: number;
    capitalizationEndDate: number;
    cycleAnchorDateOfInterestPayment: number;
    cycleAnchorDateOfRateReset: number;
    cycleAnchorDateOfScalingIndex: number;
    cycleAnchorDateOfFee: number;
    cycleAnchorDateOfPrincipalRedemption: number;
    notionalPrincipal: string;
    nominalInterestRate: string;
    feeAccrued: string;
    accruedInterest: string;
    rateMultiplier: string;
    rateSpread: string;
    feeRate: string;
    nextResetRate: string;
    penaltyRate: string;
    premiumDiscountAtIED: string;
    priceAtPurchaseDate: string;
    nextPrincipalRedemptionPayment: string;
    cycleOfInterestPayment: IPS;
    cycleOfRateReset: IPS;
    cycleOfScalingIndex: IPS;
    cycleOfFee: IPS;
    cycleOfPrincipalRedemption: IPS;
    gracePeriod: IP;
    delinquencyPeriod: IP;
    lifeCap: string;
    lifeFloor: string;
    periodCap: string;
    periodFloor: string;
}
