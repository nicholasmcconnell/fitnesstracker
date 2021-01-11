// get all workout data from back-end

API.getWorkoutsInRange()
  .then(res => {
    if (res.weekOf !== utilFunctions.formatDate()[0]) {
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
    control(data)
  });

const control = (data) => {
  console.log(data)
  populateChart(data);
}

const populateChart = (data) => {
  //find why bar and line show nothing and pie charts do
  let datesArr = utilFunctions.formatDate();
  let distance = utilStats.distancePerDay(data);
  let pounds = utilStats.weightPerDay(data);
  let chartArraysHash = utilStats.durations(data);
  let colors = utilStats.generatePalette(chartArraysHash);

  console.log(distance)
  console.log(chartArraysHash)

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
          // backgroundColor: '',
          borderColor: "rgba(147,112,219, 0.5)",
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


