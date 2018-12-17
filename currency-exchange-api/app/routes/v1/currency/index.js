const express = require('express');

const { currencyController } = require('../../../controllers');

const router = express.Router();

router.get('/:id', currencyController.getCurrencyAmount);

module.exports = router;
