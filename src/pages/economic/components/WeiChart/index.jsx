import React from 'react';
import {useIntl, FormattedMessage} from 'umi';
import {
  Annotation,
  Chart,
  Line,
  Tooltip,
  Slider,
} from 'bizcharts';
import {Card} from "antd";
import * as Gconstants from "@/constants";
import * as constants from "@/pages/economic/constants";

const WeiChart = ({loading}) => {
  var weiData = constants.DATA_SET.getView(constants.WEI_VIEW)
  const intl = useIntl();

  /* 获取最大值和最小值*/
  let minVal = weiData.rows[0]
  let maxVal = weiData.rows[0]
  for (var i = 1; i < weiData.rows.length; i++) {
    if (weiData.rows[i].value <= minVal.value) {
      minVal = weiData.rows[i]
    }
    if (weiData.rows[i].value >= maxVal.value) {
      maxVal = weiData.rows[i]
    }
  }

  /*指数当前值同比前一个值上涨 or 下跌， 同时设置对应的颜色和箭头*/
  const last_two = weiData.rows[weiData.rows.length - 2]
  const current = weiData.rows[weiData.rows.length - 1]
  var flagStr = "▲"
  var flagClo = "#0B6121"
  if (current.value < last_two.value) {
    flagStr = "▼"
    flagClo = "#FF0000"
  }

  const scale = {
    value: {
      min: -15,
      max: 8,
      alias: intl.formatMessage({id: 'economic.wei.index', defaultMessage: 'Wei Index'})
    },
    time: {
      tickCount: 15,
    }
  }

  return (
    <Card style={{marginBottom: 10}}
          loading={loading}
          title={intl.formatMessage({
            id: 'economic.wei.titles',
            defaultMessage: 'Weekly Economic Index (WEI)',
          })}>
      <Chart padding={[10, 10, 50, 30]} scale={scale} autoFit height={300} data={weiData.rows}>
        <Line shape="line" position="time*value" color="type"/>
        <Tooltip shared showCrosshairs/>
        <Slider start={0.8}/>
        <Annotation.DataMarker
          position={[current.time, current.value]}
          text={{
            content: flagStr + current.value,
            style: {
              textAlign: 'right',
              fontSize: 13,
              fill: flagClo,
            },
          }}
          line={{
            length: 20,
          }}
          direction="upward"
        />
        <Annotation.DataMarker
          position={[minVal.time, minVal.value]}
          text={{
            content: 'Low: ' + minVal.value,
            style: {
              textAlign: 'right',
              fontSize: 13
            },
          }}
          line={{
            length: 10,
          }}
          direction="downward"
        />
        <Annotation.DataMarker
          position={[maxVal.time, maxVal.value]}
          text={{
            content: 'Hi: ' + maxVal.value,
            style: {
              textAlign: 'left',
              fontSize: 13
            },
          }}
          line={{
            length: 20,
          }}
          direction="upward"
        />
        <Annotation.Line
          start={['min', 2]}
          end={['max', 2]}
          style={{
            lineDash: [4, 2],
            stroke: '#FF4D4F'
          }}
          text={{
            position: 'start',
            content: '2.00 ▼',
            style: {
              fill: '#FF4D4F'
            },
            offsetX: -20,
            offsetY: -5,
          }}
        />
        <Annotation.Line
          start={['min', -3.76]}
          end={['max', -3.76]}
          style={{
            lineDash: [4, 2],
            stroke: '#0080FF'
          }}
          text={{
            position: 'start',
            content: '-3.76 ▼',
            style: {
              fill: '#0080FF'
            },
            offsetX: -20,
            offsetY: -5,
          }}
        />
        <Annotation.Text {...Gconstants.CHART_COPYRIGHT}/>
      </Chart>
    </Card>
  )
}

export default WeiChart;
