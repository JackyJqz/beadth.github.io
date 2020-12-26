import {getMtData} from './service';
import {CHART_CODE_LIST} from "../constants";
import {breadthFormat} from "@/pages/breadth/utils/utils";

const initState = {
  dataList: [],
  totalLList: [],
  dayList: [],
  codeList: [],
  mv20CodeList: CHART_CODE_LIST,
  mv20DataList: [],
  chartList:[],
  breadthDays: 100,
  lastBreadth: 0,
  lastTime: '',
  breadthDateRange: [],
}

const Model = {
  namespace: 'breadth',
  state: initState,
  effects:{
    *fetch(_, { call, put }) {
      const response = yield call(getMtData);
      yield put({
        type: 'save',
        // payload: response,
        payload: breadthFormat(response),
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
