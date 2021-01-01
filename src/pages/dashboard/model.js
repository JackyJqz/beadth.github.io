import * as service from './service';
import * as constants from "@/constants";
import * as bin from "@/pages/dashboard/utils/bin";

const initState = {
  rdv: undefined,
  rds: undefined,
}

const Model = {
  namespace: 'dashboard',
  state: initState,
  effects:{
    *init(_, { put }) {
      yield put({
        type: 'etf',
      });
      yield put({
        type: 'fetchLeft',
      });
    },
    *etf(_, { call, put }) {
      const response = yield call(service.getETFs);
      yield put({
        type: 'save',
        payload: bin.etfFormat(response),
      });
    },
    *fetchLeft(_, { call, put }) {
      const response = yield call(service.getBoardLeft);
      yield put({
        type: 'save',
        payload: bin.leftFormat(response),
      });
    },
  },
  reducers:{
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    clear() {
      return initState;
    },
  }
}


export default Model;
