import {DataSet} from "@antv/data-set/lib/data-set";

export const ALI_PAY_QR = "/img/AliPayQR.png"
export const WECHAT_PAY_QR = "/img/WeChatPayQR.png"
export const PAYPAL_PAY_QR = "/img/PaypalQR.png"
export const BTC_QR = "/img/BTCQR.png"
export const BTC_WALLET = "38q6hQX3BhMpkDyQy2aVc1n3FnRS4RXqb5"
export const ROUTER_PATH = {
  INDEX: '/',
  ECONOMIC:'/economic',
  DASHBOARD:'/dashboard',
}
export const CHART_CODE_LIST = ['SPX','COM','CND','CNS','ENE','FIN','HLT','IND','MAT','REI','TEC','UTL']
export const BREADTH_CODE_CN = {
  SPX:'标普500',
  COM:'通讯',
  CND:'可选消费',
  ENE:'能源',
  CNS:'必须品',
  FIN:'金融',
  HLT:'生物医疗',
  IND:'工业',
  MAT:'材料',
  REI:'地产',
  TEC:'科技',
  UTL:'公共事业',
  TOTAL:'合计',
}
export const ALL_CHART_SP500_LIST =  ['SPX','COM','CND','CNS','ENE','FIN','HLT','IND','MAT','REI','TEC','UTL','TOTAL']
export const PAYPAL_URL = 'https://www.paypal.me/kenteb';
export const IS_LOADING_STRING = "Loading.."
export const SHOW_SPACE = " ".replace(/ /g, "\u00a0")
export const DOMAIN_NAME = "breadth.app"
export const DOMAIN_NAME_URL = "https://breadth.app"
export const SP500_SUB_CODE_CN = [
  {code: "COM 电信服务", en: "Telecom", desc: "电信服务和无线通讯"},
  {code: "CND 可选消费", en: "Consumer Discretionary", desc: "汽车、服装、休闲和媒体(可选消费)"},
  {code: "CNS 消费必需品", en: "Consumer Staples", desc: "日用产品、食品和药品零售(消费必需品)"},
  {code: "ENE 能源", en: "Energy", desc: "能源设施、冶炼、石油和天然气的开采"},
  {code: "FIN 金融", en: "Finance", desc: "银行、金融服务和所有保险"},
  {code: "HLT 医疗保健", en: "Medical & Health", desc: "经营型医疗保健服务、医疗产品、药品和生物技术"},
  {code: "IND 工业", en: "Industry", desc: "资本货物、交通、建筑、航空和国防"},
  {code: "MAT 基础材料", en: "Materials", desc: "化学品、金属采矿、纸产品和林产品"},
  {code: "REI 地产业", en: "Real Estate", desc: "房地产开发、管理及相关信托"},
  {code: "TEC 信息技术", en: "Information technology", desc: "硬件、软件和通讯设备"},
  {code: "UTL 公用事业", en: "Utilities", desc: "电力设备和天然气设备"},
  {code: "SPX 标普500", en: "S&P 500", desc: "标普500"},
]
export const LEI_SITE = "https://lonecapital.com/"
export const CHART_COPYRIGHT = {
  position: ['median', 'max'],
  top: false,
  content: DOMAIN_NAME,
  offsetX: -50,
  style: {
    fill: "#C0C0C0",
    fontSize: 20,
  },
}
export const FED_SOMA_KEY_MAP = {
  mbs: "Agency Mortgage-Backed Securities",
  cmbs: "Agency Commercial Mortgage-Backed Securities",
  tips: "US Treasury Inflation-Protected Securities (TIPS)",
  frn: "US Treasury Floating Rate Notes",
  notesbonds: "US Treasury Notes and Bonds (Notes/Bonds)",
  bills: "US Treasury Bills (T-Bills)",
  agencies: "Federal Agency Securities",
  tipsInflationCompensation: "Inflation Compensation",
  total: "Total SOMA Holdings",
};
export const US_ALL_ETF = [
    'VTI',
    'DIA',
    'OEF',
    'MDY',
    'SPY',
    'RSP',
    'QQQ',
    'QTEC',
    'FANGMAN',
    'IWB',
    'IWM',
    'MTUM',
    'VLUE',
    'QUAL',
    'USMV',
    'IWF',
    'IWD',
    'IVW',
    'IVE',
    'MOAT',
    'FFTY',
    'IBUY',
    'HACK',
    'SKYY',
    'IPAY',
    'FINX',
    'XT',
    'ARKK',
    'BOTZ',
    'MOO',
    'ARKG',
    'MJ',
    'ARKW',
    'ARKQ',
    'PBW',
    'BLOK',
    'SNSR',
    'XLC',
    'XLY',
    'XHB',
    'XRT',
    'XLP',
    'XLE',
    'XOP',
    'OIH',
    'TAN',
    'URA',
    'XLF',
    'KBE',
    'KIE',
    'IAI',
    'XLV',
    'IBB',
    'IHI',
    'IHF',
    'XPH',
    'XLI',
    'ITA',
    'IYT',
    'JETS',
    'XLB',
    'GDX',
    'XME',
    'LIT',
    'REMX',
    'IYM',
    'XLRE',
    'VNQ',
    'VNQI',
    'REM',
    'XLK',
    'VGT',
    'FDN',
    'SOCL',
    'IGV',
    'SOXX',
    'XLU',
]
export const US_ETF_ALL_MAP = {
    VTI: 'Total Market',
    DIA: 'DJI 30',
    OEF: 'S&P 100',
    MDY: 'S&P 400',
    SPY: 'S&P 500',
    RSP: 'S&P 500 EQ',
    QQQ: 'Nasdaq 100',
    QTEC: 'Nasdaq 100 Tech',
    FANGMAN: 'FANGMAN',
    IWB: 'Russell 1000',
    IWM: 'Russell 2000',
    MTUM: 'Momentum',
    VLUE: 'Value',
    QUAL: 'Quality',
    USMV: 'Low Volatility',
    IWF: 'Russell 1000 Growth',
    IWD: 'Russell 1000 Value',
    IVW: 'S&P 500 Growth',
    IVE: 'S&P 500 Value',
    MOAT: 'Wide Moat',
    FFTY: 'CANSLIM',
    IBUY: 'Online Retail',
    HACK: 'Cyber Security',
    SKYY: 'Cloud',
    IPAY: 'Mobile Payment',
    FINX: 'Fin Tech',
    XT: 'Exponential Tech',
    ARKK: 'Disruptive Innovation',
    BOTZ: 'Roboticd & A.I.',
    MOO: 'Agribusiness',
    ARKG: 'Genomic Revolution',
    MJ: 'Marijuana',
    ARKW: 'Next Gen. Internet',
    ARKQ: 'Autonomous Tech',
    PBW: 'Clean Energy',
    BLOK: 'Blockchain Tech',
    SNSR: 'Internet Of Thins',
    XLC: 'Communications',
    XLY: 'Consumer Disc.',
    XHB: 'Home Builders',
    XRT: 'Retail',
    XLP: 'Consumer Staples',
    XLE: 'Energy',
    XOP: 'Oil & Gas Explorator',
    OIH: 'Oil Service',
    TAN: 'Solar',
    URA: 'Nuclear',
    XLF: 'Financial',
    KBE: 'Banks',
    KIE: 'Insurance',
    IAI: 'Brokers',
    XLV: 'Healthcare',
    IBB: 'Biotech',
    IHI: 'Medical Devices',
    IHF: 'Healthcare Providers',
    XPH: 'Pharmaceuticals',
    XLI: 'Industrials',
    ITA: 'Aero & Defence',
    IYT: 'Transportation',
    JETS: 'Global Jets',
    XLB: 'Materials',
    GDX: 'Gold Miners',
    XME: 'Metals & Mining',
    LIT: 'Lithium & Battery',
    REMX: 'Rare Earth',
    IYM: 'Basic Materials',
    XLRE: 'Real Estate',
    VNQ: 'REIT US',
    VNQI: 'REIT Global ex. US',
    REM: 'Mortgage',
    XLK: 'Technology',
    VGT: 'I.T.',
    FDN: 'Internet',
    SOCL: 'Social Media',
    IGV: 'Software & Sass',
    SOXX: 'Semiconductors',
    XLU: 'Utilities',
}

