import React from 'react';
import {useIntl, FormattedMessage} from 'umi';
import {
  Annotation,
  Chart,
  Tooltip,
  Legend,
  Line,
} from 'bizcharts';
import {Card} from "antd";
import * as Gconstants from "@/constants";
import * as constants from "@/pages/economic/constants";

const FederalFundsRateChart = ({loading}) => {
  var view = constants.DATA_SET.getView(constants.FFR_VIEW)
  const intl = useIntl();

  return (
    <Card style={{marginBottom: 10}}
          loading={loading}
          title={intl.formatMessage({
            id: 'economic.ffr.title',
            defaultMessage: 'Federal Funds Rate',
          })}>
      <Chart padding={[10, 10, 70, 30]} height={300} data={view.rows} autoFit>
        <Line shape="hv" position="day*value"/>
        <Tooltip shared showCrosshairs/>
        <Legend/>
        <Annotation.Text {...Gconstants.CHART_COPYRIGHT}/>
      </Chart>
    </Card>
  )
}

export default FederalFundsRateChart;
