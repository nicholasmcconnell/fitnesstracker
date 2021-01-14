// const workout = require("../../models/Workout");
// const { find } = require('../../models/Workout');

const router = require('express').Router();
const workoutController = require('../../controllers/workoutController');

router.route('/')
    .get(workoutController.findAllWorkouts)
    .post(workoutController.createWorkout)
router.route('/:id')
    .put(workoutController.updateOneWorkout)
router.route('/range')
    .get(workoutController.findRange)
router.route('/delete')
    .delete(workoutController.deleteCollection)

// router.route('/seed')
//     .post(workoutController.createWorkoutSeed)
// router.route('/seed/:id')
//     .put(workoutController.updateOneWorkout)

console.log('in workout.js')

module.exports = router;





// module.exports = function (app) {

    // app.put("/api/workouts/:id", ({ body, params }, res) => {
    //     workout.updateOne(
    //         // params.id,
    //         { _id: params.id },
    //         { $push: { exercises: body } }
    //     )
    //         .then(workout => {
    //             res.json(workout);
    //         })
    //         .catch(err => {
    //             res.json('err', err);
    //         });
    // });

    // app.get("/", (req, res) => {
    //     console.log('inworkout.js hi')
    //     workout.find({})
    //         .then(dbWorkout => {
    //             console.log("workout " + dbWorkout);
    //             res.json(dbWorkout);
    //         })
    //         .catch(err => {
    //             res.json(err);
    //         });
    // });

    // app.post("/api/workouts", (req, res) => {
    //     workout.create({})
    //         .then(dbWorkout => {
    //             res.json(dbWorkout);
    //         })
    //         .catch(err => {
    //             res.json(err);
    //         });
    // });

    // app.get("/api/workouts/range", (req, res) => {
    //     workout.find({})
    //         .then(dbWorkout => {
    //             console.log("workout " + dbWorkout);
    //             res.json(dbWorkout);
    //         })
    //         .catch(err => {
    //             res.json(err);
    //         });
    // })
// }