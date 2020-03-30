
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const db = require("./models/models.js");

const PORT = process.env.PORT || 3000;

// const User = require("./userModel.js");/////////////////////
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
//   useNewUrlParser: true,
//   useFindAndModify: false //may be needed for an indexDB option.   revisit this later.
// },
// ).then(() => {console.log('Connection to database established.')})
//     .catch(  err => {console.log(err)});

// app.get("/", (req, res) => {

//   res.sendFile(path.join(__dirname, "./public/index.html"));
 
// });

app.get("/api/workouts", (req, res) => {
  db.find({})
  .then(dbWorkout => {
    // console.log("workout " + dbWorkout);
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});


// updates workout by id
app.put("/api/workouts/:id", ({ body, params }, res) => {
  db.updateOne(
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

// app.put("/api/workouts/:id", ({ body, params }, res) => {
//   db.findByIdAndUpdate(
//     params.id,
//     { $push: { exercises: body } },
//     { new: true, runValidators: true }
//   )
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });



// app.get("/exercise", (req, res) => {

//   res.sendFile(path.join(__dirname + "./exercise.html"));
 
// });

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"))
})

// Creates a new workout
// app.post("/api/workouts/", ({ body }, res) => {
//   const workout = new db (body);

//   db.create(workout)
//     .then(dbWorkout => {
//       console.log(dbWorkout);
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// })

app.post("/api/workouts", (req, res) => {
  db.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// put request and post put for adding exercise.

// Stats

app.get("/stats", (req, res) => {
  
  res.sendFile(path.join(__dirname, "./public/stats.html"))
});

// No idea why this works
app.get("/api/workouts/range", (req, res) => {
  db.find({})
  .then(dbWorkout => {
    console.log("workout " + dbWorkout);
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
})

// const db = require("./models");

// require("./routes/api")(app);
// require("./routes/html")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});