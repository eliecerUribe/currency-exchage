const express = require('express');
// const passport = require('passport');

const router = express.Router();

const authRoutes = require('./auth');
const currencyRoutes = require('./currency');
const { validPayload } = require('../../middlewares');

router.use('/auth', validPayload, authRoutes);
router.use('/currency', currencyRoutes);
// router.use('/currency', passport.authenticate('jwt', { session: false }), currencyRoutes);

module.exports = router;
