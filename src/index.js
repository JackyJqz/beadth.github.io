import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl';

import { createIntl, createIntlCache } from 'react-intl'

import 'antd/dist/antd.css';

import Home from './us';
import store from './store';

const App = (
    <Provider store={store}>
        <Home/>
    </Provider>
)

const usersLocale = localStorage.getItem('locale') || 'zh';
const messages = {
    'zh': {
        'year': '年',
        'us_initial_jobless_claims': '初次申请失业金人数（千）',
        'us_continuious_jobless_claims': '持续申请失业金人数（千）',
        'fed_open_market_account_holdings': '美联储披露持仓 (十亿）',
        'click_to_copy': '点击复制',
        'us_employment_statistics': '美国失业金数据',
        'weekly_economic_index': '每周经济指数（WEI）',
        'economic_index': '经济指数',
        'gold_oil_ratio': '油金比',
        'copper_gold_ratio': '铜金比',
        'fed_interest_rate': '利率',
        'gold_oil_copper_interest_title': '油金比/铜金比/利率',
        'us_treasury_real_interest_rate': '美国国库实际利率',
        'ali_pay': '支付宝',
        'paypal': '贝宝',
        'bitcoin': '比特币',
        'bitcoin_address': 'BTC捐助地址',
        'area_buying': '狩猎区',
        'area_selling': '走货区',
        'breadth_trend': '宽度走势',
        'mkt_breadth': '市场宽度',
        'mkt_open': '开盘',
        'mkt_open_tooltip': '当日11个子行业开盘宽度之和',
        'menu.lei': '雷公专栏',
        'menu.community': '投资交流',
        'menu.join': '加入/合作',
        'menu.intl': 'English',
        'banner.last_update': '交易日市场数据每1-2小时更新一次 | 最后更新时间: {lastTime} 美国东部（美东）',
        'btn.refresh': '刷新',
        'support': '支持',
        'donate': '捐助',
        'tooltip.refresh': '每10分钟更新本地数据',
        'updated': '已更新',
        'cta_ad': '虚位以待',
        'econ_data': '经济数据',
        'mkt_overall': '市场全景',
        'wechat': '微信'
      },
    'en': {
        'year': 'YR',
        'click_to_copy': 'Click to copy',
        'us_employment_statistics': 'U.S. Employment Statistics',
        'us_initial_jobless_claims': 'U.S. Initial Jobless Claims in thousands',
        'us_continuing_jobless_claims': 'Continuing Jobless Claims in thousands',
        'fed_open_market_account_holdings': 'Federal Open Market Account Holdings',
        'weekly_economic_index': 'Weekly Economic Index（WEI）',
        'economic_index': 'Economic index',
        'gold_oil_ratio': 'Gold-Oil Ratio',
        'copper_gold_ratio': 'Copper-Gold Ratio',
        'fed_interest_rate': 'Fed Interest Rate',
        'gold_oil_copper_interest_title': 'Gold-Oil Ratio/Copper-Gold Ratio/Fed Interest Rate',
        'us_treasury_real_interest_rate': 'U.S. Treasury Real Interest Rate',
        'ali_pay': 'Ali Pay',
        'paypal': 'PayPal',
        'bitcoin': 'Bitcoin',
        'bitcoin_address': 'BTC Donation Address',
        'area_buying': 'Buying Area',
        'area_selling': 'Selling Area',
        'breadth_trend': 'Breadth Trend',
        'mkt_breadth': 'Market Breadth',
        'mkt_open': 'Open',
        'mkt_open_tooltip': "Today's market breadth of 11 S&P sectors",
        'menu.lei': 'LEI & LoneCapital',
        'menu.community': 'Community',
        'menu.join': 'Join Us',
        'menu.intl': '中文',
        'banner.last_update': 'Update every 1-2 hours on trading days | Latest price quotes as of {lastTime} Eastern Time (ET)',
        'btn.refresh': 'Refresh',
        'support': 'Support',
        'donate': 'Donate',
        'tooltip.refresh': 'Update local data every 10 mins',
        'updated': 'Updated',
        'cta_ad': 'Your ad here',
        'econ_data': 'Economic Data',
        'mkt_overall': 'Market Dashboard',
        'wechat': 'WeChat'
      }
  };

// Translated messages in Chinese with matching IDs to what you declared
const messagesInChinese = {
    myMessage: localStorage.getItem('locale'),
  }
  
  // This is optional but highly recommended
  // since it prevents memory leak
  const cache = createIntlCache()
  
  // Create the `intl` object
  const intl = createIntl(
    {
      // Locale of the application
      locale: 'en',
      // Locale of the fallback defaultMessage
      defaultLocale: 'en',
      messages: messagesInChinese,
    },
    cache
  )
  
  console.log(
    intl.formatMessage(
      {
        // Matching ID as above
        id: 'myMessage',
        // Default Message in Chinese
        defaultMessage: 'Today is {ts, date, ::yyyyMMdd}',
      },
      {ts: Date.now()}
    )
  )
  

ReactDOM.render(
  <IntlProvider locale={ usersLocale } messages={ messages[usersLocale] }>
    { App }
  </IntlProvider>,
  document.getElementById('breadth')
);
