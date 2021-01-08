// get all workout data from back-end

API.getWorkoutsInRange()
  .then(res => {
    return res;
  })
  .then(data => {
    populateChart(data);
    // chartHashToArray(data)
  });

function generatePalette() {
  //1. random color generator function
  // Have variable the holds last value
  //check to make sure values aren't the same
  //make value empty new color after its verified

  //Should return array same length as names and values object
  const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600"
  ]

  return arr;
}



let pieChartData = (data) => {
  /////////FUCNTION WORKS BUT NEEDS TO BE SCALEABLE TO ACCOMODATE FUTURE IMPLIMENTATION OF EXERCISES ////


  let exercises = data[data.length - 1].exercises;
  let nameDurationHash = {};
  let nameDurationHash2 = {};

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

  console.log(arrHash['names'])
  //use type to make object i arrhash


  for (let [key, value] of Object.entries(exercises)) {
    // console.log(value)
    switch (value.type) {
      case 'Cardio':
        console.log('in cardio case')
        if (!nameDurationHash[value.type]) {
          nameDurationHash[value.type] = {};
        }
        if (!nameDurationHash[value.type][value.name]) {
          nameDurationHash[value.type][value.name] = value.duration;
        } else {
          nameDurationHash[value.type][value.name] += value.duration;
        }
        break;
      case 'Resistance':
        if (!nameDurationHash[value.type]) {
          nameDurationHash[value.type] = {};
        }
        if (!nameDurationHash[value.type][value.name]) {
          nameDurationHash[value.type][value.name] = value.duration;
        } else {
          nameDurationHash[value.type][value.name] += value.duration;
        }
        break;
      default:
        break;
    }
  }
  console.log(nameDurationHash)

  for (let [k, v] of Object.entries(nameDurationHash)) {
    for (let [key, value] of Object.entries(v)) {
      console.log(k, key, value)
      // if (!arrHash[key]) {
      //   arrHash[key] = {};
      //   arrHash[key].value = [];
      //   // console.log(arrHash, value)

      // }
      arrHash[k]['names'].push(key);
      arrHash[k]['durations'].push(value);

      // arrHash2['names'].push(key)
      // arrHash2['durations'].push(value)
    }
    // if (!nameDurationHash2[value.name]) {
    //   nameDurationHash2[value.name] = value.duration;
    // } else {
    //   nameDurationHash2[value.name] += value.duration;
    // }
  } 

  // for (let [key, value] of Object.entries(nameDurationHash2)) {
  //   arrHash2['names'].push(key)
  //   arrHash2['durations'].push(value)
  // }
  console.log(nameDurationHash, nameDurationHash2, arrHash)
   return arrHash;
}
function populateChart(data) {
  //need time based function to link dates to labels
  let datesArr = utilFunctions.formatDate();
  let durations = duration(data);
  let pounds = calculateTotalWeight(data);
  let workouts = workoutNames(data);
  let colors = generatePalette();
  let chartArraysHash = pieChartData(data)


  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  // console.log(workouts)
  // console.log(durations)
  // console.log(data)

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: datesArr,
      datasets: [
        {
          label: "Workout Duration In Minutes",
          // backgroundColor: '',
          borderColor: "violet",
          data: durations,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Workout Duration",
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ]
      }
    }
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: utilFunctions.formatDate(),
      datasets: [
        {
          label: `Week of ${utilFunctions.formatDate()[0]}`,
          data: pounds,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: chartArraysHash['names'],
      datasets: [
        {
          label: 'Cardio Performed',
          backgroundColor: colors,
          data: chartArraysHash['durations']
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Cardio Performed"
      }
    }
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: chartArraysHash['names'],
      datasets: [
        {
          label: "Resistance Performed",
          backgroundColor: colors,
          data: pounds
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Resistance Performed"
      }
    }
  });
}

const duration = (data) => {

  let totalsArr = new Array(7).fill(0);
  let dateArr = utilFunctions.formatDate()
  let duration = {}
  let weekOfExercises = data[data.length - 1].exercises;


  for (const [key, value] of Object.entries(weekOfExercises)) {
    !duration[value.dayOf] ? duration[value.dayOf] = value.duration : duration[value.dayOf] += value.duration;
  }

  for (const [key, value] of Object.entries(duration)) {
    let index = dateArr.indexOf(key);
    totalsArr[index] = value;
  }
  return (totalsArr);
}

const calculateTotalWeight = (data) => {
  let totalsArr = new Array(7).fill(0);
  let dateArr = utilFunctions.formatDate();
  let weight = {};
  let weekOfExercises = data[data.length - 1].exercises;

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
}

const workoutNames = (data) => {
  let workouts = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      workouts.push(exercise.name);
    });
  });
  console.log(workouts)
  return workouts;
}
