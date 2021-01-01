import React from "react";
import {Card,Row,Col} from "antd";
import {useIntl} from 'umi';

import {
  Chart,
  Tooltip,
  Legend,
  Axis,
  Polygon,
} from 'bizcharts';

import * as constants from "@/constants";

const BreadthHeatLeft = (props) => {
  const intl = useIntl();
  var ds = constants.DATA_SET.getView(constants.SP500_BREADTH_KEY)



  const scale = {
    name: {
      type: 'cat',
      values: constants.CHART_CODE_LIST,
    },
    time: {
      type: 'cat',
      // values: props.days || [],
    },
    value: {
      alias: '宽度'
    },
    sales: {
    }
  };
  const codeLabel = {
    formatter(text, item, index) {
      let i18n = intl.formatMessage({
        id: constants.BREADTH_CODE_I18N[text],
        defaultMessage: constants.BREADTH_CODE_I18N_DEF[text],
      })
      return `${text}\n${i18n}`;
    }
  }

  return (
    <React.Fragment>
        <Chart
          scale={scale}
          height={3000}
          animate={false}
          data={props.data}
          forceFit={true}
        >

          <Axis position={'top'} label={codeLabel} name={'code'}/>
          <Axis name={'time'}/>
          <Legend position='left-top' offsetY={100} visible={false}/>

          <Tooltip shared showMarkers={false}/>
          <Polygon
            position={'code*time'}
            color={['value', '#FB5050-#FFFFFF-#009966']}
            label={['value', {
              offset: -2,
              style: {
                fill: '#2E2E2E',
                shadowBlur: 50,
                shadowColor: 'rgba(0, 0, 0, .45)',
              },
            }]}
          >

          </Polygon>
        </Chart>
    </React.Fragment>
  )
}

const BreadthHeatRight = (props) => {
  const intl = useIntl();

  const scale = {
    name: {
      type: 'cat',
      values: ['TOTAL'],
    },
    time: {
      type: 'cat',
    },
    value: {
      alias: '宽度'
    },
    sales: {
      nice: true,
    }
  };
  const codeLabel = {
    formatter(text, item, index) {
      let i18n = intl.formatMessage({
        id: constants.BREADTH_CODE_I18N[text],
        defaultMessage: constants.BREADTH_CODE_I18N_DEF[text],
      })
      return `${text}\n${i18n}`;
    }
  }

  return (
    <React.Fragment>
        <Chart
          scale={scale}
          height={3000}
          animate={true}
          data={props.data}
          forceFit={true}
        >

          <Axis position={'top'} label={codeLabel} name={'code'}/>
          <Axis name={'time'} visible={false}/>
          <Legend position='left-top' offsetY={100} visible={false}/>

          <Tooltip shared showMarkers={false}/>
          <Polygon
            position={'code*time'}
            color={['value', '#FB5050-#FFFFFF-#009966']}
            label={['value', {
              offset: -2,
              style: {
                fill: '#2E2E2E',
                shadowBlur: 50,
                shadowColor: 'rgba(0, 0, 0, .45)',
              },
            }]}
          >

          </Polygon>
        </Chart>
    </React.Fragment>
  )
}


const BreadthHeat = ({heatMapDataLeft, heatMapDataRight,}) => {
  return (
    <React.Fragment>
      <Card>
        <Row justify="center" align="top">
          <Col xs={{span: 0}} sm={{span: 21}} md={{span: 21}} lg={{span: 21}} xl={{span: 21}}>
            <BreadthHeatLeft data={heatMapDataLeft}/>
          </Col>
          <Col xs={{span: 0}} sm={{span: 2}} md={{span: 2}} lg={{span: 2}} xl={{span: 2}} offset={1} align="top">
            <BreadthHeatRight data={heatMapDataRight}/>
          </Col>
        </Row>
      </Card>
    </React.Fragment>)
}

export default BreadthHeat;
