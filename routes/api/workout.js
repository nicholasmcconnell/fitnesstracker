const router = require('express').Router();
const workoutController = require('../../controllers/workoutController');

router.route('/')
    .get(workoutController.findAllWorkouts)
    .post(workoutController.createWorkout)
    .delete(workoutController.deleteCollection)
router.route('/:id')
    .put(workoutController.updateOneWorkout)
router.route('/range')
    .get(workoutController.findRange)
router.route('/seed')
    .post(workoutController.insertCollection)
router.route('/all')
    .get(workoutController.findAllWorkouts)

module.exports = router;