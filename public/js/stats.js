// get all workout data from back-end
console.log('in stats.js')

// import API from '../utils/api';
// const utilFunctions = require('../utils/utilFunctions');
// import utilFunctions from '../utils/utilFunctions';

fetch("/api/workouts/range")
  .then(response => {
    console.log(response);
    return response.json();
  })
  .then(data => {
    console.log(data)
    populateChart(data);
  });


console.log(API.getWorkoutsInRange());

function generatePalette() {
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
function populateChart(data) {
  //need time based function to link dates to labels
  let datesArr = formatDate();
  let durations = duration(data);
  let pounds = calculateTotalWeight(data);
  let workouts = workoutNames(data);
  const colors = generatePalette();

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");
  

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: datesArr,
      datasets: [
        {
          label: "Workout Duration In Minutes",
          backgroundColor: "red",
          borderColor: "red",
          data: durations,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true
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
      labels: formatDate(),
      datasets: [
        {
          label: "Pounds",
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
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: durations
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed"
      }
    }
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: pounds
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed"
      }
    }
  });
}

const formatDate = () => {
  //shows only the dates for the current week

  let d = new Date();

  let datesArr = new Array();

  for (let i = 0; i <= 6; i++) {
    let date = i - d.getDay();
    let day = new Date(d.setDate(d.getDate() + date))

    datesArr.push(`${d.getMonth() + 1}/${day.getDate()}/${d.getFullYear()}`)
  }
  return datesArr;
}

function duration(data) {

  let totalsArr = new Array(7).fill(0);
  let dateArr = formatDate()
  let durations = {}

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      !durations[workout.day] ? durations[workout.day] = exercise.duration : durations[workout.day] += exercise.duration
    });
  });

  for(const [key, value]  of Object.entries(durations)){
    let index = dateArr.indexOf(key);
    totalsArr[index] = value;
  }
  return(totalsArr);
}

function calculateTotalWeight(data) {
  let totalsArr = new Array(7).fill(0);
  let dateArr = utilFunctions.formatDate();
  let durations = {}

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      !durations[workout.day] ? durations[workout.day] = exercise.weight : durations[workout.day] += exercise.weight;
    });
  });

  for(const [key, value] of Object.entries(durations)){
    let index = dateArr.indexOf(key);
    totalsArr[index] = value;
  }

  return totalsArr;
}

function workoutNames(data) {
  let workouts = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      workouts.push(exercise.name);
    });
  });

  return workouts;
}
