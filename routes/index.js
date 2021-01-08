const path = require('path');
const router = require("express").Router();
const apiRoutes = require('./api');
const htmlRoutes = require('./html');

//API Routes
router.use('/api', apiRoutes);

//HTML Routes
// router.use('/html', htmlRoutes);

router.use(function(req, res){
    res.sendFile(path.join(__dirname, '../public/views/index.html'))
})

module.exports = router;