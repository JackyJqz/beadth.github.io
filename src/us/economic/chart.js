import React from 'react';
import { useIntl } from 'react-intl';

import {
  Annotation,
  Chart,
  Line,
  Axis,
  Tooltip,
  LineAdvance,
  Legend,
  Interaction,
  Slider,
} from 'bizcharts';
import {CHART_COPYRIGHT, FED_SOMA_KEY_MAP, SOMA_HOLD_FIELD, TREASURY_REAL_RATES_FIELD} from "../../constants";

export const MarketSomaHoldChart = (props) => {

  props.somaHolDataList.transform({
    type: 'fold',
    fields: SOMA_HOLD_FIELD, // 展开字段集
    key: 'type', // key字段
    value: 'value', // value字段
  })
  props.somaHolDataList.transform({
    type: "pick",
    fields: ["asOfDate", "type", "value"],
  })
  props.somaHolDataList.transform({
    type: "map",
    callback(row) {
      row.type = FED_SOMA_KEY_MAP[row.type] || row.type
      row.value = isNaN(row.value)
        ? 0
        : (parseFloat(row.value) / 10 ** 9).toFixed(4);
      return row;
    },
  })
  const scale = {
    value: {
      type: "linear",
      min:0,
    },
    asOfDate:{
      type: 'timeCat',
      alias:'日期'
    }
  }

  return (
    <React.Fragment>
      <Chart padding="auto" scale={scale} height={500} data={props.somaHolDataList.rows} autoFit>
        <Tooltip shared showCrosshairs/>
        <Line shape="line" position="asOfDate*value" color="type" />
      </Chart>
    </React.Fragment>

  );
}

