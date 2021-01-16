const path = require("path");

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