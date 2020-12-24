import axios from "axios"
import Base64 from 'base-64';
import DataSet from '@antv/data-set';

import * as constants from './constants';


export const marketSomaHoldFormat = (srcData) => {
  var data = JSON.parse(Base64.decode(srcData.data))
  var dataList = []
  for (var key in data) {
    dataList.push(data[key])
  }
  const dv = new DataSet.DataView().source(dataList);
  return {
    type: constants.GET_NEWYORKFED_SOMA_HOLD,
    somaHolDataStatus: false,
    somaHolDataList: dv,
  }
};

export const weiFormat = (srcData) => {
  var data = JSON.parse(Base64.decode(srcData.data))
  var dataList = []
  for (var key in data) {
    var item = {}
    item.time = key
    item.value = data[key]
    dataList.push(item)
  }

  const dv = new DataSet.DataView().source(dataList);
  return {
    type: constants.GET_NEWYORKFED_WEI,
    weiStatus: false,
    weiDatalist: dv,
  }
};

export const OliCopperGoldRatioFormat = (srcData) => {
  var data = JSON.parse(Base64.decode(srcData.data));
  const dv = new DataSet.DataView().source(data);
  return {
    type: constants.GET_OLI_COPPER_GOLD_RATIO,
    OliCopperGoldRatioStatus: false,
    OliCopperGoldRatioData: dv,
  }
}

export const TreasuryRealRatesFormat = (srcData) => {
  var data = JSON.parse(Base64.decode(srcData.data));
  const dv = new DataSet.DataView().source(data);
  return {
    type: constants.GET_TREASURY_REAL_RATES,
    treasuryRealRatesStatus: false,
    treasuryRealRatesData: dv,
  }
}

export const JoblessClaimsFormat = (srcData) => {
  var data = JSON.parse(Base64.decode(srcData.data));
  const dv = new DataSet.DataView().source(data);
  return {
    type: constants.GET_JOBLESS_CLAIMS,
    joblessClaimStatus: false,
    joblessClaimsData: dv,
  }
}

export const CPIFormat = (srcData) => {
  var data = JSON.parse(Base64.decode(srcData.data));
  const dv = new DataSet.DataView().source(data);
  return {
    type: constants.GET_CPI,
    cpiStatus: false,
    cpiData: dv,
  }
}

export const ffrFormat = (srcData) => {
  var data = JSON.parse(Base64.decode(srcData.data));
  const dv = new DataSet.DataView().source(data);
  return {
    type: constants.GET_FEDERAL_FOUNDS_RATE,
    ffrStatus: false,
    ffrData: dv,
  }
}

export const gldFormat = (srcData) => {
  var data = JSON.parse(Base64.decode(srcData.data));
  const dv = new DataSet.DataView().source(data);
  return {
    type: constants.GET_GLD,
    gldStatus: false,
    gldData: dv,
  }
}

export const geNewyorktWei = () => {
  return (dispatch) => {
    axios.get("/api-storage/newyorkfed_wei.json").then((res) => {
      dispatch(weiFormat(res.data))
    }).catch(() => { // ajax request error
      console.log("error")
    })
  }
}

export const getMarketSomaHold = () => {
  return (dispatch) => {
    axios.get("/api-storage/newyorkfed_makert_hold.json").then((res) => {
      dispatch(marketSomaHoldFormat(res.data))
    }).catch(() => { // ajax request error
      console.log("error")
    })
  }
}

export const getOliCopperGoldRatio = () => {
  return (dispatch) => {
    axios.get("/api-storage/oli_copper_gold_ratio_5.json").then((res) => {
      dispatch(OliCopperGoldRatioFormat(res.data))
    }).catch(() => { // ajax request error
      console.log("error")
    })
  }
}

export const getTreasuryRealRates = () => {
  return (dispatch) => {
    axios.get("/api-storage/treasury_real_rates_5.json").then((res) => {
      dispatch(TreasuryRealRatesFormat(res.data))
    }).catch(() => { // ajax request error
      console.log("error")
    })
  }
}

export const getJoblessClaims = () => {
  return (dispatch) => {
    axios.get("/api-storage/us_jobless.json").then((res) => {
      dispatch(JoblessClaimsFormat(res.data))
    }).catch(() => { // ajax request error
      console.log("error")
    })
  }
}

export const getCPI = () => {
  return (dispatch) => {
    axios.get("/api-storage/cpi_5.json").then((res) => {
      dispatch(CPIFormat(res.data))
    }).catch(() => { // ajax request error
      console.log("error")
    })
  }
}

export const getFFR = () => {
  return (dispatch) => {
    axios.get("/api-storage/federal_founds_rate_5.json").then((res) => {
      dispatch(ffrFormat(res.data))
    }).catch(() => { // ajax request error
      console.log("error")
    })
  }
}

export const getGld = () => {
  return (dispatch) => {
    axios.get("/api-storage/gld.json").then((res) => {
      dispatch(gldFormat(res.data))
    }).catch(() => { // ajax request error
      console.log("error")
    })
  }
}