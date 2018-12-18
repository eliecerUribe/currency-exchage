const { currencyService } = require('../../services/');

const getCurrencyAmount = async (req, res) => {
  try {
    const currencyAmount = await currencyService.getCurrency.findCurrency(req.params.id);
    return res.status(200).json({ data: currencyAmount, success: true });
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
};

module.exports = {
  getCurrencyAmount,
};
