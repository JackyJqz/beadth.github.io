import React from 'react';
import {useIntl, FormattedMessage} from 'umi';
import {
  Annotation,
  Chart,
  Line,
  Tooltip,
  Legend,
  Slider,
  Axis,
} from 'bizcharts';
import {Card} from "antd";
import * as Gconstants from "@/constants";
import * as constants from "@/pages/economic/constants";

const OliCopperGoldRatio = ({loading}) => {
  var view = constants.DATA_SET.getView(constants.OLI_COPPRER_GLD_RATIO_VIEW)
  const intl = useIntl();


  const scale = {
    copper_gold_ratio: {
      min: 0.00006,
      max: 0.00019,
      alias: intl.formatMessage({
        id: 'economic.ocgr.copper-gold-ratio',
        defaultMessage: 'OliCopperGold Ratio'
      }),
    },
    interest_rates: {
      min: 0,
      max: 3.5,
      alias: intl.formatMessage({
        id: 'economic.ocgr.fed-interest-rate',
        defaultMessage: 'Fed Interest Rate'
      }),
    },
    oil_gold_ratio: {
      min: -0.03,
      max: 0.07,
      alias: intl.formatMessage({
        id: 'economic.ocgr.gold-oil-ratio',
        defaultMessage: 'Gold Oil Ratio'
      }),
    },
    t: {
      alias: "日期"
    }
  }

  return (
    <Card style={{marginBottom: 10}}
          loading={loading}
          title={intl.formatMessage({
            id: 'economic.ocgr.title',
            defaultMessage: 'OliCopperGold Ratio',
          })}>
      <Chart padding={[10, 10, 10, 10]} scale={scale} height={330} data={view.rows} autoFit>
        <Tooltip shared showCrosshairs/>
        <Slider start={0.5}/>
        <Axis name="t" label={null}/>
        <Axis name="copper_gold_ratio" label={null}/>
        <Axis name="interest_rates" label={null}/>
        <Axis name="oil_gold_ratio" label={null}/>
        <Line position="t*copper_gold_ratio" color={"#FF8C00"}/>
        <Line position="t*interest_rates" color={"#000000"}/>
        <Line position="t*oil_gold_ratio" color={"#7CFC00"}/>
        <Legend/>
        <Annotation.Text {...Gconstants.CHART_COPYRIGHT}/>
      </Chart>
    </Card>
  )
}

export default OliCopperGoldRatio;
