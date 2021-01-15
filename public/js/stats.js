// const utilFunctions = require("../../models/modelUtils/modelFunctions");

// get all workout data from back-end
const previousButton = document.querySelector('.previous');
const nextButton = document.querySelector('.next');
const seedButton = document.querySelector('.seed')

// localStorage.clear();

API.getWorkoutsInRange()
  .then(res => {
    if (res === undefined || res.weekOf !== utilFunctions.formatDate()[0]) {
      let container = document.querySelector('.container');
      let h2 = document.createElement('h2');
      h2.classList.add('text-center');

      h2.textContent = 'No workouts have been logged for this week.';
      container.prepend(h2)
      return res;
      ////Then should display previous weeks and be able to scroll through them
      //may need to have api retrieve all workouts so stats for previous weeks can be viewed
    } else {
      return res;
    }
  })
  .then(data => {
    if (!data) {
      return;
    } else {
      console.log(data)
      control(data)
    }
  });

const control = (data) => {
  populateChart(data);
}

const populateChart = (data) => {
  localStorage.setItem('displayWeek', data.weekOf)
  let displayWeek = localStorage.getItem('displayWeek');
  let weeksPast = utilFunctions.weeksPast(3)

  for (let [key, value] of Object.entries(weeksPast)) {
    if (displayWeek === value[0]) {
      localStorage.setItem('weeksPastKey', key)
    }
  }

  let datesArr = utilFunctions.datesArr();

  let distance = utilStats.distancePerDay(data);
  let pounds = utilStats.weightPerDay(data);
  let chartArraysHash = utilStats.durations(data);
  let colors = utilStats.generatePalette(chartArraysHash);

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  let titleFontSize = '14';
  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: datesArr,
      datasets: [
        {
          label: "Workout Distance (miles)",
          backgroundColor: utilStats.getRandomRgb(),
          borderColor: utilStats.getRandomRgb(),
          data: distance,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Distance Covered",
        fontSize: titleFontSize

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
      labels: datesArr,
      datasets: [
        {
          label: `Week of ${utilFunctions.datesArr()[0]}`,
          data: pounds,
          backgroundColor: utilStats.barChartColors(),
          borderColor: utilStats.barChartColors(),
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted",
        fontSize: titleFontSize
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

  let cardioPieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: chartArraysHash.Cardio.names,
      datasets: [
        {
          label: 'Cardio Performed',
          backgroundColor: colors.Cardio,
          data: chartArraysHash.Cardio.durations
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: !chartArraysHash.Cardio.durations.length ? 'No Cardio Minutes Logged' : "Cardio Performed (minutes)",
        fontColor: !chartArraysHash.Cardio.durations.length ? 'Red' : '',
        fontSize: titleFontSize
      }
    }
  });

  let resistancePieChart = new Chart(pie2, {
    type: "pie",
    data: {
      labels: chartArraysHash.Resistance.names,
      datasets: [
        {
          label: "Resistance Performed",
          backgroundColor: colors.Resistance,
          data: chartArraysHash.Resistance.durations
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: !chartArraysHash.Resistance.durations.length ? 'No Resistance Minutes Logged' : "Resistance Performed (minutes)",
        fontColor: !chartArraysHash.Resistance.durations.length ? 'red' : "",
        fontSize: titleFontSize

      }
    }
  });
}

previousButton.addEventListener('click', async () => {
  let displayWeek = localStorage.getItem('displayWeek')
  let allWorkouts = await API.getAllWorkouts();
  let weeksPast = utilFunctions.weeksPast(3);

  for (let [key, value] of Object.entries(weeksPast)) {
    if (displayWeek === value[0]) {
      localStorage.setItem('weeksPastKey', key - 1)
      populateChart(allWorkouts[key - 1])
    }
  }
});

nextButton.addEventListener('click', () => {
  console.log('next')
});

seedButton.addEventListener('click', () => {
  localStorage.setItem('weeksPastKey', 2)
  utilStats.seedFunction()
  location.reload();
});