import React, {Component} from 'react';
import { FormattedMessage } from 'react-intl'
import {connect} from "react-redux";
import {Col, Row,Collapse} from "antd";

import {
  getMarketSomaHold,
  geNewyorktWei,
  getOliCopperGoldRatio,
  getTreasuryRealRates,
  getJoblessClaims,
  getCPI,
  getFFR
} from "./store/actionCreators";

import {Loading} from "../USUI";
import {
  MarketSomaHoldChart,
  WeiChart,
  OliCopperGoldRatio,
  TreasuryRealRates,
  JoblessClaims,
  CPI,
  FederalFundsRate
} from "./chart";

const { Panel } = Collapse;

class Economic extends Component{
  render() {
    return (
      <React.Fragment>
        <Row justify="center" align="top">
          <Col xs={{span: 24}} sm={{span: 24}} md={{span: 20}} lg={{span: 20}} xl={{span: 20}} align="top">
            <Collapse defaultActiveKey={['eco3',]} >
              <Panel header={ <FormattedMessage id='us_employment_statistics' /> } key="eco1">
                {
                  this.props.joblessClaimStatus
                    ? <Loading/>
                    : <JoblessClaims {...this.props}/>
                }
              </Panel>
              
              <Panel header={ <FormattedMessage id='fed_open_market_account_holdings' />} key="eco2">
                {
                  this.props.somaHolDataStatus
                    ? <Loading/>
                    : <MarketSomaHoldChart {...this.props}/>
                }
              </Panel>
              
              <Panel header={ <FormattedMessage id='weekly_economic_index' />} key="eco3">
                {
                  this.props.weiStatus
                    ? <Loading/>
                    : <WeiChart {...this.props}/>
                }
              </Panel>
              
              <Panel header={ <FormattedMessage id='gold_oil_copper_interest_title' /> } key="eco4" >
                {
                  this.props.OliCopperGoldRatioStatus
                    ? <Loading/>
                    : <OliCopperGoldRatio {...this.props}/>
                }
              </Panel>
              
              <Panel header={ <FormattedMessage id='us_treasury_real_interest_rate' /> } key="eco5">
                {
                  this.props.treasuryRealRatesStatus
                    ? <Loading/>
                    : <TreasuryRealRates {...this.props}/>
                }
              </Panel>
              
              <Panel header="CPI" key="eco6">
                {
                  this.props.cpiStatus
                    ? <Loading/>
                    : <CPI {...this.props}/>
                }
              </Panel>
              <Panel header="Federal Founds Rate" key="eco7">
                {
                  this.props.ffrStatus
                    ? <Loading/>
                    : <FederalFundsRate {...this.props}/>
                }
              </Panel>
            </Collapse>

          </Col>
        </Row>
      </React.Fragment>);
  }
  componentDidMount() {
    this.props.getSomaHold();
    this.props.getWei();
    this.props.getOliCopperGR();
    this.props.getTreasuryRealRates();
    this.props.getJoblessClaimsDis();
    this.props.getCPIDis();
    this.props.getFFRDis();
  }
}

const mapState = (state) => {
  return {
    somaHolDataList: state.getIn(['usEconomic', 'somaHolDataList']),
    somaHolDataStatus: state.getIn(['usEconomic', 'somaHolDataStatus']),
    weiStatus: state.getIn(['usEconomic', 'weiStatus']),
    weiDatalist: state.getIn(['usEconomic', 'weiDatalist']),
    OliCopperGoldRatioStatus: state.getIn(['usEconomic', 'OliCopperGoldRatioStatus']),
    OliCopperGoldRatioData: state.getIn(['usEconomic', 'OliCopperGoldRatioData']),
    treasuryRealRatesStatus: state.getIn(['usEconomic', 'treasuryRealRatesStatus']),
    treasuryRealRatesData: state.getIn(['usEconomic', 'treasuryRealRatesData']),
    joblessClaimStatus: state.getIn(['usEconomic', 'joblessClaimStatus']),
    joblessClaimsData: state.getIn(['usEconomic', 'joblessClaimsData']),
    cpiStatus: state.getIn(['usEconomic', 'cpiStatus']),
    cpiData: state.getIn(['usEconomic', 'cpiData']),
    ffrStatus: state.getIn(['usEconomic', 'ffrStatus']),
    ffrData: state.getIn(['usEconomic', 'ffrData']),
  }
};

// redux 数据修改逻辑映射 store.dispatch, props
const mapDispatch = (dispatch) => ({
  // load data
  getSomaHold(){
    dispatch(getMarketSomaHold())
  },
  getWei(){
    dispatch(geNewyorktWei())
  },
  getOliCopperGR(){
    dispatch(getOliCopperGoldRatio())
  },
  getTreasuryRealRates(){
    dispatch(getTreasuryRealRates())
  },
  getJoblessClaimsDis(){
    dispatch(getJoblessClaims())
  },
  getCPIDis(){
    dispatch(getCPI())
  },
  getFFRDis(){
    dispatch(getFFR())
  }
})

export default connect(mapState, mapDispatch)(Economic)