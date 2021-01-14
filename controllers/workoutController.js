const db = require('../models');

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

    // updateOneWorkoutSeed: function (req, res) {
    //     console.log(req.body)
    //     db.WorkoutSeed
    //         .updateOne(
    //             { _id: req.params.id },
    //             { $push: { exercises: req.body } }
    //         )
    //         .then(workout => {
    //             res.json(workout);
    //         })
    //         .catch(err => {
    //             res.json(err);
    //         });
    // },

    createWorkout: function (req, res) {
        db.Workout.create({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
   },
    // createWorkoutSeed: function (req, res) {
    //     // app.post("/api/workouts", (req, res) => {
    //     console.log('in create seed', req.body)
    //     db.WorkoutSeed.create(req.body)
    //         .then(dbWorkout => {
    //             res.json(dbWorkout);
    //         })
    //         .catch(err => {
    //             res.json(err);
    //         });
    //     // });
    // },

    findRange: function (req, res) {
        db.Workout.find({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    },

    deleteCollection: function (req, res) {
        db.Workout.deleteMany({})
        .then(dbWorkout => {
           res.json(dbWorkout.deletedCount);
        })
        .catch(err => {
            console.log('err in controller', err);
        })
    }
}

