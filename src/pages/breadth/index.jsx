import React, {PureComponent, Suspense} from 'react';
import { connect } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
// import {CHART_CODE_LIST} from "@/pages/constants";

import PageLoading from './components/PageLoading';

const BreadthRow = React.lazy(() => import('./components/BreadthRow'));

class Breadth extends PureComponent{

  reqRef = 0;

  timeoutId = 0;

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'breadth/fetch',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'breadth/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  render() {
    const {breadthData, loading} = this.props;
    console.log('breadthData: ', breadthData, loading)
    // const {
    //   dataList,
    //   totalLList,
    //   dayList,
    //   codeList,
    //   mv20CodeList,
    //   mv20DataList,
    //   chartList,
    //   breadthDays,
    //   isGetData,
    //   lastBreadth,
    //   lastTime,
    //   breadthDateRange,
    // } = breadthData;
    return (
      <GridContent>
      <React.Fragment>
        <Suspense fallback={<PageLoading />}>
          <BreadthRow {...this.props} />
        </Suspense>
      </React.Fragment>
      </GridContent>

    )
  }
}

const mapStateToProps = (state) => {
  return {
  ...state.breadth,
  loading: state.loading.effects['breadth/fetch'],
}}


// export default connect(
//({ breadthData, loading }) => ({
//   breadthData,
//   loading: loading.effects['breadth/fetch'],
// })
//)(Breadth);

export default connect(mapStateToProps)(Breadth);
