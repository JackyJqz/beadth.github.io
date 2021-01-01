import React, {PureComponent, Suspense} from 'react';
import {connect} from 'umi';
import {GridContent} from '@ant-design/pro-layout';
import PageLoading from './components/PageLoading'

const RelStockBm = React.lazy(() => import('./components/RelStockBm'));
const BoardLeft = React.lazy(() => import('./components/BoardLeft'));


class Dashboard extends PureComponent {

  reqRef = 0;

  timeoutId = 0;

  componentDidMount() {
    const {dispatch} = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'dashboard/init',
      });
    });
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'dashboard/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  render() {
    const {rdv, rds, loadingLeft, etfLoading} = this.props;

    return (
      <GridContent>
        {/*<Suspense fallback={<PageLoading />}>*/}
        {/*  {*/}
        {/*    loadingLeft*/}
        {/*      ?<PageLoading/>*/}
        {/*      :<BoardLeft loading={loadingLeft}/>*/}
        {/*  }*/}
        {/*</Suspense>*/}


        <Suspense fallback={<PageLoading/>}>
          {/*<OfflineData*/}
          {/*  activeKey={activeKey}*/}
          {/*  loading={loading}*/}
          {/*  offlineData={offlineData}*/}
          {/*  offlineChartData={offlineChartData}*/}
          {/*  handleTabChange={this.handleTabChange}*/}
          {/*/>*/}
          {
            etfLoading
              ? <PageLoading/>
              : <RelStockBm loading={etfLoading}/>
          }
        </Suspense>
      </GridContent>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.dashboard,
    loadingLeft: state.loading.effects['dashboard/fetchLeft'],
    etfLoading: state.loading.effects['dashboard/etf'],
  }
}


export default connect(mapStateToProps)(Dashboard);
