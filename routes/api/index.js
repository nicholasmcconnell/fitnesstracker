const router = require('express').Router();
const workoutRoutes = require('./workout');
console.log('in api folder index.js')

router.use('/workouts', workoutRoutes);

module.exports = router;
