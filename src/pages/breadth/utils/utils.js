import moment from 'moment';
import Base64 from 'base-64';
import DataSet from '@antv/data-set';

import * as constants from "@/constants";

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}
export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;
    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }

  const year = now.getFullYear();

  if (type === 'month') {
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();
    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

export function breadthFormat(srcData) {
  var bds = constants.DATA_SET
  // 数据处理
  const data = JSON.parse(Base64.decode(srcData.data))

  const lastTime = srcData.last_time
  const dayList = [];
  const totalList = [];
  const mv20DataList = [];
  const lineDataList = [];
  const dataList = JSON.parse(Base64.decode(srcData.data))
  const breadthDateRange = [
    data[0].time.replace(/-/g, "/"),
    ' - ', data[data.length - 1].time.replace(/-/g, "/"),
  ].join('');
  const lastBreadth = Math.ceil(data[data.length-1].TOTAL)
  const openBreadth = Math.ceil(data[data.length-1].OPEN_TOTAL)
  const preBreadth = Math.ceil(data[data.length-2].TOTAL)

  /* 已经不想动这个，不知道当时写的什么玩意儿  papok start */
  for (var i = 0; i < data.length; i++) {
    for (var key in data[i].data) {
      if (data[i].data[key]['close'] === 0.01) {
        data[i].data[key]['close'] = 0
      }
      data[i].data[key]['close'] = Math.ceil(data[i].data[key]['close'])
      data[i][key] = data[i].data[key]['close'];
    }
    data[i]['TOTAL'] = Math.ceil(data[i]['TOTAL'])
    lineDataList.push({day: data[i]['time'], code: "TOTAL", breadth: Math.ceil(data[i]['TOTAL'])})
  }
  /* end */
  const ldv = new DataSet.DataView().source(data)
  const rdv = new DataSet.DataView().source(data)

  ldv.transform({
    type: 'fold',
    fields: constants.CHART_CODE_LIST, // 展开字段集
    key: 'code', // key字段
    value: 'value', // value字段
    // retains: [ 'data', 'OPEN_TOTAL', 'HIGH_TOTAL', 'LOW_TOTAL']
  })

  rdv.transform({
    type: 'fold',
    fields: ['TOTAL',], // 展开字段集
    key: 'code', // key字段
    value: 'value', // value字段
    // retains: [ 'data', 'OPEN_TOTAL', 'HIGH_TOTAL', 'LOW_TOTAL']
  })

  var lastBreadhdv = new DataSet.DataView().source([
    deleteItem(ldv.origin[ldv.origin.length-1], constants.SP500_POP_FIELD)
  ])
  lastBreadhdv.transform({
    type: 'fold',
    fields: constants.CHART_CODE_LIST, // 展开字段集
    key: 'code', // key字段
    value: 'value', // value字段
    // retains: constants.SP500_POP_FIELD
  })

  var lastAllBreadh = lastBreadhdv.rows
  var heatMapDataLeft = ldv.rows
  var heatMapDataRight = rdv.rows


  return {
    dataList,
    totalList,
    dayList,
    mv20DataList,
    lineDataList,
    breadthDateRange,
    lastTime,
    lastBreadth,
    openBreadth,
    preBreadth,
    bds,
    heatMapDataLeft,
    heatMapDataRight,
    lastAllBreadh,
  }
}

export function deleteItem(data, items){
  for (var i=0; i<items.length; i++){
    delete data[items[i]]
  }
  return data
}
