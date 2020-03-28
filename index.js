#! /usr/bin/env/node

import stockQuoteService from './StockQuote.js';

import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
  
const init = () => {
  console.log(
    chalk.green(
      figlet.textSync("Stock Quote", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default"
      })
    )
  );
};
  
const askQuestions = () => {
  const questions = [
    {
      name: "TICKER",
      type: "input",
      message: "Enter Ticker to add to watch list",
      default: function() {
        return 'AAPL,CAT,TSLA';
      }
    },
    {
      name: "QUANTITY",
      type: "input",
      message: "Enter Quantity:",
      default: function() {
        return '100';
      }
    }
  ];
  return inquirer.prompt(questions);
};

const success = () => {
  console.log(
    chalk.white.bgGreen.bold('Done! Stock quote created in current directory!')
  );
};
  
const watchList = 
  [
    {'ticker': "AAPL", 'shares':100},
    {'ticker': "CAT",  'shares':100},
    {'ticker': "TSLA", 'shares':100},
  ]

const run = async () => {
  init(); 
  const answers = await askQuestions();
  const { TICKER, QUANTITY } = answers;

  let inputTicker = (TICKER !== 'AAPL,CAT,TSLA') ? TICKER : ''
  watchList.push({'ticker': TICKER, 'shares':QUANTITY})
  let tickers = watchList.map((ticker) => ticker.ticker)
  
  const url = `https://financialmodelingprep.com/api/v3/quote/${tickers}`;
  const validStocks = await stockQuoteService.assembleStocks(url);

  let ordersForValidStocks = validStocks.map((stock) => watchList.find((wStock) => stock.ticker == wStock.ticker))
  const calculatedValues = await stockQuoteService.createStockArray(validStocks, ordersForValidStocks);
  stockQuoteService.createCsvFromArray(calculatedValues);
  success();
};

run();








