
const utilStats = {
  getRandomRgb: () => {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgba(' + r + ', ' + g + ', ' + b + ', 0.5)';
  },
  generatePalette: (chartArraysHash) => {
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
    for (let i = 0; i <= 6; i++) {
      barColorArr.push(utilStats.getRandomRgb())
    }
    return barColorArr;
  },
  durations: (data) => {

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
    console.log(nameDurationHash)
    for (let [k, v] of Object.entries(nameDurationHash)) {
      for (let [key, value] of Object.entries(v)) {
        arrHash[k]['names'].push(key);
        arrHash[k]['durations'].push(value);
      }

    }
    return arrHash;
  },
  distancePerDay: (data) => {
    let dateArr = utilFunctions.datesArr();
    let totalsObj = {}
    let distance = {}
    let weekOfExercises = data.exercises;

    for (const [key, value] of Object.entries(weekOfExercises)) {
      if (value.type === 'Cardio') {
        if (!distance[value.name]) {
          distance[value.name] = {};
          distance[value.name][value.dayOf] = value.distance;
        } else if (distance[value.name]) {
          !distance[value.name][value.dayOf] ?
            distance[value.name][value.dayOf] = value.distance :
            distance[value.name][value.dayOf] += value.distance;
        }
      }
    }

    for (const [k, v] of Object.entries(distance)) {
      totalsObj[k] = new Array(7).fill(0)

      for (const [key, value] of Object.entries(v)) {
        let index = dateArr.indexOf(key);
        totalsObj[k][index] = value;
      }
    }
    return totalsObj;
  },
  weightPerDay: (data) => {
    // This function is the same as distancePerDay.  They have been kept seperate despite their redundancy because future implimentations will will require different uses for each exerscise types data. :)
    let dateArr = utilFunctions.datesArr();
    let totalsObj = {}
    let weight = {}
    let weekOfExercises = data.exercises;

    for (const [key, value] of Object.entries(weekOfExercises)) {
      if (value.type === 'Resistance') {
        if (!weight[value.name]) {
          weight[value.name] = {};
          weight[value.name][value.dayOf] = value.weight;
        } else if (weight[value.name]) {
          !weight[value.name][value.dayOf] ?
            weight[value.name][value.dayOf] = value.weight :
            weight[value.name][value.dayOf] += value.weight;
        }
      }
    }

    for (const [k, v] of Object.entries(weight)) {
      totalsObj[k] = new Array(7).fill(0)

      for (const [key, value] of Object.entries(v)) {
        let index = dateArr.indexOf(key);
        totalsObj[k][index] = value;
      }
    }
    console.log(totalsObj)
    return totalsObj;
  },
  seedFunction: async () => {

    localStorage.setItem('weeksPastKey', 2)

    await API.deleteCollection()
      .then(res => console.log(`${res} documents removed.`))
      .catch(err => console.log(err))

    let numOfWeeks = 3;
    let weeksObj = utilFunctions.weeksPast(numOfWeeks);

    let data = [
      {
        ///WEEK THREE 
        date: { type: Date, default: () => new Date() },
        weekOf: weeksObj[0][0],
        exercises: [
          {
            dayOf: weeksObj[0][1],
            type: "Resistance",
            name: "Dips",
            duration: 25,
            weight: 75,
            reps: 8,
            sets: 4
          },
          {
            dayOf: weeksObj[0][1],
            type: "Cardio",
            name: "Run",
            duration: 25,
            distance: 4.3
          },
          {
            dayOf: weeksObj[0][3],
            type: "Resistance",
            name: "Bench Press",
            duration: 20,
            weight: 185,
            reps: 10,
            sets: 4
          },
          {
            dayOf: weeksObj[0][3],
            type: "Resistance",
            name: "Bicep Curls",
            duration: 30,
            weight: 45,
            reps: 10,
            sets: 4
          },
          {
            dayOf: weeksObj[0][4],
            type: "Resistance",
            name: "Bench Press",
            duration: 20,
            weight: 185,
            reps: 10,
            sets: 4
          },
          {
            dayOf: weeksObj[0][4],
            type: "Resistance",
            name: "Military Press",
            duration: 30,
            weight: 111,
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
            name: "Bench Press",
            duration: 20,
            weight: 205,
            reps: 10,
            sets: 4
          },
          {
            dayOf: weeksObj[1][1],
            type: "Resistance",
            name: "Military Press",
            duration: 20,
            weight: 90,
            reps: 10,
            sets: 4
          },
          {
            dayOf: weeksObj[1][3],
            type: "Cardio",
            name: "Run",
            duration: 25,
            distance: 2.2
          },

          {
            dayOf: weeksObj[1][3],
            type: "Resistance",
            name: "Bicep Curl",
            duration: 20,
            weight: 45,
            reps: 10,
            sets: 4
          },
          {
            dayOf: weeksObj[1][5],
            type: "Resistance",
            name: "Tricep Pushdown",
            duration: 20,
            weight: 50,
            reps: 10,
            sets: 60
          },
          {
            dayOf: weeksObj[1][6],
            type: "Cardio",
            name: "Jog",
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
            dayOf: weeksObj[2][0],
            type: "Cardio",
            name: "Swim",
            duration: 25,
            distance: .75
          },
          {
            dayOf: weeksObj[2][1],
            type: "Resistance",
            name: "Bicep Curls",
            duration: 25,
            weight: 30,
            reps: 8,
            sets: 4
          },
          {
            dayOf: weeksObj[2][1],
            type: "Cardio",
            name: "Swim",
            duration: 60,
            distance: 4.3
          },
          {
            dayOf: weeksObj[2][3],
            type: "Resistance",
            name: "Bench Press",
            duration: 20,
            weight: 170,
            reps: 10,
            sets: 4
          },
          {
            dayOf: weeksObj[2][3],
            type: "Cardio",
            name: "Bike",
            duration: 25,
            distance: 2.5
          },
          {
            dayOf: weeksObj[2][4],
            type: "Resistance",
            name: "Bench Press",
            duration: 30,
            weight: 210,
            reps: 10,
            sets: 4
          },
          {
            dayOf: weeksObj[2][4],
            type: "Resistance",
            name: "Military Press",
            duration: 20,
            weight: 115,
            reps: 10,
            sets: 4
          },
          {
            dayOf: weeksObj[2][6],
            type: "Cardio",
            name: "Jog",
            duration: 60,
            distance: 3.25
          },
          {
            dayOf: weeksObj[2][6],
            type: "Resistance",
            name: "Dips",
            duration: 20,
            weight: 75,
            reps: 10,
            sets: 3
          }
        ]
      },
    ]

    let currentWeekExercises = data[2].exercises;
    let thisWeeksDatesArr = utilFunctions.formatDate();

    for (const [key, value] of Object.entries(data[2].exercises)) {
      if (thisWeeksDatesArr.indexOf(value.dayOf) > thisWeeksDatesArr.indexOf(utilFunctions.todaysDate())) {
        currentWeekExercises.splice(key, currentWeekExercises.length)
        break;
      }
    }

    API.insertCollection(data)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  },

};