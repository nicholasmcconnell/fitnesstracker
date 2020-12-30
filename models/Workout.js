let mongoose = require("mongoose");
let utilFunctions = require('../public/utils/utilFunctions')
// import utilFunctions from ('../public/utils/utilFunctions')

// let db = require("../models");
// mongoose.connect("mongodb://localhost/workout", {
//   useNewUrlParser: true,
//   useFindAndModify: false
// });

const d = new Date();
const Schema = mongoose.Schema;
const workoutSchema = new Schema({
      date: {type: Date, default: () => new Date()},
      weekOf: {
        type: String, default: utilFunctions.formatDate()[0]
      },
      day: {
        type: String,
        // default: `12/29/2020`

        default: `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
      },
      exercises: [{
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
            validate : {
              validator : Number.isInteger,
              message   : '{VALUE} is not an integer value'
            }
          },
          weight: {
            type: Number,
            trim: true,
            required: "Enter weight amount:",
            validate : {
              validator : Number.isInteger,
              message   : '{VALUE} is not an integer value'
            }
          },
          reps: {
            type: Number,
            trim: true,
            required: "Enter number of reps:",
            validate : {
              validator : Number.isInteger,
              message   : '{VALUE} is not an integer value'
            }
          },
          sets: {
            type: Number,
            trim: true,
            required: "Enter number of sets:",
            validate : {
              validator : Number.isInteger,
              message   : '{VALUE} is not an integer value'
            }
          },
          distance: {
            type: Number,
            trim: true,
            required: "Enter number of reps:",
            validate : {
              validator : Number.isInteger,
              message   : '{VALUE} is not an integer value'
            }
          }
        }]
  });
  const Workout = mongoose.model("Workout", workoutSchema);
  module.exports = Workout;