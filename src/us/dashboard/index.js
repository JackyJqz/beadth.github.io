import React, {Component} from 'react';
import {connect} from "react-redux";

import {
  getAllETF,
  getBenchmark
} from "./store/actionCreators";
import {Col, Row} from "antd";
import {Loading} from "../USUI";
import {ETFChart} from "./chart";


class Dashboard extends Component{

  render() {
    return (
      <React.Fragment>
        <Row justify="center" align="top">
          <Col xs={{span: 24}} sm={{span: 24}} md={{span: 20}} lg={{span: 18}} xl={{span: 18}} align="top">
            {
              this.props.allETFStatus
                ? <Loading/>
                : <ETFChart {...this.props}/>
                // : constants.US_ETF_ALL_LIST.map((etfs) => {
                //   return <ETFChart etfs={etfs} {...this.props}/>
                // })
                // : <ETFChart etfs={0} {...this.props}/>
            }
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
  }
})

export default connect(mapState, mapDispatch)(Dashboard)