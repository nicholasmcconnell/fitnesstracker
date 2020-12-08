const workout = require("../models/Workout");

module.exports = function (app) {

    app.put("/api/workouts/:id", ({ body, params }, res) => {
        workout.updateOne(
            // params.id,
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

    app.get("/api/workouts", (req, res) => {
        workout.find({})
            .then(dbWorkout => {
                // console.log("workout " + dbWorkout);
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.post("/api/workouts", (req, res) => {
        workout.create({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.get("/api/workouts/range", (req, res) => {
        workout.find({})
            .then(dbWorkout => {
                console.log("workout " + dbWorkout);
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    })
}