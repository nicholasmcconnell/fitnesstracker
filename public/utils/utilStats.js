
const utilStats = {
  generatePalette: function (chartArraysHash) {
    let cardioArrLength = chartArraysHash.Cardio.names.length;
    let resistanceArrLength = chartArraysHash.Resistance.names.length;
    let colorObj = {
      'Cardio': [],
      'Resistance': []
    };

    let getRandomRgb = () => {
      var num = Math.round(0xffffff * Math.random());
      var r = num >> 16;
      var g = num >> 8 & 255;
      var b = num & 255;
      return 'rgb(' + r + ', ' + g + ', ' + b + ', 0.5)';
    }

    for (let [k, v] of Object.entries(chartArraysHash)) {
      for (let [key, value] of Object.entries(v)) {
        for (let i = 0; i < value.length; i++) {
          let randomColor = getRandomRgb();
          colorObj[k].push(randomColor);
        }
        break;
      }
    }
    return colorObj;
  },

  durations: function (data) {

    let exercises = data.exercises;
    let nameDurationHash = {};

    let arrHash = {
      'Cardio': {
        'names': [],
        'durations': []
      },
      'Resistance': {
        'names': [],
        'durations': []
      }
    };

    if (data.weekOf !== utilFunctions.formatDate()[0]) {
      return arrHash;
    }

    for (let [key, value] of Object.entries(exercises)) {
      let durationHashConditional = () => {
        if (!nameDurationHash[value.type]) {
          nameDurationHash[value.type] = {};
        }
        if (!nameDurationHash[value.type][value.name]) {
          nameDurationHash[value.type][value.name] = value.duration;
        } else {
          nameDurationHash[value.type][value.name] += value.duration;
        }
      }

      switch (value.type) {
        case 'Cardio':
          durationHashConditional()
          break;
        case 'Resistance':
          durationHashConditional();
          break;
        default:
          break;
      }
    }

    for (let [k, v] of Object.entries(nameDurationHash)) {
      for (let [key, value] of Object.entries(v)) {
        arrHash[k]['names'].push(key);
        arrHash[k]['durations'].push(value);
      }

    }

    return arrHash;
  },

  distancePerDay: function (data) {
    let totalsArr = new Array(7).fill(0);
    let dateArr = utilFunctions.formatDate()
    let distance = {}
    let weekOfExercises = data.exercises;

    for (const [key, value] of Object.entries(weekOfExercises)) {
      if (value.type === 'Cardio') {
        !distance[value.dayOf] ? distance[value.dayOf] = value.distance : distance[value.dayOf] += value.distance;
      }
    }

    for (const [key, value] of Object.entries(distance)) {
      let index = dateArr.indexOf(key);
      totalsArr[index] = value;
    }
    return (totalsArr);
  },

  weightPerDay: function (data) {
    ///////DOES NOT ACCOUNT FOR REPS AND SETS IN TOTAL.  JUST THE WEIGHT USED DURING THE EXERCISE
    let totalsArr = new Array(7).fill(0);
    let dateArr = utilFunctions.formatDate();
    let weight = {};
    let weekOfExercises = data.exercises;

    for (const [key, value] of Object.entries(weekOfExercises)) {
      if (value.type === 'Resistance') {
        !weight[value.dayOf] ? weight[value.dayOf] = value.weight : weight[value.dayOf] += value.weight;
      }
    }

    for (const [key, value] of Object.entries(weight)) {
      let index = dateArr.indexOf(key);
      totalsArr[index] = value;
    }

    return totalsArr;
  },

  seedFunction: async function () {
    API.deleteCollection()
      .then(res => console.log(`${res} documents removed.`))
      .catch(err => console.log(err))

    let numOfWeeks = 3;
    let weeksObj = utilFunctions.weeksPast(numOfWeeks);
    console.log(utilStats.seedObj)

    let data = [{
      date: '0/0/0',
      weekOf: '1/10/2021',
      exercises: [
        {
          dayOf: '1/10/2021',
          type: "Resistance",
          name: "Push Press",
          duration: 25,
          weight: 185,
          reps: 8,
          sets: 4
        },
        {
          dayOf: '1/11/2021',
          type: "Cardio",
          name: "Running",
          duration: 25,
          distance: 4
        },
      ]
    }];

    API.insertCollection(data)
      .then(res => console.log(`${res} documents removed.`))
      .catch(err => console.log(err))

    for (const [key, value] of Object.entries(weeksObj)) {
      console.log(key, value)
      let apiSend = {
        date: Date,
        weekOf: value[0],
        exercises: [],
      }
    }
  },

  seedObj: [
    {
      date: { type: Date, default: () => new Date() },
      weekOf: {
        // type: String, '45',
      },
      exercises: [
        {
          type: "resistance",
          name: "Push Press",
          duration: 25,
          weight: 185,
          reps: 8,
          sets: 4
        },
        {
          type: "cardio",
          name: "Running",
          duration: 25,
          distance: 4
        },
      ]
    },
    {
      day: new Date().setDate(new Date().getDate() - 9),
      exercises: [
        {
          type: "resistance",
          name: "Lateral Pull",
          duration: 20,
          weight: 300,
          reps: 10,
          sets: 4
        },
        {
          type: "cardio",
          name: "Running",
          duration: 25,
          distance: 4
        }
      ]
    },
    {
      day: new Date().setDate(new Date().getDate() - 8),
      exercises: [
        {
          type: "resistance",
          name: "Push Press",
          duration: 25,
          weight: 185,
          reps: 8,
          sets: 4
        },
        {
          type: "cardio",
          name: "Running",
          duration: 25,
          distance: 4
        },
      ]
    },
    {
      day: new Date().setDate(new Date().getDate() - 6),
      exercises: [
        {
          type: "resistance",
          name: "Bench Press",
          duration: 20,
          weight: 285,
          reps: 10,
          sets: 4
        },
        {
          type: "cardio",
          name: "Running",
          duration: 25,
          distance: 4
        },
        {
          type: "resistance",
          name: "Bicep Curl",
          duration: 20,
          weight: 100,
          reps: 10,
          sets: 4
        },
        {
          type: "resistance",
          name: "tricep Curl",
          duration: 20,
          weight: 5000,
          reps: 10,
          sets: 60
        },
      ]
    },
    {
      day: new Date().setDate(new Date().getDate() - 5),
      exercises: [
        {
          type: "resistance",
          name: "Bench Press",
          duration: 20,
          weight: 300,
          reps: 10,
          sets: 4
        },
        {
          type: "resistance",
          name: "Quad Press",
          duration: 30,
          weight: 300,
          reps: 10,
          sets: 4
        }
      ]
    },
    {
      day: new Date().setDate(new Date().getDate() - 4),
      exercises: [
        {
          type: "resistance",
          name: "Quad Press",
          duration: 30,
          weight: 300,
          reps: 10,
          sets: 4
        },
        {
          type: "resistance",
          name: "Military Press",
          duration: 20,
          weight: 300,
          reps: 10,
          sets: 4
        },
      ]
    },
    {
      day: new Date().setDate(new Date().getDate() - 3),
      exercises: [
        {
          type: "resistance",
          name: "Bench Press",
          duration: 20,
          weight: 300,
          reps: 10,
          sets: 4
        },
        {
          type: "resistance",
          name: "Quad Press",
          duration: 30,
          weight: 300,
          reps: 10,
          sets: 4
        },
        {
          type: "resistance",
          name: "Military Press",
          duration: 20,
          weight: 300,
          reps: 10,
          sets: 4
        },
      ]
    },
  ]

  // workoutNames: function (data) {
  //   let workouts = [];

  //   d
  // ata.forEach(workout => {
  //     workout.exercises.forEach(exercise => {
  //       workouts.push(exercise.name);
  //     });
  //   });
  //   return workouts;
  // }

};