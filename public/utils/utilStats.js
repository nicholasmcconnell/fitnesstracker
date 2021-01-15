
const utilStats = {
  getRandomRgb: () => {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgba(' + r + ', ' + g + ', ' + b + ', 0.5)';
  },
  generatePalette: function (chartArraysHash) {
    let cardioArrLength = chartArraysHash.Cardio.names.length;
    let resistanceArrLength = chartArraysHash.Resistance.names.length;
    let colorObj = {
      'Cardio': [],
      'Resistance': []
    };

    for (let [k, v] of Object.entries(chartArraysHash)) {
      for (let [key, value] of Object.entries(v)) {
        for (let i = 0; i < value.length; i++) {
          let randomColor = utilStats.getRandomRgb();
          colorObj[k].push(randomColor);
        }
        break;
      }
    }
    return colorObj;
  },
  barChartColors: () => {
    let barColorArr = [];
    for(let i = 0; i<=6; i++){
      barColorArr.push(utilStats.getRandomRgb())
    }
    console.log(barColorArr)
    return barColorArr;
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

    if (data.weekOf !== utilFunctions.datesArr()[0]) {
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
    console.log(data)
    let totalsArr = new Array(7).fill(0);
    let dateArr = utilFunctions.datesArr()
    let distance = {}
    let weekOfExercises = data.exercises;
    /////ADD DAY OF TO SEED!!!!!!!!!
    for (const [key, value] of Object.entries(weekOfExercises)) {
      console.log(value.dayof)
      if (value.type === 'Cardio') {
        !distance[value.dayOf] ? distance[value.dayOf] = value.distance : distance[value.dayOf] += value.distance;
        console.log(distance)
      }
    }
    // console.log(dateArr) date array needs to come from function that is at top of populate chart
    for (const [key, value] of Object.entries(distance)) {
      console.log(key)
      let index = dateArr.indexOf(key);
      console.log(index)
      totalsArr[index] = value;
    }
    console.log(totalsArr)
    return (totalsArr);
  },

  weightPerDay: function (data) {
    ///////DOES NOT ACCOUNT FOR REPS AND SETS IN TOTAL.  JUST THE WEIGHT USED DURING THE EXERCISE
    let totalsArr = new Array(7).fill(0);
    let dateArr = utilFunctions.datesArr();
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
    let weekZero = weeksObj[0];



    let data = [
      {
        ///WEEK THREE 
        date: { type: Date, default: () => new Date() },
        weekOf: weeksObj[0][0],
        exercises: [
          {
            dayOf: weeksObj[0][1],
            type: "Resistance",
            name: "Push Press",
            duration: 25,
            weight: 185,
            reps: 8,
            sets: 4
          },
          {
            dayOf: weeksObj[0][1],
            type: "Cardio",
            name: "Running",
            duration: 25,
            distance: 4
          },
          {
            dayOf: weeksObj[0][3],
            type: "Resistance",
            name: "Bench Press",
            duration: 20,
            weight: 300,
            reps: 10,
            sets: 4
          },
          {
            dayOf: weeksObj[0][3],
            type: "Resistance",
            name: "Quad Press",
            duration: 30,
            weight: 300,
            reps: 10,
            sets: 4
          },
          {
            dayOf: weeksObj[0][4],
            type: "Resistance",
            name: "Bench Press",
            duration: 20,
            weight: 300,
            reps: 10,
            sets: 4
          },
          {
            dayOf: weeksObj[0][4],
            type: "Resistance",
            name: "Quad Press",
            duration: 30,
            weight: 300,
            reps: 10,
            sets: 4
          },
          {
            dayOf: weeksObj[0][5],
            type: "Cardio",
            name: "Walk",
            duration: 60,
            distance: 5.2
          },
        ]
      },
      {
        ////////WEEK TWO/////////
        date: { type: Date, default: () => new Date() },
        weekOf: weeksObj[1][0],
        exercises: [
          {
            dayOf: weeksObj[1][1],
            type: "Resistance",
            name: "Lateral Pull",
            duration: 20,
            weight: 300,
            reps: 10,
            sets: 4
          },
          {
            dayOf: weeksObj[1][1],
            type: "Resistance",
            name: "Military Press",
            duration: 20,
            weight: 300,
            reps: 10,
            sets: 4
          },
          {
            dayOf: weeksObj[1][3],
            type: "Cardio",
            name: "Running",
            duration: 25,
            distance: 2.2
          },

          {
            dayOf: weeksObj[1][3],
            type: "Resistance",
            name: "Bicep Curl",
            duration: 20,
            weight: 100,
            reps: 10,
            sets: 4
          },
          {
            dayOf: weeksObj[1][5],
            type: "Resistance",
            name: "tricep Curl",
            duration: 20,
            weight: 50,
            reps: 10,
            sets: 60
          },
          {
            dayOf: weeksObj[1][6],
            type: "Cardio",
            name: "Jogging",
            duration: 30,
            distance: 3.7
          },
        ]
      },
      {
        ////////WEEK ONE/////////
        date: { type: Date, default: () => new Date() },
        weekOf: weeksObj[2][0],
        exercises: [
          {
            dayOf: weeksObj[2][1],
            type: "Resistance",
            name: "Push Press",
            duration: 25,
            weight: 185,
            reps: 8,
            sets: 4
          },
          {
            dayOf: weeksObj[2][1],
            type: "Cardio",
            name: "Running",
            duration: 60,
            distance: 4.3
          },
          {
            dayOf: weeksObj[2][3],
            type: "Resistance",
            name: "Bench Press",
            duration: 20,
            weight: 285,
            reps: 10,
            sets: 4
          },
          {
            dayOf: weeksObj[2][3],
            type: "Cardio",
            name: "Dog Run",
            duration: 25,
            distance: 2.5
          },
          {
            dayOf: weeksObj[2][4],
            type: "Resistance",
            name: "Quad Press",
            duration: 30,
            weight: 300,
            reps: 10,
            sets: 4
          },
          {
            dayOf: weeksObj[2][4],
            type: "Resistance",
            name: "Military Press",
            duration: 20,
            weight: 300,
            reps: 10,
            sets: 4
          },
          {
            dayOf: weeksObj[2][6],
            type: "Cardio",
            name: "Hike",
            duration: 60,
            distance: 3.25
          },
          {
            dayOf: weeksObj[2][6],
            type: "Resistance",
            name: "Squats",
            duration: 20,
            weight: 225,
            reps: 10,
            sets: 3
          }
        ]
      },
    ]
    console.log(data)
    API.insertCollection(data)
      .then(res => console.log(res))
      .catch(err => console.log(err))


  },

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