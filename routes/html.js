var path = require("path");

module.exports = function(router) {

    router.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/stats.html"))
    });
    
    router.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    
    router.get("/exercise", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });

}
