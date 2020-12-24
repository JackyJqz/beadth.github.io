import * as constants from './constants';
import { fromJS} from 'immutable';
import {DASHBOARD_BM, DATA_SET} from "../../../constants";

const defaultState = fromJS({
  benchmark: DASHBOARD_BM,
  benchmarkStatus: true,
  relBenchmarkData: [],
  BenchmarkData: [],
  BenchmarkSrcData: [],
  allETFStatus: true,
  allETFDataSet: DATA_SET,
  allETFDataView: [{},],
});

const updateAllETF = (state, action) => {
  return state.merge({
    allETFStatus: action.allETFStatus,
    allETFDataSet: action.allETFDataSet,
    allETFDataView: action.allETFDataView,
  })
}

const updateBenchmark = (state, action) => {
  return state.merge({
    benchmark: action.benchmark,
    benchmarkStatus: action.benchmarkStatus,
    relBenchmarkData: action.relBenchmarkData,
    BenchmarkData: action.BenchmarkData,
    BenchmarkSrcData: action.BenchmarkSrcData,
  })
}


// state    整个DOM的数据库
// action
// reducer 可以接收state，但是不可以在修改stacurrentCityte
const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case constants.GET_DASHBOARD_ETF_ALL:
      return updateAllETF(state, action)
    case constants.GET_DASHBOARD_BM:
      return updateBenchmark(state, action)
    default:
      return state;
  }
}


export default reducer;