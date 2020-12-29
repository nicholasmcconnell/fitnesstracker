const router = require('express').Router();
const htmlRoutes = require('../html');

console.log('in html routes index.js')

router.use('/html', htmlRoutes);

module.exports = router;