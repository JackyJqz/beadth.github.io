import React from 'react';
import {useIntl, FormattedMessage} from 'umi';
import {
  Annotation,
  Chart,
  Line,
  Axis,
  Tooltip,
  Slider,
} from 'bizcharts';
import {Card} from "antd";
import * as Gconstants from "@/constants";
import * as constants from "@/pages/economic/constants";

const JoblessClaimsChart = ({loading}) => {
  var view = constants.DATA_SET.getView(constants.JOBLESS_CLAIMS_VIEW)
  const intl = useIntl();

  /* 图表显示的文字*/
  const scale = {
    initial_revised: {
      alias: intl.formatMessage({id: 'economic.jobless.initial'}),
      tickCount: 3,
    },
    continuing_actual: {
      alias: intl.formatMessage({id: 'economic.jobless.continuing'}),
      tickCount: 3,
    }
  }

  return (
    <Card
      loading={loading}
      style={{marginBottom: 10}}
      title={intl.formatMessage({
        id: 'economic.jobless.title',
        defaultMessage: 'Jobless Claims',
      })}>
      <Chart padding={[10, 60, 50, 50]} scale={scale} height={300} data={view.rows} autoFit>
        <Tooltip shared showCrosshairs/>
        <Axis name="initial_revised" title/>
        <Axis name="continuing_actual" title/>
        <Line position="time*initial_revised" color={"#000000"}/>
        <Line position="time*continuing_actual" color={"#CC0066"}/>
        <Slider
          start={0.9}
          formatter={(v, d, i) => {
            return ``;
          }}
        />
        <Annotation.Text {...Gconstants.CHART_COPYRIGHT}/>
      </Chart>
    </Card>
  )
}

export default JoblessClaimsChart;
