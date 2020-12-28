var path = require("path");

console.log('in html routes file thing duh')

module.exports = function(router) {

    router.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/stats.html"))
    });
    
    router.get("/", (req, res) => {
        console.log('route hitsdfadsfd')
        res.sendFile(path.join(__dirname, "../"));
    });
    
    router.get("/exercise", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });

}