export const WeiChart = (props) => {
  const minVal = props.weiDatalist.min("value")
  const maxVal = props.weiDatalist.max("value")
  const last_two = props.weiDatalist.rows[props.weiDatalist.rows.length-2]
  const current = props.weiDatalist.rows[props.weiDatalist.rows.length-1]
  var flagStr = "▲"
  var flagClo = "#0B6121"
  if (current.value < last_two.value){
    flagStr = "▼"
    flagClo = "#FF0000"
  }

  for (var i=0; i<props.weiDatalist.rows.length;i++){
    if (props.weiDatalist.rows[i].value === minVal){
      var minTime = props.weiDatalist.rows[i].time
    }
    if (props.weiDatalist.rows[i].value === maxVal){
      var maxTime = props.weiDatalist.rows[i].time
    }
  }

  const intl = useIntl();

  const scale = {
    value:{
      min: -15,
      max: 8,
      alias: intl.formatMessage({ id: 'economic_index' })
    },
    time:{
      tickCount:15,
    }
  }

  return (
    <div>
      <Chart padding={[10, 10, 10, 10]} scale={scale} autoFit height={500} data={props.weiDatalist.rows}>
        <Line shape="line" position="time*value" color="type" />
        <Tooltip shared showCrosshairs />
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
          position={[minTime, minVal]}
          text={{
            content: 'Low: ' + minVal,
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
          position={[maxTime, maxVal]}
          text={{
            content: 'Hi: ' + maxVal,
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
        <Annotation.Text {...CHART_COPYRIGHT}/>
      </Chart>
    </div>)
}

export const OliCopperGoldRatio = (props) => {
  const intl = useIntl();

  const scale = {
    copper_gold_ratio: {
      min: 0.00006,
      max: 0.00019,
      alias: intl.formatMessage({ id: 'copper_gold_ratio' }),
    },
    interest_rates: {
      min: 0,
      max: 3.5,
      alias: intl.formatMessage({ id: 'fed_interest_rate' }),
    },
    oil_gold_ratio: {
      min: -0.03,
      max: 0.07,
      alias: intl.formatMessage({ id: 'gold_oil_ratio' }),
    },
    t:{
      alias: "日期"
    }
  }


  return (
    <React.Fragment>
      <Chart padding="auto" scale={scale} height={400} data={props.OliCopperGoldRatioData.rows}  autoFit>
        <Tooltip shared showCrosshairs />
        <Slider start={0.5}/>
        <Axis name="t" label={null}/>
        <Axis name="copper_gold_ratio" label={null}/>
        <Axis name="interest_rates" label={null}/>
        <Axis name="oil_gold_ratio" label={null}/>
        <Line position="t*copper_gold_ratio" color={"#FF8C00"}/>
        <Line position="t*interest_rates" color={"#000000"}/>
        <Line position="t*oil_gold_ratio" color={"#7CFC00"}/>
        <Legend/>
      </Chart>
    </React.Fragment>
  );
}

export const TreasuryRealRates = (props) => {
  const intl = useIntl(); // eslint-disable-line
  
  props.treasuryRealRatesData.transform({
    type: 'fold',
    fields: TREASURY_REAL_RATES_FIELD, // 展开字段集
    key: 'year', // key字段
    value: 'value', // value字段
  })

  return (
    <React.Fragment>
      <Chart padding="auto" height={300} data={props.treasuryRealRatesData.rows}  autoFit>
        <Tooltip shared showCrosshairs />
        {/*<Line shape="smooth" position="Date*value" color="year" />*/}
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
        <Interaction type='legend-filter' />
      </Chart>
    </React.Fragment>
  );
}

export const JoblessClaims = (props) => {
  props.joblessClaimsData.transform({
    type: 'impute',
    field: 'continuing_actual',       // 待补全字段
    groupBy: [ 'initial_revised' ], // 分组字段集（传空则不分组）
    method: 'value',     // 补全字段值时执行的规则
    value: NaN,
  });

  const intl = useIntl();

  const scale = {
    initial_revised: {
      // min: 100,
      // max: 8000,
      alias: intl.formatMessage({ id: 'us_initial_jobless_claims' }),
      tickCount: 3,
    },
    continuing_actual: {
      // min: 800,
      // max: 27000,
      alias: intl.formatMessage({ id: 'us_continuing_jobless_claims' }),
      tickCount: 3,
    }
  }
  return (
    <React.Fragment>
      <Chart padding="auto" scale={scale} height={500} data={props.joblessClaimsData.rows}  autoFit>
        <Tooltip shared showCrosshairs />
        <Axis name="initial_revised" title />
        <Axis name="continuing_actual" title />
        <Line position="time*initial_revised" color={"#000000"}/>
        <Line position="time*continuing_actual" color={"#CC0066"}/>
        <Slider
          start={0.9}
          formatter={(v, d, i) => {
            return ``;
          }}
        />
      </Chart>
    </React.Fragment>
  );
}


// TODO 最好下面两张图表合并
export const CPI = (props) => {
  // props.cpiFederalData.transform({
  //   type: 'impute',
  //   field: 'cpi',       // 待补全字段
  //   groupBy: [ 'ffr' ], // 分组字段集（传空则不分组）
  //   method: 'value',     // 补全字段值时执行的规则
  //   value: NaN
  // })

  // props.cpiFederalData.transform({
  //   type: 'impute',
  //   field: 'ffr',       // 待补全字段
  //   groupBy: [ 'cpi' ], // 分组字段集（传空则不分组）
  //   method: 'value',     // 补全字段值时执行的规则
  //   value: NaN
  // })

  // props.cpiData.transform({
  //   type: 'fold',
  //   fields: ['cpi',], // 展开字段集
  //   key: 'type', // key字段
  //   value: 'value', // value字段
  // })
  return (
    <React.Fragment>
      <Chart padding={[10, 20, 70, 40]} height={300} data={props.cpiData.rows}  autoFit>
        <Line shape="hv" position="day*value"/>
        <Tooltip shared showCrosshairs />
        <Legend />
        <Annotation.Text {...CHART_COPYRIGHT}/>
      </Chart>
    </React.Fragment>
  );
}

export const FederalFundsRate = (props) => {
  return (
    <React.Fragment>
      <Chart padding={[10, 20, 70, 40]} height={300} data={props.ffrData.rows}  autoFit>
        <Line shape="hv" position="day*value"/>
        <Tooltip shared showCrosshairs />
        <Legend />
        <Annotation.Text {...CHART_COPYRIGHT}/>
      </Chart>
    </React.Fragment>
  );
}

export const GOLD = (props) => {
  const intl = useIntl(); // eslint-disable-line

  const scale = {
    GLD_Close: {
      min: 80,
      max: 200,
      alias: intl.formatMessage({ id: 'gold' }),
    },
    TNAVT: {
      min: 500,
      max: 1350,
      alias: intl.formatMessage({ id: 'gold_holding' }),
    },
    Date:{
      alias: "日期",
      type: 'timeCat',
    }
  }

  return (
    <React.Fragment>
      <Chart padding={[10, 10, 10, 10]} scale={scale} height={300} data={props.gldData.rows}  autoFit>
        <Tooltip shared showCrosshairs />
        <Slider start={0.5} padding={[10, 20, 30, 30]}/>
        <Axis name="Date" label={null}/>
        <Axis name="GLD_Close" label={null}/>
        <Axis name="TNAVT" label={null}/>
        <Line position="Date*TNAVT" color={"#FF8C00"}/>
        <Line position="Date*GLD_Close" color={"#000000"}/>
        <Annotation.Text {...CHART_COPYRIGHT}/>
      </Chart>
    </React.Fragment>
  );
}
