import React from 'react';
import {useIntl, FormattedMessage} from 'umi';
import {
  Annotation,
  Chart,
  Tooltip,
  Line,
} from 'bizcharts';
import {Card} from "antd";
import * as Gconstants from "@/constants";
import * as constants from "@/pages/economic/constants";

const CPIChart = ({loading}) => {
  var view = constants.DATA_SET.getView(constants.CPI_VIEW)
  const intl = useIntl();

  const scale = {
    value: {
      min: -0.03,
      max: 0.07,
      alias: intl.formatMessage({
        id: 'economic.cpi.interest-rate',
        defaultMessage: 'Interest Rate'
      }),
    },

  }

  return (
    <Card style={{marginBottom: 10}}
          loading={loading}
          title={intl.formatMessage({
            id: 'economic.cpi.title',
            defaultMessage: 'United States Consumer Price Index (CPI)',
          })}>
      <Chart scale={scale} padding={[10, 10, 70, 30]} height={300} data={view.rows} autoFit>
        <Line shape="hv" position="day*value"/>
        <Tooltip shared showCrosshairs/>
        <Annotation.Text {...Gconstants.CHART_COPYRIGHT}/>
      </Chart>
    </Card>
  )
}

export default CPIChart;
