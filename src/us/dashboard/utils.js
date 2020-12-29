import {DATA_SET, DATA_SET_BM_REL_KEY, DATA_SET_BM_KEY} from "../../constants";

/*
计算每个交易日(item)股价的涨跌幅
*/
export const percentage = (src) => {
  const percentageList =  []
  var item ,itemRes , srcItem

  for (var i=0; i<src.length; i++) {
    srcItem = parseFloat(src[i]['Close'].toFixed(3))
    if (i === 0){
      var last = srcItem
      continue
    }
    itemRes = parseFloat(srcItem - last)
    item = {}
    item.Date = src[i].Date
    item.Close = parseFloat((itemRes/last*100).toFixed(3))
    percentageList.push(item)
    last = srcItem
  }
  return percentageList
}

/*
*
* 计算N天([item,item...])的涨幅 %
* */
export const calculationOfGains = (src, num) => {
  let bm = src[src.length-num-1]['Close']
  let last = src[src.length-1]['Close']
  let res = (last - bm) / bm *100
  return res.toFixed(3)
}

/*
* 相对N天收益 Rel
* */
export const relOfGains = (src, num) => {
  var bm = DATA_SET.getView(DATA_SET_BM_KEY)
  var srcData = DATA_SET.getView(src)
  const relSrc = calculationOfGains(srcData.rows, num)
  const relbm = calculationOfGains(bm.rows, num)
  return (relSrc - relbm).toFixed(3)
}

/*
* 每日相对(BM)收益计算 list
* */
export const relItemOfGains = (src) => {
  // let bm = DATA_SET.getView(DATA_SET_BM_REL_KEY).rows.slice(-20)
  let bm = DATA_SET.getView(DATA_SET_BM_REL_KEY).rows
  var srcItem
  var bmItem
  var _t
  // console.log(bm, src, '----')
  for (var i=0; i < src.length; i++){
    srcItem = parseFloat(src[i]['Close'])
    bmItem = bm[i]['Close']
    _t = parseInt(srcItem) - parseInt(bmItem)
    src[i]['Close'] = parseFloat( _t)
  }
  return src
}

/*
* 累计N天（Item）的收益
* */
export const cumulativeOfGains = (src) => {
  var bm = src[0]['Cloce']
  var res = []
  var last, resItem
  for (var i = 0 ; i < src.length; i++){
    if (i === 0){
      bm = src[i]['Close']
    } else {
      last = src[i]['Close']
      resItem = (last - bm) / bm *100
      res.push({Date: src[i]['Date'], Close:resItem.toFixed(3) * 1000})
    }
  }
  return res
}