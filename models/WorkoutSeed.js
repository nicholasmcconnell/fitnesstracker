const mongoose = require('mongoose');

const d = new Date();
const Schema = mongoose.Schema;

const workoutSeedSchema = new Schema({
    date: {
        type: String
        // type: Date, default: () => new Date()
    },
    weekOf: {
        type: String
    },
    exercises: [{
        dayOf: {
            type: String,
            default: `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
        },
        type: {
            type: String,
        },
        name: {
            type: String,
            trim: true,
            required: "Enter excercise name:"
        },
        duration: {
            type: Number,
            trim: true,
            required: "Enter excercise duration:",
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            }
        },
        weight: {
            type: Number,
            trim: true,
            required: "Enter weight amount:",
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            }
        },
        reps: {
            type: Number,
            trim: true,
            required: "Enter number of reps:",
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            }
        },
        sets: {
            type: Number,
            trim: true,
            required: "Enter number of sets:",
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            }
        },
        distance: {
            type: Number,
            trim: true,
            required: "Enter number of reps:",
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            }
        }

    }]
});

const WorkoutSeed = mongoose.model('WorkoutSeed', workoutSeedSchema);
module.exports = WorkoutSeed;