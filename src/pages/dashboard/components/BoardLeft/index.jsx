import React from 'react';
import {Card, Col, Row, Table} from 'antd';

import * as constants from "@/constants";
import * as utils from "@/pages/dashboard/utils/utils";
import {FormattedMessage} from "umi";
import {StockItemChart} from "@/pages/dashboard/components/RelStockBm";


const BoardLeft = ({loading, rdv, rds}) => {
  return (
    <React.Fragment>
      <Row gutter={24}>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Left loading={loading}/>
        </Col>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Right/>
        </Col>
      </Row>
    </React.Fragment>)
}

const Left = ({loading,}) => {
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
          key: i,
          src: item,
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
      title: '5D%',
      dataIndex: 'd5',
      sorter: (a, b) => b.d5 - a.d5,
      render: (data) => valColor(data)
    },
    {
      title: '1M',
      dataIndex: 'src',
      render: (symbol) => {
        return (<StockItemChart dataMethod={'src'} symbol={symbol}/>)
      }
    },
  ]
  return (
    <React.Fragment>
      {
        constants.DASHBOARD_LEFT_ONE.map((item, index) => {
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
              <Table
                columns={columns}
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
    </React.Fragment>
)}

const Right = () => {

}

export default BoardLeft;
