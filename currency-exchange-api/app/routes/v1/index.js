const express = require('express');
// const passport = require('passport');

const router = express.Router();

const currencyRoutes = require('./currency');
// const { validPayload } = require('../../middlewares');

// router.use('/auth', validPayload, authRoutes);
router.use('/currency', currencyRoutes);

module.exports = router;
