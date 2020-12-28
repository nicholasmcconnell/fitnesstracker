const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');
const htmlRoutes = require('./html');

console.log('in index.js of routes')

//API Routes
router.use('/api', apiRoutes);

//HTML Routes
// router.use('/html', htmlRoutes);

// router.use(function(req, res){
//     res.sendFile(path.join(__dirname, '../public/index.html'))
// })

module.exports = router;