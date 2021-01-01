import React from 'react';
import {useIntl, FormattedMessage} from 'umi';
import {
  Annotation,
  Chart,
  Slider,
  Line,
  Tooltip,
  Axis,
} from 'bizcharts';
import {Card} from "antd";
import * as Gconstants from "@/constants";
import * as constants from "@/pages/economic/constants";

const GoldHold = ({loading}) => {
  var view = constants.DATA_SET.getView(constants.GOLD_STOCK_VIEW)
  const intl = useIntl();

  const scale = {
    GLD_Close: {
      min: 80,
      max: 200,
      alias: intl.formatMessage({
        id: 'economic.gold-hold.gold',
        defaultMessage: "GLD GOLD Share Price"
      }),
    },
    TNAVT: {
      min: 500,
      max: 1350,
      alias: intl.formatMessage({
        id: 'economic.gold-hold.gold_holding',
        defaultMessage: 'GLD Gold Trust Gold Holding (Metric Tons)'
      }),
    },
    Date: {
      alias: "日期",
      type: 'timeCat',
    }
  }

  return (
    <Card style={{marginBottom: 10}}
          loading={loading}
          title={intl.formatMessage({
            id: 'economic.gold-hold.titles',
            defaultMessage: 'Weekly Economic Index (WEI)',
          })}>
      <Chart padding={[10, 20, 50, 50]} scale={scale} height={330} data={view.rows} autoFit>
        <Tooltip shared showCrosshairs/>
        <Slider start={0.5} padding={[10, 20, 30, 30]}/>
        <Axis name="Date" label={null}/>
        <Axis name="GLD_Close" label={null}/>
        <Axis name="TNAVT" label={null}/>
        <Line position="Date*TNAVT" color={"#FF8C00"}/>
        <Line position="Date*GLD_Close" color={"#000000"}/>
        <Annotation.Text {...Gconstants.CHART_COPYRIGHT}/>
      </Chart>
    </Card>
  )
}

export default GoldHold;
