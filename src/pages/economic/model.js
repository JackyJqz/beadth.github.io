import * as service from './service';
import * as bin from "./bin";
import {DATA_SET} from "@/pages/economic/constants";

const initState = {
  economicDs: DATA_SET,
  weiData: [],
  cpiData: [],
  ffrData: [],
  oliCopGldRateData: [],
  marketSHData: [],
  treaRealRateData: [],
  joblessClaimsData: [],
  goldStockData: [],
}

const Model = {
  namespace: 'economic',
  state: initState,
  effects: {
    * init(_, {put}) {
      yield put({
        type: 'cpi',
      });
      yield put({
        type: 'ffr',
      });
      yield put({
        type: 'wei',
      });
      yield put({
        type: 'goldstock',
      });
      yield put({
        type: 'joblessClaims',
      });
      yield put({
        type: 'trr',
      });
      yield put({
        type: 'ocgr',
      });
      yield put({
        type: 'marketSomaHold',
      });
    },
    * wei(_, {call, put}) {
      const response = yield call(service.getWei);
      yield put({
        type: 'save',
        payload: bin.WeiFormat(response),
      });
    },
    * cpi(_, {call, put}) {
      const response = yield call(service.getCPI);
      yield put({
        type: 'save',
        payload: bin.CPIFormat(response),
      });
    },
    * ffr(_, {call, put}) {
      const response = yield call(service.getFFR);
      yield put({
        type: 'save',
        payload: bin.FfrFormat(response),
      });
    },
    * goldstock(_, {call, put}) {
      const response = yield call(service.getGoldStock);
      yield put({
        type: 'save',
        payload: bin.goldStockFormat(response),
      });
    },
    * joblessClaims(_, {call, put}) {
      const response = yield call(service.getJoblessClaims);
      yield put({
        type: 'save',
        payload: bin.JoblessClaimsFormat(response),
      });
    },
    * trr(_, {call, put}) {
      const response = yield call(service.getTreasuryRealRates);
      yield put({
        type: 'save',
        payload: bin.TreasuryRealRatesFormat(response),
      });
    },
    * ocgr(_, {call, put}) {
      const response = yield call(service.getOliCopperGoldRatio);
      yield put({
        type: 'save',
        payload: bin.OliCopperGoldRatioFormat(response),
      });
    },
    * marketSomaHold(_, {call, put}) {
      const response = yield call(service.getMarketSomaHold);
      yield put({
        type: 'save',
        payload: bin.marketSomaHoldFormat(response),
      });
    },
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
    clear() {
      return initState;
    },
  }
}


export default Model;
