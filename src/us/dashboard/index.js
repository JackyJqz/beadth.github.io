import React, {Component} from 'react';
import {connect} from "react-redux";

import {
  getAllETF,
  getBenchmark,
  getsp500smi
} from "./store/actionCreators";
import {Col, Row, Tabs} from "antd";
import {Loading} from "../USUI";
import {ETFChart} from "./chart";

const { TabPane } = Tabs;

class Dashboard extends Component{

  render() {
    return (
      <React.Fragment>
        <Row justify="center" align="top">
          <Col xs={{span: 24}} sm={{span: 24}} md={{span: 20}} lg={{span: 18}} xl={{span: 18}} align="top">
            <Tabs centered >
              {/*<TabPane tab="S&P 500" key="1" >*/}
              {/*</TabPane>*/}
              <TabPane tab="ETF" key="5" >
                {
                  this.props.allETFStatus
                    ? <Loading/>
                    : <ETFChart {...this.props}/>
                }
              </TabPane>
              <TabPane tab="Supply & Demand" key="4" disabled>
                {
                  this.props.sp500smiStatus
                    ? <Loading/>
                    : <ETFChart {...this.props}/>
                }
              </TabPane>
              <TabPane tab="Futures" key="2" disabled>
              </TabPane>
              <TabPane tab="Currency" key="3" disabled>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </React.Fragment>);
  }

  getETFMinMaxVal(etf) {
    var min = this.props.allETFDataView.min(etf);
    var max = this.props.allETFDataView.max(etf);
    return {min:min, max:max}
  }

  componentDidMount() {
    this.props.getBenchmarkDis();
    this.props.getAllETF();
    this.props.getsp500smiDis();
  }
}

const mapState = (state) => {
  return {
    allETFStatus: state.getIn(['usDashboard', 'allETFStatus']),
    allETFDataSet: state.getIn(['usDashboard', 'allETFDataSet']),
    benchmark: state.getIn(['usDashboard', 'benchmark']),
    benchmarkStatus: state.getIn(['usDashboard', 'benchmarkStatus']),
    relBenchmarkData: state.getIn(['usDashboard', 'relBenchmarkData']),
    BenchmarkData: state.getIn(['usDashboard', 'BenchmarkData']),
    BenchmarkSrcData: state.getIn(['usDashboard', 'BenchmarkSrcData']),
    sp500smiStatus: state.getIn(['usDashboard', 'sp500smiStatus']),
    sp500smiData: state.getIn(['usDashboard', 'sp500smiData']),
  }
};

// redux 数据修改逻辑映射 store.dispatch, props
const mapDispatch = (dispatch) => ({
  // load data
  getAllETF(){
    dispatch(getAllETF())
  },
  getBenchmarkDis(){
    dispatch(getBenchmark())
  },
  getsp500smiDis(){
    dispatch(getsp500smi())
  }
})

export default connect(mapState, mapDispatch)(Dashboard)