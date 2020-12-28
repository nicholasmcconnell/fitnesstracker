const router = require('express').Router();
const workoutRoutes = require('./workout');

router.use('/workouts', workoutRoutes);

module.exports = router;
