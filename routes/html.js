// const router = require('express').Router();
// const path = require("path");
// // require('../../public/index')
// 
console.log('in html routes html.js')



//     router.get("/stats", (req, res) => {
//         res.sendFile(path.join(__dirname, "../public/stats.html"))
//     });
    
//     router.get("/", (req, res) => {
//         console.log('route hitsdfadsfd')
//         res.sendFile(path.join(__dirname, "../"));
//     });
    
//     router.get("/exercise", (req, res) => {
//         console.log('res', res);
//         res.sendFile(path.join(__dirname, "../../public/exercise.html"));
//     });

// module.exports = router;


const path = require("path");
// const router = require("express").Router();


module.exports = function(router) {

    router.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/views/stats.html"))
    });
    
    router.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/views/index.html"));
    });
    
    router.get("/exercise", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/views/exercise.html"));
    });

}

// module.exports = router;