import moment from 'moment';
import Base64 from 'base-64';

import * as constants  from "@/constants";
import * as utils from "@/pages/dashboard/utils/utils";
import * as Gutils from "@/utils/utils";

function benchmark(data){
  var res = []
  for (var i=0; i<data.length; i++) {
    res.push({
      Date: data[i]['Date'],
      Close: data[i]['VTI']
    })
  }
  Gutils.SyncView(constants.DATA_SET_BM_KEY, data)
  Gutils.SyncView(constants.DATA_SET_BM_REL_KEY, utils.cumulativeOfGains(res))
}

function waitBM(){
  var flag,bm
  while (flag !== undefined){
    bm = constants.DATA_SET.getView(constants.DATA_SET_BM_KEY)
    if (bm !== undefined){
      flag = true
    }
  }
}

export function etfFormat(srcData) {
  // 数据处理
  const data = JSON.parse(Base64.decode(srcData.data))
  benchmark(data)

  var flag,bm
  while (flag !== undefined){
    bm = constants.DATA_SET.getView(constants.DATA_SET_BM_KEY)
    if (bm !== undefined){
      flag = true
    }
  }
  // waitBM()
  const rds = constants.DATA_SET;
  const rdv = Gutils.SyncView(constants.DATA_SET_ETC_SRC_KEY, data)

  let temp = {}
  // 分离每个ETF
  for (var i=0; i<data.length; i++) {
    var DateETFs = data[i]
    for (var j=0; j< constants.US_ALL_ETF.length; j++){
      var etf = constants.US_ALL_ETF[j]
      if (temp.hasOwnProperty(etf)){
        temp[etf].push({Date: DateETFs['Date'], Close: DateETFs[etf]})
      }else {
        temp[etf] = [{Date: DateETFs['Date'], Close: DateETFs[etf]},]
      }
    }
  }
  // Sync DateSet
  for (var key in temp) {
    let itemPercentage = utils.cumulativeOfGains(temp[key])
    let relKey = key + constants.DATA_SET_REL_SUFIX
    let relDataList = utils.relItemOfGains(itemPercentage)
    Gutils.SyncView(key, temp[key])
    Gutils.SyncView(relKey, relDataList)
  }
  return {
    rdv, rds
  }
}


export function leftFormat(srcData){
  const data = JSON.parse(Base64.decode(srcData.data))
  return {data}
}
