import React from "react";
import {Card, Col, Row} from 'antd';
import {useIntl, FormattedMessage} from 'umi';

import {
  Chart,
  Legend,
  Axis,
  Line,
  Point,
  Annotation,
  Slider,
  BarChart,
  HistogramChart,
  Coordinate,
  Interval
} from 'bizcharts';
import * as constants from "@/constants";


const BreadthLine = ({date, data}) => {
  const intl = useIntl();
  const styles = {
    mainTitle: {
      fontSize: 16,
      color: "black",
      textAlign: "center"
    },
    subTitle: {
      fontSize: 14,
      color: "gray",
      textAlign: "center"
    }
  }

  //可配置样式
  const grid = {
    align: 'center', // 网格顶点从两个刻度中间开始
    line: null,
  }

  const sliCfg = {
    smooth: false
  }

  const scale = {
    breadth: {
      mix: 0,
      max: 1100,
      alias: '市场宽度'
    },
    day: {
      type: 'timeCat',
    }
  }

  return (
    <Card style={{marginBottom: 10}}>
      <h4 className='main-title' style={styles.mainTitle}>
        <FormattedMessage
          id="breadth.breadth.sp500-breadth-trend"
          defaultMessage="S&P 500 Breadth Trend"
        />
      </h4>
      <h5 className='sub-title' style={styles.subTitle}>
        {date}
      </h5>
      <Chart title={{
        visible: true,
        text: '面积图',
      }} scale={scale} padding={[10, 20, 40, 40]} autoFit height={220} data={data}>
        <Annotation.Text {...constants.CHART_COPYRIGHT}/>
        <Axis name="breadth" grid={grid}/>
        <Axis name="day" label={null}/>
        <Line shape="line" position="day*breadth" color=""/>
        <Legend visible={false}/>
        <Slider start={0.3} end={1} trendCfg={sliCfg}/>
        <Annotation.Line
          start={['min', '200']}
          end={['max', '200']}
          text={{
            position: 'end',
            content: intl.formatMessage({
              id: 'breadth.breadth.trend.area-buy',
              defaultMessage: 'Buying Area',
            }),
            style: {
              fill: '#FF4D4F',
              fontSize: 11,
            },
            offsetX: -34,
            offsetY: 20,
          }}
        />

        <Annotation.Line
          start={['min', '949']}
          end={['max', '949']}
          text={{
            position: 'end',
            content: intl.formatMessage({
              id: 'breadth.breadth.trend.area-sell',
              defaultMessage: 'Selling Area',
            }),
            style: {
              fill: '#FF4D4F',
              fontSize: 11,
            },
            offsetX: -34,
            offsetY: -5,
          }}
        />

        <Point
          position="day*breadth"
          shape={['breadth', (breadth) => {
            if (breadth < 201) {
              return 'triangle';
            }
            if (breadth > 949) {
              return 'triangle-down';
            }
            return '0'
          }]}
          color={['breadth', (breadth) => {
            if (breadth < 201 || breadth > 949) {
              return '#FB5050';
            }
            return '';
          }]}/>

      </Chart>
    </Card>
  )
}

const LastDayBreadth = ({data}) => {

  //
  // props.data.transform({
  //   type: 'fold',
  //   fields: constants.CHART_CODE_LIST, // 展开字段集
  //   key: 'code', // key字段
  //   value: 'value', // value字段
  //   retains: constants.SP500_POP_FIELD
  // })

  return (
    <Card style={{marginBottom: 10}}>
      {/*<BarChart data={data}*/}
      {/*          title={{*/}
      {/*            visible: false,*/}
      {/*            text: '当日',*/}
      {/*          }}*/}
      {/*          forceFit="auto"*/}

      {/*          xField='value'*/}
      {/*          yField='code'>*/}

      {/*</BarChart>*/}
      <Chart height={283} data={data} autoFit>
        <Coordinate transpose />
        <Interval position="code*value" />
      </Chart>
    </Card>
  )
}

const BreadthTrend = ({lastAllBreadh, date, data}) => {

  return (
    <React.Fragment>
      <Row gutter={24}>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <LastDayBreadth data={lastAllBreadh}/>
        </Col>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <BreadthLine date={date} data={data}/>
        </Col>
      </Row>
    </React.Fragment>)
}

export default BreadthTrend;
