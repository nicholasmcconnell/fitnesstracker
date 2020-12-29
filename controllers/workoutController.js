const db = require('../models');

console.log('in workout controller')
module.exports = {
updateOne: function(req, res){
     app.put("/api/workouts/:id", ({ body, params }, res) => {
        db.Workout
        .updateOne(
            { _id: params.id },
            { $push: { exercises: body } }
        )
            .then(workout => {
                res.json(workout);
            })
            .catch(err => {
                res.json(err);
            });
    });
},

    findAll: function(req, res) {
            db.Workout
            .find({})
                .then(dbWorkout => {
                    res.json(dbWorkout);
                })
                .catch(err => {
                    res.json(err);
                });
    }
}

