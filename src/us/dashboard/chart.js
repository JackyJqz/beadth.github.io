import React from 'react';
import { Collapse, Table} from 'antd';

import {
  TinyAreaChart,
} from 'bizcharts';

import {calculationOfGains, relOfGains} from "./utils";
import {DATA_SET, DATA_SET_REL_SUFIX, US_ETF_ALL_MAP, US_ETF_GROUP_ALL_MAP} from "../../constants";

const { Panel } = Collapse;

export const ETFChart = (props) => {
  var valColor = function(data) {
      let style = {color: "#000",}
      if (data*1000 < 0){
        style.color = '#FB5050'
      }else if(data*1000 > 0) {
        style.color = '#009966'
      }
      return <span style={style}>{data}</span>
  };

  const columns = [
    {
      title: "Name",
      dataIndex: 'name',
      fixed: 'left',
      render: (etf) => {
        return US_ETF_ALL_MAP[etf]
      }
    },
    {
      title: "ETF",
      dataIndex: 'etf'
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
      render: (etf) => {
        return <div>
          <ETFItemChart dataMethod={'src'} etf={etf}/>
        </div>
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
      render: (etf) => {
        if (etf === 'VTI') {
          return "BM"
        }
        return <div>
          <ETFItemChart dataMethod={'rel'} etf={etf}/>
        </div>
      }
    }
  ]

  var d5f = function(etf, num) {
    let srcData = DATA_SET.getView(etf)
    return calculationOfGains(srcData.rows, num)
  };
  var activeKeyList = []
  for (var i = 0; i<US_ETF_GROUP_ALL_MAP.length; i++ ){
    activeKeyList.push("dashboard"+i)
  }


  return (
    <React.Fragment>
      <div className="card-container">
          <Collapse defaultActiveKey={activeKeyList}>
            {
              US_ETF_GROUP_ALL_MAP.map( (item,index) =>  {
                let key = 'dashboard' + index
                let tableKey = 'dashboardTable' + index
                var itemTable = []
                return (
                  <Panel showArrow={false} header={item.text} key={key}>
                    {
                      item.data.forEach((item, index) => (
                        itemTable.push({
                          etf:item,
                          d5: d5f(item,5),
                          d20: d5f(item, 20),
                          key: index,
                          r1: relOfGains(item, 1),
                          r5: relOfGains(item, 5),
                          r20: relOfGains(item, 20),
                          src:item,
                          rel:item,
                          name:item})
                      ))
                    }
                    <Table
                      columns={columns}
                      dataSource={itemTable}
                      key={tableKey}
                      loading={props.allETFStatus}
                      bordered={false}
                      size="small"
                      pagination={{hideOnSinglePage:true, disabled:true, defaultPageSize:50}}
                    />
                  </Panel>
                )
              })
            }
          </Collapse>
      </div>
    </React.Fragment>

  );
}

export const ETFItemChart = (props) => {
  var view
  if (props.dataMethod === "src") {
    view = DATA_SET.getView(props.etf)
  }else {
    view = DATA_SET.getView(props.etf + DATA_SET_REL_SUFIX)
  }
  // const dv = new View();
  // dv.source(view.rows)
  // var minVal = dv.min("Close") // eslint-disable-next-line
  // var maxVal = dv.max("Close") // eslint-disable-next-line

  const option = {
    pure: true,
    height:30,
    width:150,
    data: view.rows,
    xField: 'Date',
    yField: 'Close',
    }

  return <React.Fragment>
      <TinyAreaChart {...option} />
  </React.Fragment>
}

export const SDChart = (props) => {

}