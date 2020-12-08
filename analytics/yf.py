from datetime import date
from pprint import pprint as pt
import yfinance as yf
from dateutil.relativedelta import relativedelta
# from pandas_datareader import data as pdr
import pandas_datareader as pdr




yf.pdr_override()

def day_range():
    start = date.today() - relativedelta(days=150)
    end = date.today() + relativedelta(days=0)
    return start.isoformat(), end.isoformat()

if __name__ == '__main__':
    start, end = day_range()
    etd_data = pdr.get_data_yahoo("ITA", start=start, end=end)
    # print(etd_data)
    pt(etd_data.to_dict(orient='index'))
    #
    # actions = pdr.DataReader('QQQ', 'yahoo-actions', start, end)
    # pt(actions.head())
    #
    d = yf.Ticker("ITA")
    pt(d.splits)
    #
    #
    # d = yf.Ticker("QQQ")
    # pt(d.splits)
