///////////// THIS FILE IS FOR DISPLAYING LAST WORKOUT SUMMARY ON INDEX.JS////////////
console.log('in workout.js')
async function initWorkout() {
  const lastWorkoutWeek = await API.getLastWorkout();

  if (!lastWorkoutWeek || !lastWorkoutWeek.exercises.length) {
    renderNoWorkoutText()
  } else if (lastWorkoutWeek.exercises.length) {
    console.log('if of workout.js')
    document
      .querySelector("a[href='/exercise?']")
      .setAttribute("href", `/exercise?id=${lastWorkoutWeek._id}`);

    const lastWorkoutSpecs = lastWorkoutWeek.exercises[lastWorkoutWeek.exercises.length - 1];
    console.log(lastWorkoutSpecs)
    // const workoutSummary = {};

    // const weekOfStats
    switch (lastWorkoutSpecs.type) {
      case 'Cardio':
        workoutSummary = {
          dayOfStatsCardio: {
            date: lastWorkoutSpecs.dayOf,
            name: lastWorkoutSpecs.name,
            type: lastWorkoutSpecs.type,
            duration: lastWorkoutSpecs.duration,
          },
          weekOfStats: {
            ...tallyExercises(lastWorkoutWeek.exercises)
          }
        }
        break;
      case 'Resistance':
        workoutSummary = {
          dayOfStatsResistance: {
            date: lastWorkoutSpecs.dayOf,
            name: lastWorkoutSpecs.name,
            type: lastWorkoutSpecs.type,
            reps: lastWorkoutSpecs.reps,
            sets: lastWorkoutSpecs.sets,
            weight: lastWorkoutSpecs.weight,
            duration: lastWorkoutSpecs.duration,
          },
          weekOfStats: {
            ...tallyExercises(lastWorkoutWeek.exercises)
          }
        }
        break;
      default:
        break;
    }

    renderWorkoutSummary(workoutSummary);
  }
}

function tallyExercises(exercises) {

  const tallied = {};

  for (const [key, value] of Object.entries(exercises)) {
    for (const [k, v] of Object.entries(value)) {
      if (typeof v === 'number' && !tallied[k]) {
        tallied[k] = v;
      } else if (typeof v === 'number' && tallied[k]) {
        tallied[k] += v;
      }
    }
  }
  return tallied;
}

///////////NOT BEING USED???///////////
function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return new Date(date).toLocaleDateString(options);
}

function renderWorkoutSummary(summary) {
  console.log(summary)

  const container = document.querySelector(".workout-stats");

  const { dayOfStatsCardio, dayOfStatsResistance, weekOfStats } = {
    dayOfStatsCardio: {
      date: "Date",
      name: "Name",
      type: "Type",
      duration: "Duration",
    },

    dayOfStatsResistance: {
      date: "Date",
      name: "Name",
      type: "Type",
      reps: 'Reps',
      sets: 'Sets',
      weight: 'Weight',
      duration: "Duration",
    },

    weekOfStats: {
      distance: "Distance Covered",
      duration: "Total Duration",
      reps: "Reps Performed",
      sets: "Sets Performed",
      weight: "Weight Lifted",
    }
  }
  console.log(summary[Object.keys(summary)[0]].type)
  switch (summary[Object.keys(summary)[0]].type) {
    case 'Cardio':
      workoutKeyMap = {
        dayOfStatsCardio: dayOfStatsCardio,
        weekOfStats: weekOfStats
      }
      break;
    case 'Resistance':
      workoutKeyMap = {
        dayOfStatsResistance: dayOfStatsResistance,
        weekOfStats: weekOfStats
      }
      break;
    default:
      break;
  }
console.log(workoutKeyMap)
  // const workoutKeyMap = summary.dayOfStats.type === "Cardio" ? {
  //   dayOfStats: {
  //     date: "Date",
  //     name: "Name",
  //     type: "Type",
  //     duration: "Duration",

  //   },

  //   weekOfStats: {
  //     totalDuration: "Today's Total Duration",
  //     totalDistance: "Total Distance Covered"
  //   }
  // } :
  //   {
  //     dayOfStats: {
  //       date: "Date",
  //       name: "Name",
  //       type: "Type",
  //       reps: 'Reps',
  //       sets: 'Sets',
  //       weight: 'Weight',
  //       duration: "Duration",
  //     },

  //     weekOfStats: {
  //       totalDuration: "Today's Total Duration",
  //       totalWeight: "Total Weight",
  //       totalSets: "Total Sets Performed",
  //       totalReps: "Total Reps Performed",
  //     }
  //   };
  console.log(workoutKeyMap)



  for (const [k, v] of Object.entries(summary)) {
    console.log(k, v)
    for (const [key, value] of Object.entries(v)) {
      console.log(key, value)
      const p = document.createElement("p");
      const strong = document.createElement("strong");
      // console.log(summary[k][key], )
      // console.log(workoutKeyMap[k][k])
      strong.textContent = workoutKeyMap[k][key];
      const textNode = document.createTextNode(`: ${summary[k][key]}`);

      p.appendChild(strong);
      p.appendChild(textNode);

      container.appendChild(p);
    }
  };
}

function renderNoWorkoutText() {
  const container = document.querySelector(".workout-stats");
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "You have not created a workout yet!"

  p.appendChild(strong);
  container.appendChild(p);
}

initWorkout();
