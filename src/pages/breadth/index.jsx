import React, {PureComponent, Suspense} from 'react';
import {connect} from 'umi';
import {GridContent} from '@ant-design/pro-layout';
// import {CHART_CODE_LIST} from "@/pages/constants";

import PageLoading from './components/PageLoading';

const BreadthTop = React.lazy(() => import('./components/BreadthTop'));
const BreadthTrend = React.lazy(() => import('./components/BreadthTrend'));
const BreadthHeatMap = React.lazy(() => import('./components/BreadthHeatMap'));

class Breadth extends PureComponent {

  reqRef = 0;

  timeoutId = 0;

  componentDidMount() {
    const {dispatch} = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'breadth/fetch',
      });
    });
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'breadth/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  render() {
    const {
      heatMapDataLeft,
      heatMapDataRight,
      loading,
      breadthDateRange,
      lineDataList,
      lastAllBreadh,
    } = this.props;
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
          <Suspense fallback={<PageLoading/>}>
            <BreadthTop {...this.props} />
          </Suspense>
          <Suspense fallback={<PageLoading/>}>
            <BreadthTrend lastAllBreadh={lastAllBreadh} date={breadthDateRange} data={lineDataList}/>
          </Suspense>
          <Suspense fallback={<PageLoading/>}>
            {
              loading
                ? <PageLoading/>
                : <BreadthHeatMap
                  heatMapDataLeft={heatMapDataLeft}
                  heatMapDataRight={heatMapDataRight}
                />
            }
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
  }
}


// export default connect(
//({ breadthData, loading }) => ({
//   breadthData,
//   loading: loading.effects['breadth/fetch'],
// })
//)(Breadth);

export default connect(mapStateToProps)(Breadth);
