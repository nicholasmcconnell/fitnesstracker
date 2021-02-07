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

    createWorkout: function (req, res) {
        db.Workout.create({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    },

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
                console.log(err);
            })
    },

    insertCollection: function (req, res) {
        console.log('86 eq body', req.body)
        db.Workout.collection.insertMany(req.body, function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                console.log('Documents succesfully inserted!');
                res.json('Documents succesfully inserted!')
            }
        })
    }
}

