const { Exchange, Currency } = require('../../../db');
// const logger = require('../../../config/logger');

const findCurrency = async (currencyId) => {
  try {
    const currencyExchange = await Currency.findById(currencyId).exec();
    return currencyExchange;
  } catch (e) {
    console.log(e);
    return e;
  }
};

module.exports = {
  findCurrency,
};
