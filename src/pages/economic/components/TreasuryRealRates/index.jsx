import React from 'react';
import {useIntl, FormattedMessage} from 'umi';
import {
  Annotation,
  Chart,
  Tooltip,
  Legend,
  Interaction,
  LineAdvance
} from 'bizcharts';
import {Card} from "antd";
import * as Gconstants from "@/constants";
import * as constants from "@/pages/economic/constants";

const TreasuryRealRatesChart = ({loading}) => {
  var view = constants.DATA_SET.getView(constants.TREAS_REAL_RATE_VIEW)
  const intl = useIntl();


  return (
    <Card style={{marginBottom: 10}}
          loading={loading}
          title={intl.formatMessage({
            id: 'economic.trr.title',
            defaultMessage: 'Daily Treasury Real Yield Curve Rates',
          })}>
      <Chart padding={[10, 10, 70, 30]} height={330} data={view.rows} autoFit>
        <Tooltip shared showCrosshairs/>
        <LineAdvance
          shape="smooth"
          position="DATE*value"
          color="year"
        />
        <Legend
          name='year'
          filter={year => {
            return year === '5 YR' | year === '10 YR'
          }}/>
        <Interaction type='legend-filter'/>
        <Annotation.Text {...Gconstants.CHART_COPYRIGHT}/>
      </Chart>
    </Card>
  )
}

export default TreasuryRealRatesChart;
