import DataSet from '@antv/data-set';
import Base64 from 'base-64';

import * as constants from "@/pages/economic/constants";
import * as utils from "@/pages/economic/utils/utils";


export function WeiFormat(srcData) {
  var data = JSON.parse(Base64.decode(srcData.data))
  var dataList = []
  for (var key in data) {
    var item = {}
    item.time = key
    item.value = data[key]
    dataList.push(item)
  }

  const weiData = new DataSet.DataView().source(dataList);
  utils.SyncView(constants.WEI_VIEW, dataList)
  return {weiData: weiData}
}

export function FfrFormat(srcData) {
  var data = JSON.parse(Base64.decode(srcData.data));
  const ffrData = new DataSet.DataView().source(data);
  utils.SyncView(constants.FFR_VIEW, data)
  return {ffrData}
}

export const goldStockFormat = (srcData) => {
  var data = JSON.parse(Base64.decode(srcData.data));
  const goldStockData = new DataSet.DataView().source(data);
  utils.SyncView(constants.GOLD_STOCK_VIEW, data)
  return {goldStockData}
}

export const CPIFormat = (srcData) => {
  var data = JSON.parse(Base64.decode(srcData.data));
  const cpiData = new DataSet.DataView().source(data);
  utils.SyncView(constants.CPI_VIEW, data)
  return {cpiData}
}

export const JoblessClaimsFormat = (srcData) => {
  var data = JSON.parse(Base64.decode(srcData.data));
  // const joblessClaimsData = new DataSet.DataView().source(data);
  /* view 在这里处理是因为在组件里面报错，DataSet View transform not is a function TODO */
  var joblessClaimsData = utils.SyncView(constants.JOBLESS_CLAIMS_VIEW, data)
  return {joblessClaimsData}
}

export const TreasuryRealRatesFormat = (srcData) => {
  var data = JSON.parse(Base64.decode(srcData.data));
  const treaRealRateData = new DataSet.DataView().source(data);
  const ds = new DataSet.DataView().source(data);

  /* view 在这里处理是因为在组件里面报错，*/
  ds.transform({
    type: 'fold',
    fields: constants.TREASURY_REAL_RATES_FIELD, // 展开字段集
    key: 'year', // key字段
    value: 'value', // value字段
  })

  utils.SyncView(constants.TREAS_REAL_RATE_VIEW, ds.rows)
  return {treaRealRateData}
}

export const OliCopperGoldRatioFormat = (srcData) => {
  var data = JSON.parse(Base64.decode(srcData.data));
  const oliCopGldRateData = new DataSet.DataView().source(data);
  utils.SyncView(constants.OLI_COPPRER_GLD_RATIO_VIEW, data)
  return {
    oliCopGldRateData
  }
}

export const marketSomaHoldFormat = (srcData) => {
  var data = JSON.parse(Base64.decode(srcData.data))
  var dataList = []
  for (var key in data) {
    dataList.push(data[key])
  }

  const marketSHData = new DataSet.DataView().source(dataList);

  /* view 在这里处理是因为在组件里面报错，*/
  marketSHData.transform({
    type: 'fold',
    fields: constants.SOMA_HOLD_FIELD, // 展开字段集
    key: 'type', // key字段
    value: 'value', // value字段
  })
  marketSHData.transform({
    type: "pick",
    fields: ["asOfDate", "type", "value"],
  })
  marketSHData.transform({
    type: "map",
    callback(row) {
      row.type = constants.FED_SOMA_KEY_MAP[row.type] || row.type
      row.value = isNaN(row.value)
        ? 0
        : (parseFloat(row.value) / 10 ** 9).toFixed(4);
      return row;
    },

  })


  var a = utils.SyncView(constants.MARKET_SOMA_HOLD_VIEW, marketSHData.rows)
  return {
    marketSHData
  }
};
