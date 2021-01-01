import React from 'react';
import {InfoCircleOutlined} from '@ant-design/icons';
import {Col, Row, Tooltip} from 'antd';
import {FormattedMessage} from 'umi';

import styles from '../style.less';
import Trend from './Trend';
import ChartCard from "./ChartCard";
import Field from "./Field"
import MiniProgress from "./MiniProgress"
import {USSP_MAX_BREADTH} from "@/pages/constants";

const topColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  style: {
    marginBottom: 10,
  },
};

const BreadthRow = ({loading, lastBreadth, preBreadth, openBreadth}) => {

  const dayPa = (lastBreadth - preBreadth)/preBreadth * 100
  const lastPa = (lastBreadth / USSP_MAX_BREADTH *100).toFixed(1)
  const prePa = (preBreadth / USSP_MAX_BREADTH *100).toFixed(1)
  const openPa = (openBreadth / USSP_MAX_BREADTH *100).toFixed(1)


  let flag = ""
  if (lastBreadth > preBreadth){
    flag = 'up'
  }
  if (lastBreadth < preBreadth){
    flag = 'down'
  }


  return (<React.Fragment>
    <Row gutter={24} type="flex">
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title={
            <FormattedMessage
              id="breadth.breadth.last-breadth"
              defaultMessage="Last Breadth"
            />
          }
          action={
            <Tooltip
              title={
                <FormattedMessage
                  id="breadth.breadth.introduce"
                  defaultMessage="Introduce"
                />
              }
            >
              <InfoCircleOutlined/>
            </Tooltip>
          }
          loading={loading}
          total={lastBreadth}
          footer={
            <Field
              label={
                <FormattedMessage
                  id="breadth.breadth.prev-close"
                  defaultMessage="Prev Close"
                />
              }
              value={preBreadth}
            />
          }
          contentHeight={46}
        >
          <Trend
            style={{
              marginRight: 16,
            }}
          >
            <FormattedMessage
              id="breadth.breadth.open"
              defaultMessage="Open"
            />
            <span className={styles.trendText}>{openBreadth}</span>
          </Trend>
          <Trend flag={flag}>
            <FormattedMessage id="dashboardandanalysis.analysis.day" defaultMessage="Daily Changes"/>
            <span className={styles.trendText}>{dayPa.toFixed(2)}%</span>
          </Trend>
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          loading={loading}
          bordered={false}
          title={
            <FormattedMessage
              id="breadth.breadth.mbp"
              defaultMessage="Breadth Percentage"
            />
          }
          action={
            <Tooltip
              title={
                <FormattedMessage
                  id="dashboardandanalysis.analysis.introduce"
                  defaultMessage="Introduce"
                />
              }
            >
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={ lastPa + "%"}
          footer={
            <div
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              <Trend
                flag=""
                style={{
                  marginRight: 16,
                }}
              >
                <FormattedMessage
                  id="breadth.breadth.open"
                  defaultMessage="Open"
                />
                <span className={styles.trendText}>{openPa}%</span>
              </Trend>
              <Trend>
              <FormattedMessage
                id="breadth.breadth.prev-close"
                defaultMessage="Prev Close"
              />
              <span className={styles.trendText}>{prePa}%</span>
            </Trend>
            </div>
          }
          contentHeight={46}
        >
          <MiniProgress percent={lastPa} strokeWidth={8} target={lastPa} color="#13C2C2" />
        </ChartCard>
      </Col>
    </Row>
  </React.Fragment>)
};

export default BreadthRow;
