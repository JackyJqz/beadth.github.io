import {DataSet} from "@antv/data-set/lib/data-set";

export const DATA_SET = new DataSet()
export const WEI_VIEW = 'WEI_VIEW_KEY'
export const FFR_VIEW = 'FFR_VIEW_KEY'
export const GOLD_STOCK_VIEW = 'WEI_VIEW_KEY'
export const CPI_VIEW = 'CPI_VIEW_KEY'
export const JOBLESS_CLAIMS_VIEW = 'JOBLESS_CLAIMS_KEY'
export const TREAS_REAL_RATE_VIEW = 'TREAS_REAL_RATE_KEY'
export const OLI_COPPRER_GLD_RATIO_VIEW = 'OLI_COPPRE_GLD_RATIO_KEY'
export const MARKET_SOMA_HOLD_VIEW = 'MARKET_SOMA_HOLD_KEY'

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

export const SOMA_HOLD_FIELD = ['agencies', 'bills', 'cmbs', 'frn', 'mbs', 'notesbonds', 'tips', 'tipsInflationCompensation', 'total']
export const TREASURY_REAL_RATES_FIELD = ['5 YR', '7 YR', '10 YR', '20 YR', '30 YR']