export const US_ETF_BROAD_MARKET = US_ALL_ETF.slice(0,11)
export const US_ETF_FACTORS = US_ALL_ETF.slice(11,15)
export const US_ETF_GROWTH_OR_VALUE = US_ALL_ETF.slice(15,19)
export const US_ETF_THEMATIC = US_ALL_ETF.slice(19,37)
export const US_ETF_INDUSTRY = US_ALL_ETF.slice(37,77)

export const US_ETF_COM = US_ALL_ETF.slice(37,38)
export const US_ETF_CON_CNS = US_ALL_ETF.slice(38,42)
export const US_ETF_ENE = US_ALL_ETF.slice(42,47)
export const US_ETF_FIN = US_ALL_ETF.slice(47,51)
export const US_ETF_HLT = US_ALL_ETF.slice(51,56)
export const US_ETF_IND = US_ALL_ETF.slice(56,60)
export const US_ETF_MAT = US_ALL_ETF.slice(60,66)
export const US_ETF_REL = US_ALL_ETF.slice(66,70)
export const US_ETF_TEC = US_ALL_ETF.slice(70,76)
export const US_ETF_UTL = US_ALL_ETF.slice(76)

export const US_ETF_ALL_LIST = [
  US_ETF_BROAD_MARKET, US_ETF_FACTORS, US_ETF_GROWTH_OR_VALUE, US_ETF_THEMATIC,
  US_ETF_COM, US_ETF_CON_CNS, US_ETF_ENE, US_ETF_FIN, US_ETF_HLT,US_ETF_IND, US_ETF_MAT,
  US_ETF_REL, US_ETF_TEC, US_ETF_UTL
]

