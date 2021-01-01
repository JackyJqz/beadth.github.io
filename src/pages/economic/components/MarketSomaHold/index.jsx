import React from 'react';
import {useIntl, FormattedMessage} from 'umi';
import {
  Annotation,
  Chart,
  Line,
  Tooltip,
  Legend,
} from 'bizcharts';
import {Card} from "antd";
import * as Gconstants from "@/constants";
import * as constants from "@/pages/economic/constants";

const MarketSomaHoldChart = ({loading}) => {
  var view = constants.DATA_SET.getView(constants.MARKET_SOMA_HOLD_VIEW)
  const intl = useIntl();


  const scale = {
    value: {
      type: "linear",
      min: 0,
    },
    asOfDate: {
      type: 'timeCat',
      alias: '日期'
    }
  }

  return (
    <Card style={{marginBottom: 10}}
          loading={loading}
          title={intl.formatMessage({
            id: 'economic.mshd.titles',
            defaultMessage: 'System Open Market Account Holdings of Domestic Securities',
          })}>
      <Chart padding={[10, 20, 50, 50]} scale={scale} height={330} data={view.rows} autoFit>
        <Tooltip shared showCrosshairs/>
        <Line shape="line" position="asOfDate*value" color="type"/>
        <Legend useHtml={true}/>
        <Annotation.Text {...Gconstants.CHART_COPYRIGHT}/>
      </Chart>
    </Card>
  )
}

export default MarketSomaHoldChart;
