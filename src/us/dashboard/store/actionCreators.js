import axios from "axios"
import Base64 from 'base-64';

import * as constants from './constants';
import * as utils from '../utils';
import {
  DASHBOARD_BM,
  DATA_SET,
  ETF_URI_PREFIX,
  US_ALL_ETF,
  DATA_SET_BM_KEY,
  DATA_SET_REL_SUFIX,
  DATA_SET_ETC_SRC_KEY,
  DATA_SET_BM_REL_KEY,
} from "../../../constants";


export const ALLETFormat = (srcData) => {

  let data = JSON.parse(Base64.decode(srcData.data))

  const ds = DATA_SET;
  const dv = ds.createView(DATA_SET_ETC_SRC_KEY).source(data);

  let temp = {}
  // 分离每个ETF
  for (var i=0; i<data.length; i++) {
    var DateETFs = data[i]
    for (var j=0; j< US_ALL_ETF.length; j++){
      var etf = US_ALL_ETF[j]
      if (temp.hasOwnProperty(etf)){
        temp[etf].push({Date: DateETFs['Date'], Close: DateETFs[etf]})
      }else {
        temp[etf] = [{Date: DateETFs['Date'], Close: DateETFs[etf]},]
      }
    }
  }

  // write DateSet
  for (var key in temp) {
    let itemPercentage = utils.cumulativeOfGains(temp[key])
    let relKey = key + DATA_SET_REL_SUFIX
    let relDataList = utils.relItemOfGains(itemPercentage)
    ds.createView(key).source(temp[key])
    ds.createView(relKey).source(relDataList)
  }

  return {
    type: constants.GET_DASHBOARD_ETF_ALL,
    allETFStatus: false,
    allETFDataSet: ds,
    allETFDataView: dv,
  }
};

export const benchmarkFormat  = (srcData) => {
  var data = JSON.parse(Base64.decode(srcData.data))
  var res = []

  for (var i=0; i<data.length; i++) {
    res.push(data[i]['Close'])
  }

  DATA_SET.createView(DATA_SET_BM_KEY).source(data)
  DATA_SET.createView(DATA_SET_BM_REL_KEY).source(utils.cumulativeOfGains(data))

  return {
    type: constants.GET_DASHBOARD_BM,
    benchmarkStatus: false,
    relBenchmarkData: utils.cumulativeOfGains(data),
    BenchmarkData: res,
    BenchmarkSrcData: data,
  }
};

export const getBenchmark = () => {
  return (dispatch) => {
    var uri = ETF_URI_PREFIX + DASHBOARD_BM + '.json'
    axios.get(uri).then((res) => {
      dispatch(benchmarkFormat(res.data))
    }).catch(() => { // ajax request error
      console.log("error")
      getBenchmark()
    })
  }
}

export const getItemETF = (etf) => {
  return (dispatch) => {
    var uri = ETF_URI_PREFIX + etf + '.json'
    axios.get(uri).then((res) => {
      dispatch(ALLETFormat(res.data))
    }).catch(() => { // ajax request error
      console.log("error")
    })
  }
}

export const getAllETF = () => {
  return (dispatch) => {
    axios.get("/api-storage/etf/ALL.json").then((res) => {
      dispatch(ALLETFormat(res.data))
    }).catch(() => { // ajax request error
      console.log("error")
      getAllETF()
    })
  }
}