export const DASHBOARD_RATES_YIELDS = ['^TNX',]
export const DASHBOARD_SUPPLY_DEMAND = []
export const DASHBOARD_FUNDAMENTAL = []
export const DASHBOARD_RISK_GAUGES = ["GC=F",]
export const DASHBOARD_CURRENCY = ['DX=F', 'EURUSD=X', 'JPYUSD=X', 'GBPUSD=X', 'CADUSD=X', 'MXNUSD=X', 'AUDUSD=X','KRWUSD=X', '', 'INRUSD=X', 'BTC-USD']
export const DASHBOARD_ENERGY = ['CL=F', 'BZ=F', 'RB=F', 'NG=F']
export const DASHBOARD_PRECIOUS = ['GC=F', 'SI=F', 'PL=F', 'PA=F']
export const DASHBOARD_METAL = ['HG=F',]
export const DASHBOARD_AGRICULTURE = ['ZC=F', 'ZW=F', 'ZS=F', 'KC=F', 'SB=F', 'CT=F', 'CC=F', 'LE=F', 'ZS=F']

export const US_ETF_GROUP_ALL_MAP = [
  {text: "Broad Market", data: US_ETF_BROAD_MARKET, i18n: 'dashboard.category.broad-market'},
  {text: "Factors", data: US_ETF_FACTORS, i18n: 'dashboard.category.factors'},
  {text: "Growth ot Value", data: US_ETF_GROWTH_OR_VALUE, i18n: 'dashboard.category.growth-value'},
  {text: "Thematic", data: US_ETF_THEMATIC, i18n: 'dashboard.category.thematic'},
  {text: "Industry", data: US_ETF_INDUSTRY, i18n: 'dashboard.category.industry'},
  // {text: "Telecom", data: US_ETF_COM},
  // {text: "Consumer Discretionary & Consumer Staples", data: US_ETF_CON_CNS},
  // {text: "Energy", data: US_ETF_ENE},
  // {text: "Finance", data: US_ETF_FIN},
  // {text: "Medical & Health", data: US_ETF_HLT},
  // {text: "Industry", data: US_ETF_IND},
  // {text: "Materials", data: US_ETF_MAT},
  // {text: "Real Estate", data: US_ETF_REL},
  // {text: "Information technology", data: US_ETF_TEC},
  // {text: "Utilities", data: US_ETF_UTL},
]

