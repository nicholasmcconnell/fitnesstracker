// get all workout data from back-end
const previousButton = document.querySelector('.previous');
const nextButton = document.querySelector('.next');
const seedButton = document.querySelector('.seed')

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
      control(data)
    }
  });

const control = (data) => {
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

//previous/next
// - each button gets evenent listner or on
// - doc.querySelector the button to var
// - put even listener that makes api call 
// - selects week based on index 
//     - arr.length just loads again if at the ened (same for arr[0])
// - calls render workout and passes exercise to renderworkoutfunction;

previousButton.addEventListener('click', () => {
  console.log('previous')
})

nextButton.addEventListener('click', () => {
  console.log('next')
})

seedButton.addEventListener('click', () => {
  console.log('seed')
  //send seeds via send seed function from stats
  //may be easier ro write speficic seed route
  //write seeds
  // see if date function can handle date changing easily
  // see what is sent and created via routes
  let numOfWeeks = 3;

  let weeksObj = utilFunctions.weeksPast(numOfWeeks);

  console.log(weeksObj);
  //CREATE WORKOUT JSON
  //date: "2021-01-11T23:48:09.602Z"
  // exercises: []
  // weekOf: "1/10/2021"
  // __v: 0
  // _id: "5ffce3b9c8a7cf3ccb9dca23"

    for (const [key, value] of Object.entries(weeksObj)) {
      let apiSend = {
        date: Date,
        weekOf: value[0],
        exercises: [],
      }
    // console.log(key, value)
    API.createWorkoutSeed(apiSend)
      .then(res => {
        console.log(res);
      });

      //get id via get last workout or get all
      // then use deletemany and addmany from seed to finishe the job
      //send massive seed file from here so weeks obj cam be used
      //this will use just workout model - sorry for all the extra coding
    
    //need to be able to use workoutModel.  or else just having to rewrite app
    //Use insetermany to db??

    //
  }

  //SUDO
  //drop database
  // create workouts based on index 0 of array



  // let weekOfObj =

  //CARDIO ADD EXX JSON
  //   {type: "Cardio", name: "45", distance: 45, duration: 45}
  // distance: 45
  // duration: 45
  // name: "45"
  // type: "Cardio"}

  //RESISTANCE ADD EX JSON
  // type: "Resistance", name: "88", weight: 88, sets: 88, reps: 88, …}
  // duration: 88
  // name: "88"
  // reps: 88
  // sets: 88
  // type: "Resistance"
  // weight: 88
  // __proto__: Object  

  //FORM SUBMIT ORDER OF OBJECT
  // if (workoutType === "Cardio") {
  //   workoutData.type = "Cardio";
  //   workoutData.name = cardioNameInput.value.trim();
  //   workoutData.distance = Number(distanceInput.value.trim());
  //   workoutData.duration = Number(durationInput.value.trim());
  // } else if (workoutType === "Resistance") {
  //   workoutData.type = "Resistance";
  //   workoutData.name = nameInput.value.trim();
  //   workoutData.weight = Number(weightInput.value.trim());
  //   workoutData.sets = Number(setsInput.value.trim());
  //   workoutData.reps = Number(repsInput.value.trim());
  //   workoutData.duration = Number(resistanceDurationInput.value.trim());
  // }



})



