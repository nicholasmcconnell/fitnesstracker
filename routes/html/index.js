const router = require('express').Router();
const htmlRoutes = require('./html');

router.use('/html', htmlRoutes);

module.exports = router;