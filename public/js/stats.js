const previousButton = document.querySelector('.previous');
const nextButton = document.querySelector('.next');
const seedButton = document.querySelector('.seed')

const seedWeeks = 3;

API.getWorkoutsInRange()
  .then(res => {
    if (res === undefined || res.weekOf !== utilFunctions.formatDate()[0]) {
      let container = document.querySelector('.prev-workout');
      let h2 = document.createElement('h2');
      h2.classList.add('text-center');

      h2.textContent = 'No workouts have been logged.';
      h2.style.color = 'red';
      container.prepend(h2)
      return res;
    } else {
      return res;
    }
  })
  .then(data => {
    if (!data) {
      return;
    } else {
      control(data)
    }
  });

const control = (data) => {
  populateChart(data);
}

let lineChart;
let barChart;
let cardioPieChart;
let resistancePieChart;

const populateChart = (data) => {

  if (lineChart || barChart || cardioPieChart || resistancePieChart) {
    lineChart.destroy();
    barChart.destroy();
    cardioPieChart.destroy();
    resistancePieChart.destroy()
  }

  localStorage.setItem('displayWeek', data.weekOf)

  let displayWeek = localStorage.getItem('displayWeek');
  let weeksPast = utilFunctions.weeksPast(seedWeeks)

  let weekOfDisplay = document.querySelector('.weekOfDisplay')
  weekOfDisplay.textContent = `Week of: ${displayWeek}`;

  for (let [key, value] of Object.entries(weeksPast)) {
    if (displayWeek === value[0]) {
      localStorage.setItem('weeksPastKey', key)
    }
  }

  let datesArr = utilFunctions.datesArr();
  let weight = utilStats.weightPerDay(data);
  let distance = utilStats.distancePerDay(data);

  let chartArraysHash = utilStats.durations(data);
  let colors = utilStats.generatePalette(chartArraysHash);

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  let titleFontSize = '14';

  const lineAndBarChartDataset = (type) => {
    let datasetsArr = [];

    for (const [key, value] of Object.entries(type)) {
      datasetsArr.push(
        {
          label: `${key}`,
          backgroundColor: utilStats.getRandomRgb(),
          borderColor: utilStats.getRandomRgb(),
          data: value,
          fill: true
        }
      )
    }
    console.log('datasetsasrr', datasetsArr);
    return datasetsArr;
  }

  //////////////////// CHARTS /////////////////
  lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: datesArr,
      datasets: lineAndBarChartDataset(distance),
    },
    options: {
      maintainAspectRatio: false,
      title: {
        display: true,
        text: "Distance Covered (mi)",
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

  barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: datesArr,
      datasets: lineAndBarChartDataset(weight),
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted (lbs)",
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
      },
      maintainAspectRatio: false
    },

  });

  cardioPieChart = new Chart(pie, {
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
      maintainAspectRatio: false,
      title: {
        display: true,
        text: !chartArraysHash.Cardio.durations.length ? 'No Cardio Minutes Logged' : "Cardio Performed (min)",
        fontColor: !chartArraysHash.Cardio.durations.length ? 'Red' : '',
        fontSize: titleFontSize
      }
    }
  });

  resistancePieChart = new Chart(pie2, {
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
      maintainAspectRatio: false,
      title: {
        display: true,
        text: !chartArraysHash.Resistance.durations.length ? 'No Resistance Minutes Logged' : "Resistance Performed (min)",
        fontColor: !chartArraysHash.Resistance.durations.length ? 'red' : "",
        fontSize: titleFontSize

      }
    }
  });
}

previousButton.addEventListener('click', async () => {
  let displayWeek = localStorage.getItem('displayWeek')
  let allWorkouts = await API.getAllWorkouts();
  let weeksPast = utilFunctions.weeksPast(seedWeeks);
  let weeksPastKey;

  for (let [key, value] of Object.entries(weeksPast)) {
    if (displayWeek === value[0]) {
      ((key - 1) < 0) ?
        weeksPastKey = 0 :
        weeksPastKey = (key - 1);
      localStorage.setItem('weeksPastKey', weeksPastKey)
      populateChart(allWorkouts[weeksPastKey])
    }
  }
});

nextButton.addEventListener('click', async () => {
  let displayWeek = localStorage.getItem('displayWeek')
  let allWorkouts = await API.getAllWorkouts();
  let weeksPast = utilFunctions.weeksPast(seedWeeks);
  let weeksPastLength = Object.keys(weeksPast).length;
  let weeksPastKey;

  for (let [key, value] of Object.entries(weeksPast)) {
    if (displayWeek === value[0]) {
      ((key + 1) > weeksPastLength - 1) ?
        weeksPastKey = weeksPastLength - 1 :
        weeksPastKey = key += 1;

      (weeksPastKey.length > 1) ?
        weeksPastKey = weeksPastKey.substring(1) :
        weeksPastKey;

      localStorage.setItem('weeksPastKey', weeksPastKey)
      populateChart(allWorkouts[weeksPastKey])
    }
  }
});
