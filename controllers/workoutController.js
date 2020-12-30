const db = require('../models');

console.log('in workout controller')
module.exports = {
    findAllWorkouts: function (req, res) {
        db.Workout
            .find({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    },
    updateOneWorkout: function (req, res) {
        db.Workout
            .updateOne(
                { _id: req.params.id },
                { $push: { exercises: req.body } }
            )
            .then(workout => {
                res.json(workout);
            })
            .catch(err => {
                res.json(err);
            });
    },
    createWorkout: function (req, res) {
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

    findRange: function (req, res) {
        console.log('constorller range')
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

