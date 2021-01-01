import {Badge, Card, Descriptions, Divider, Table} from 'antd';
import React from 'react';
import {
  Chart,
  Line,
  Area,
  Annotation,
} from 'bizcharts';

import styles from './style.less';

import * as constants from "@/constants";
import * as utils from "@/pages/dashboard/utils/utils";
import {FormattedMessage} from "umi";


const RelStockBm = ({loading, rdv, rds}) => {


  var valColor = function (data) {
    let style = {color: "#000",}
    if (data * 1000 < 0) {
      style.color = '#FB5050'
    } else if (data * 1000 > 0) {
      style.color = '#009966'
    }
    return <span style={style}>{data}</span>
  };
  const d5f = function (symbol, num) {
    let srcData = constants.DATA_SET.getView(symbol)
    return utils.calculationOfGains(srcData.rows, num)
  };

  const itemDataFunc = function (data) {
    var etfItems = data.data
    let res = []
    for (var i = 0; i < etfItems.length; i++) {
      let item = etfItems[i]
      res.push({
          symbol: item,
          d5: d5f(item, 5),
          d20: d5f(item, 20),
          key: i,
          r1: utils.relOfGains(item, 1),
          r5: utils.relOfGains(item, 5),
          r20: utils.relOfGains(item, 20),
          src: item,
          rel: item,
          name: item
        }
      )
    }
    return res
  }

  const columns = [
    {
      title: "Name",
      dataIndex: 'name',
      fixed: 'left',
      render: (symbol) => {
        return constants.US_ETF_ALL_MAP[symbol]
      }
    },
    {
      title: "ETF",
      dataIndex: 'symbol'
    },
    {
      title: '5D%',
      dataIndex: 'd5',
      sorter: (a, b) => b.d5 - a.d5,
      render: (data) => valColor(data)
    },
    {
      title: '20D%',
      dataIndex: 'd20',
      sorter: (a, b) => b.d20 - a.d20,
      render: (data) => valColor(data)
    },
    {
      title: '1M',
      dataIndex: 'src',
      render: (symbol) => {
        return (<StockItemChart dataMethod={'src'} symbol={symbol}/>)
      }
    },
    {
      title: 'Rel 1D%',
      dataIndex: 'r1',
      sorter: (a, b) => b.r1 - a.r1,
      render: (data) => valColor(data)
    },
    {
      title: 'Rel 5D%',
      dataIndex: 'r5',
      sorter: (a, b) => b.r5 - a.r5,
      render: (data) => valColor(data)
    },
    {
      title: 'Rel 20D%',
      dataIndex: 'r20',
      sorter: (a, b) => b.r20 - a.r20,
      render: (data) => valColor(data)
    },
    {
      title: 'Rel',
      dataIndex: 'rel',
      render: (symbol) => {
        if (symbol === 'VTI') {
          return "BM"
        }
        return (<StockItemChart dataMethod={'rel'} symbol={symbol}/>)
      }
    }
  ]
  return (
    <React.Fragment>

      {
        constants.US_ETF_GROUP_ALL_MAP.map((item, index) => {
          let titleKey = 'dashboardTitle' + index
          let tableKey = 'dashboardTable' + index
          let itemData = itemDataFunc(item)

          return (
            <Card
              loading={loading}
              key={tableKey}
              title={<FormattedMessage
                id={item.i18n}
                defaultMessage={item.text}
              />}
              style={{marginBottom: 10,}}>
              {/*<div key={tableKey}>*/}
              {/*  <div className={styles.title} key={titleKey}>{item.text}</div>*/}
              <Table
                columns={columns}
                // style={{
                //   marginBottom: 16,
                // }}
                dataSource={itemData}

                loading={loading}
                bordered={false}
                size="small"
                pagination={{hideOnSinglePage: true, disabled: true, defaultPageSize: 50}}
              />
              {/*</div>*/}
            </Card>

          )

        })}


    </React.Fragment>)
}


export const StockItemChart = ({dataMethod, symbol}) => {
  let view
  /* 相对数据 和 自身数据 */
  if (dataMethod === "src") {
    view = constants.DATA_SET.getView(symbol)
  } else {
    view = constants.DATA_SET.getView(symbol + constants.DATA_SET_REL_SUFIX)
  }

  /* 获取最大值和最小值*/
  let minVal = view.rows[0]
  let maxVal = view.rows[0]
  for (var i = 1; i < view.rows.length; i++) {
    if (view.rows[i].Close <= minVal.Close) {
      minVal = view.rows[i]
    }
    if (view.rows[i].Close >= maxVal.Close) {
      maxVal = view.rows[i]
    }
  }

  /* 最小值 圆点*/
  const minOption = {
    line: null,
    point: {
      style: {stroke: null, fill: '#FF4D4F', shape: "circle",},
      shape: "circle",
      size: 1,
      color: '#FF4D4F'
    },
    position: [minVal.Date, minVal.Close],
  }
  /* 最大值 圆点*/
  const maxOption = {
    line: null,
    point: {
      style: {stroke: null, size: 1, fill: '#009966'},
      shape: "circle",
      size: 1,
      color: '#009966'
    },
    position: [maxVal.Date, maxVal.Close]
  }

  const option = {
    pure: true,
    height: 30,
    width: 150,
    data: view.rows,
    autoFit: true
  }

  const lineChart = {size: 1,}

  return (
    <Chart padding={[3, 3, 3, 3]}{...option} >
      <Area position="Date*Close"/>
      <Line position="Date*Close" {...lineChart}/>
      {/*<Annotation.RegionFilter {...regionFilterDown}/>*/}
      <Annotation.DataMarker {...minOption}/>
      <Annotation.DataMarker {...maxOption}/>
    </Chart>
  )
}

export default RelStockBm;