export const DASHBOARD_LEFT_ONE = [
  {text: "Rates Yields", data: DASHBOARD_RATES_YIELDS, i18n: 'dashboard.category.rates-yields'},
  {text: "Supply & Demand", data: DASHBOARD_SUPPLY_DEMAND, i18n: 'dashboard.category.supply-Demand'},
  {text: "Fundamental", data: DASHBOARD_FUNDAMENTAL, i18n: 'dashboard.category.fundamental'},
  {text: "Risk Gauges", data: DASHBOARD_RISK_GAUGES, i18n: 'dashboard.category.risk-gauges'},
  {text: "Currency", data: DASHBOARD_CURRENCY, i18n: 'dashboard.category.currency'},
]

export const DASHBOARD_LEFT_TWO = [
  {text: "Energy", data: DASHBOARD_ENERGY, i18n: 'dashboard.category.energy'},
  {text: "Precious", data: DASHBOARD_PRECIOUS, i18n: 'dashboard.category.precious'},
  {text: "Metal", data: DASHBOARD_METAL, i18n: 'dashboard.category.metal'},
  {text: "Agriculture", data: DASHBOARD_AGRICULTURE, i18n: 'dashboard.category.agriculture'},
]

export const TREASURY_REAL_RATES_FIELD = ['5 YR', '7 YR', '10 YR', '20 YR', '30 YR']
export const SOMA_HOLD_FIELD = ['agencies', 'bills', 'cmbs', 'frn', 'mbs', 'notesbonds', 'tips', 'tipsInflationCompensation', 'total']
export const DASHBOARD_BM = US_ALL_ETF[0]
export const ETF_URI_PREFIX = "/api-storage/etf/"
export const DATA_SET = new DataSet()
export const DATA_SET_REL_SUFIX = "_REL"
export const DATA_SET_BM_KEY = "BM"
export const DATA_SET_BM_REL_KEY = DATA_SET_BM_KEY + DATA_SET_REL_SUFIX
export const DATA_SET_ETC_SRC_KEY = "US_ETF_SRC"

/* Breadth */
export const SP500_POP_FIELD = ['HIGH_TOTAL', 'LOW_TOTAL', 'OPEN_TOTAL', 'data', 'time', 'TOTAL']
export const SP500_BREADTH_KEY = 'SP500_BREADTH_KEY'
export const SP500_BREADTH_FIELDS = ['SPX', 'COM', 'CND', 'CNS', 'ENE', 'FIN', 'HLT', 'IND', 'MAT', 'REI', 'TEC', 'UTL', 'TOTAL']
export const BREADTH_CODE_I18N = {
  SPX:'breadth.breadth.spx',
  COM:'breadth.breadth.com',
  CND:'breadth.breadth.cnd',
  ENE:'breadth.breadth.ene',
  CNS:'breadth.breadth.cns',
  FIN:'breadth.breadth.fin',
  HLT:'breadth.breadth.hlt',
  IND:'breadth.breadth.ind',
  MAT:'breadth.breadth.mat',
  REI:'breadth.breadth.rei',
  TEC:'breadth.breadth.tec',
  UTL:'breadth.breadth.utl',
  TOTAL:'breadth.breadth.total',
}
export const BREADTH_CODE_I18N_DEF = {
  SPX:'S&P 500',
  COM:'Communication Services',
  CND:'Consumer Discretionary',
  ENE:'Energy',
  CNS:'Consumer Staples',
  FIN:'Financials',
  HLT:'Health Care',
  IND:'Industrials',
  MAT:'Materials',
  REI:'Real Estate',
  TEC:'Technology',
  UTL:'Utilities',
  TOTAL:'Total',
}
