///////////// THIS FILE IS FOR DISPLAYING LAST WORKOUT SUMMARY ON INDEX.JS////////////
console.log('in workout.js')
async function initWorkout() {
  const lastWorkout = await API.getLastWorkout();

  if (!lastWorkout || !lastWorkout.exercises.length) {
    renderNoWorkoutText()
  } else if (lastWorkout.exercises.length) {
    console.log('if of workout.js')
    document
      .querySelector("a[href='/exercise?']")
      .setAttribute("href", `/exercise?id=${lastWorkout._id}`);

    const lastWorkoutSpecs = lastWorkout.exercises[lastWorkout.exercises.length - 1];
    console.log(lastWorkoutSpecs)
    // const workoutSummary = {};
    switch (lastWorkoutSpecs.type) {
      case 'Cardio':
        workoutSummary = {
          dayOfStats: {
            date: lastWorkoutSpecs.dayOf,
            name: lastWorkoutSpecs.name,
            type: lastWorkoutSpecs.type,
            duration: lastWorkoutSpecs.duration,
            // numExercises: lastWorkout.exercises.length,
          },
          weekOfStats: {
            ...tallyExercises(lastWorkout)
          }
        }
        break;
      case 'Resistance':
        workoutSummary = {
          dayOfStats: {
            date: lastWorkoutSpecs.dayOf,
            name: lastWorkoutSpecs.name,
            type: lastWorkoutSpecs.type,
            reps: lastWorkoutSpecs.reps,
            sets: lastWorkoutSpecs.sets,
            weight: lastWorkoutSpecs.weight,
            duration: lastWorkoutSpecs.duration,
          },
          // weekOfStats: {
          //   ...tallyExercises(lastWorkout)
          // }
        }
        break;
      default:
        break;
    }
    // const workoutSummary = lastWorkoutSpecs.type === 'Cardio' ? {
    //   dayOfStats: {
    //     date: lastWorkoutSpecs.dayOf,
    //     name: lastWorkoutSpecs.name,
    //     type: lastWorkoutSpecs.type,
    //     duration: lastWorkoutSpecs.duration,
    //     // numExercises: lastWorkout.exercises.length,
    //   },
    //   weekOfStats: {
    //     ...tallyExercises(lastWorkout)
    //   }
    // } :
    //   {
    //     dayOfStats: {
    //       date: lastWorkoutSpecs.dayOf,
    //       name: lastWorkoutSpecs.name,
    //       type: lastWorkoutSpecs.type,
    //       reps: lastWorkoutSpecs.reps,
    //       sets: lastWorkoutSpecs.sets,
    //       weight: lastWorkoutSpecs.weight,
    //       duration: lastWorkoutSpecs.duration,
    //     },
    //     weekOfStats: {
    //       ...tallyExercises(lastWorkout)
    //     }
    //   }

    renderWorkoutSummary(workoutSummary);
  }
}

function tallyExercises(exercises) {
  //display weekOf Date
  // tally exercises performd, distance, weight, duration

  console.log(exercises)
  const tallied = Object.entries(exercises).reduce((acc, curr) => {
    if (exercises.type === "Resistance" && typeof curr[1] === 'number') {

      switch (curr[0]) {
        case 'duration':
          acc.totalDuration = (acc.totalDuration || 0) + curr[1];
          break;
        case 'weight':
          acc.totalWeight = (acc.totalWeight || 0) + curr[1];
          break;
        case 'sets':
          acc.totalSets = (acc.totalSets || 0) + curr[1];
          break;
        case 'reps':
          acc.totalReps = (acc.totalReps || 0) + curr[1];
          break;
        default:
          break;
      }
    } else if (exercises.type === "Cardio" && typeof curr[1] === 'number') {
      switch (curr[0]) {
        case 'distance':
          acc.totalDistance = (acc.totalDistance || 0) + curr[1];
          break;
        case 'duration':
          acc.totalDuration = (acc.totalDuration || 0) + curr[1];
          break;
        default:
          break;
      }
    }
    return acc;
  }, {});
  console.log(tallied)
  return tallied;
}

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

  console.log(summary);

  const container = document.querySelector(".workout-stats");

  switch (summary.dayOfStats.type) {
    case 'Cardio':
      workoutKeyMap = {
        dayOfStats: {
          date: "Date",
          name: "Name",
          type: "Type",
          duration: "Duration",

        },

        weekOfStats: {
          totalDuration: "Today's Total Duration",
          totalDistance: "Total Distance Covered"
        }
      }
      break;
      case 'Resistance':
        workoutKeyMap = {
          dayOfStats: {
            date: "Date",
            name: "Name",
            type: "Type",
            reps: 'Reps',
            sets: 'Sets',
            weight: 'Weight',
            duration: "Duration",
          },
    
          weekOfStats: {
            totalDuration: "Today's Total Duration",
            totalWeight: "Total Weight",
            totalSets: "Total Sets Performed",
            totalReps: "Total Reps Performed",
          }
        }

    default:
      break;
  }

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
      console.log(summary[k][key])
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
