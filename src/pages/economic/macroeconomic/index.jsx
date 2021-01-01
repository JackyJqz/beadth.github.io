import React, {PureComponent, Suspense} from 'react';
import {connect} from 'umi';
import {GridContent} from '@ant-design/pro-layout';
import PageLoading from "@/pages/breadth/components/PageLoading";

const GoldHold = React.lazy(() => import('../components/GoldHold'));
const OliCopperGoldRatio = React.lazy(() => import('../components/OliCopperGoldRatio'));
const TreasuryRealRates = React.lazy(() => import('../components/TreasuryRealRates'));
const CPI = React.lazy(() => import('../components/CPI'));
const FederalFundsRate = React.lazy(() => import('../components/FederalFundsRate'));


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
              loadingold
                ? <PageLoading/>
                : <GoldHold loading={loadingold}/>
            }
          </Suspense>
          <Suspense fallback={<PageLoading/>}>
            {
              loadingocgr
                ? <PageLoading/>
                : <OliCopperGoldRatio loading={loadingocgr}/>
            }
          </Suspense>
          <Suspense fallback={<PageLoading/>}>
            {
              loadingtrr
                ? <PageLoading/>
                : <TreasuryRealRates loading={loadingtrr}/>
            }
          </Suspense>
          <Suspense fallback={<PageLoading/>}>
            {
              loadingcpi
                ? <PageLoading/>
                : <CPI loading={loadingcpi}/>
            }
          </Suspense>
          <Suspense fallback={<PageLoading/>}>
            {
              loadingffr
                ? <PageLoading/>
                : <FederalFundsRate loading={loadingffr}/>
            }
          </Suspense>
        </React.Fragment>
      </GridContent>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loadingold: state.loading.effects['economic/goldstock'],
    loadingocgr: state.loading.effects['economic/ocgr'],
    loadingtrr: state.loading.effects['economic/trr'],
    loadingcpi: state.loading.effects['economic/cpi'],
    loadingffr: state.loading.effects['economic/ffr'],
  }
}


export default connect(mapStateToProps)(Economic);

