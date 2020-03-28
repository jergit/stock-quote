import axios from 'axios';
import ObjectsToCsv from 'objects-to-csv';


const createCsvFromArray = async (dataArray) => {
  const csv = new ObjectsToCsv(dataArray)
  await csv.toDisk('./StockQuote.csv')
}

const formatDollar = (input) => {
  let output = null;
  output = '$' + input.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return output;
}

const formatNumeric = (input) => {
  let output = null;
  output = input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return output;
}

const createStockArray = (stocks,orders) => {
  let orderList = []
  let total = 0;
  orders.map((order) => {
    let stockForOrder = stocks.find((stock) => stock.ticker == order.ticker)
    total = total + (stockForOrder.price * order.shares)
    let currentStock = 
    {
      'Ticker':stockForOrder.ticker,
      'Quantity':formatNumeric(order.shares),
      'Current Price': formatDollar(stockForOrder.price),
      'High':formatDollar(stockForOrder.high),
      'Low':formatDollar(stockForOrder.low),
      'Current Value':formatDollar(stockForOrder.price * order.shares),
    }
    orderList.push(currentStock)
  })
  orderList.push(
    {
      'Ticker':'TOTAL',
      'Quantity':'',
      'Current Price': '',
      'High':'',
      'Low':'',
      'Current Value':formatDollar(total),
    }
  )
  return orderList 
}

const getStocks = (stocksURL) => {
  try {
    return axios.get(stocksURL)    
  } catch (error) {
    console.error('Error in StockQuote getStocks: ', error)
  }
}

const assembleStocks = async (stocksURL) => {
  let stockResponse = [];
  try{
    const stocks = await getStocks(stocksURL)
    if(stocks.data) {
      stocks.data.forEach(stock => {
        stockResponse.push(
          {
            'ticker': stock.symbol,
            'price': stock.price,
            'high': stock.yearHigh,
            'low': stock.yearLow     
          }
        )
      })
      console.log('stockresponse',stockResponse)
      return stockResponse
    }
  }
  catch(error){
    console.error('Error in StockQuote assembleStocks: ', error)
  }
}
export default {
  createStockArray,
  createCsvFromArray,
  assembleStocks,
  formatDollar
};


