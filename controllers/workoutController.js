const db = require('../models');

console.log('in workout controller')
module.exports = {
    updateOne: function (req, res) {
        console.log('s', req.params)
        // app.put("/api/workouts/:id", ({ body, params }, res) => {
            db.Workout
                .updateOne(
                    { _id: req.params.id },
                    { $push: { exercises: req.body } }
                )
                .then(workout => {
                    console.log('workout', res.json(workout))
                    res.json(workout);
                })
                .catch(err => {
                    res.json(err);
                });
        // });
    },

    findAll: function (req, res) {
        db.Workout
            .find({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    },

    create: function(req, res){
        // app.post("/api/workouts", (req, res) => {
        db.Workout.create({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    // });
    },

    find: function(req, res){
        // app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    // })
    }
}

