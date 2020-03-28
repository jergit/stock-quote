import stockQuoteService from './StockQuote';

// Ticker,Quantity,Current Price,High,Low,Current Value
// AAPL,5,$315.11,$323.33,$142.00,$1,575.53;

let testStocks =
  [
    { 'ticker': "AAPL",'price':10.50123123,'high':20.00,'low':5.00 },
    { 'ticker': "TSLA",'price': 100,'high':200,'low':50 }
  ]

const orders = 
  [
    {'ticker': 'AAPL', 'shares':100},
    {'ticker': 'TSLA', 'shares':100}
  ]
  
let expectedStock =
  [
    {'Ticker':'AAPL','Quantity':'100','Current Price':'$10.50','High':'$20.00','Low':'$5.00','Current Value':'$1,050.12'},
    {'Ticker':'TSLA','Quantity':'100','Current Price':'$100.00','High':'$200.00','Low':'$50.00','Current Value':'$10,000.00'},
    {'Current Price': '', 'Current Value': '$11,050.12', 'High': '', 'Low': '', 'Quantity': '', 'Ticker': 'TOTAL'}
  ]

describe('can produce proper data structures', () => {
  it('calculates two orders and produces a total', () => {
    let actualValues = stockQuoteService.createStockArray(testStocks,orders)
    expect(actualValues).toEqual(expectedStock)
  })
});

describe('format dollar', () => {
  it('can format decimals and round up properly', () => {
    let actualValue = stockQuoteService.formatDollar(123.45600000)
    expect(actualValue).toEqual('$123.46')
  }),
  it('can format decimals and round properly', () => {
    let actualValue = stockQuoteService.formatDollar(123.45400000)
    expect(actualValue).toEqual('$123.45')
  }),
  it('can format decimals and format commas properly', () => {
    let actualValue = stockQuoteService.formatDollar(123456.1199999900)
    expect(actualValue).toEqual('$123,456.12')
  }),
  it('can format decimals and format more commas properly', () => {
    let actualValue = stockQuoteService.formatDollar(123456789.0199999900)
    expect(actualValue).toEqual('$123,456,789.02')
  })
});

