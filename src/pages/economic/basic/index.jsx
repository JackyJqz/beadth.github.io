import React, {PureComponent, Suspense} from 'react';
import {connect} from 'umi';
import {GridContent} from '@ant-design/pro-layout';
import PageLoading from "@/pages/breadth/components/PageLoading";

const WeiChart = React.lazy(() => import('../components/WeiChart'));
const JoblessClaims = React.lazy(() => import('../components/JoblessClaims'));
const MarketSomaHold = React.lazy(() => import('../components/MarketSomaHold'));


class Economic extends PureComponent {

  reqRef = 0;
  timeoutId = 0;

  componentDidMount() {
    const {dispatch} = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'economic/init',
      });
    });
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'economic/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  render() {
    const {
      // weiData,
      loadingWei,
      loadingjoblessClaims,
      loadingmshd,
      loadingocgr,
      loadingold,
      loadingtrr,
      loadingcpi,
      loadingffr,
    } = this.props

    return (
      <GridContent>
        <React.Fragment>
          <Suspense fallback={<PageLoading/>}>
            {
              loadingWei
                ? <PageLoading/>
                : <WeiChart loading={loadingWei}/>
            }
          </Suspense>
          <Suspense fallback={<PageLoading/>}>
            {
              loadingjoblessClaims
                ? <PageLoading/>
                : <JoblessClaims loading={loadingjoblessClaims}/>
            }
          </Suspense>
          <Suspense fallback={<PageLoading/>}>
            {
              loadingmshd
                ? <PageLoading/>
                : <MarketSomaHold loading={loadingmshd}/>
            }
          </Suspense>
        </React.Fragment>
      </GridContent>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loadingWei: state.loading.effects['economic/wei'],
    loadingmshd: state.loading.effects['economic/marketSomaHold'],
    loadingjoblessClaims: state.loading.effects['economic/joblessClaims'],
  }
}


export default connect(mapStateToProps)(Economic);

