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
    switch (lastWorkoutSpecs.type) {
      case 'Cardio':
        workoutSummary = {
          dayOfStats: {
            date: lastWorkoutSpecs.dayOf,
            name: lastWorkoutSpecs.name,
            type: lastWorkoutSpecs.type,
            duration: lastWorkoutSpecs.duration,
            // numExercises: lastWorkoutWeek.exercises.length,
          },
          weekOfStats: {
            ...tallyExercises(lastWorkoutWeek.exercises)
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
          weekOfStats: {
            ...tallyExercises(lastWorkoutWeek.exercises)
          }
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
    //     // numExercises: lastWorkoutWeek.exercises.length,
    //   },
    //   weekOfStats: {
    //     ...tallyExercises(lastWorkoutWeek)
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
    //       ...tallyExercises(lastWorkoutWeek)
    //     }
    //   }

    renderWorkoutSummary(workoutSummary);
  }
}

function tallyExercises(exercises) {
  //display weekOf Date
  // tally exercises performd, distance, weight, duration
  // loop over array of objects push and add values in hashmap
  // if value is number and !key => hash[key] = value
  //if value is number and key exixts => hash[key] =+ value
  // return hashmap

  //reps = sets * reps


  console.log(exercises)

  const tallied = {};

  for (const [key, value] of Object.entries(exercises)) {
    for (const [k, v] of Object.entries(value)) {
      // console.log(typeof v, v)
      if (typeof v === 'number' && !tallied[k]) {
        tallied[k] = v;
      } else if (typeof v === 'number' && tallied[k]) {
        tallied[k] += v;
      }
    }
  }
  return tallied;
  // const tallied = Object.entries(exercises).reduce((acc, curr) => {
  //   if (exercises.type === "Resistance" && typeof curr[1] === 'number') {

  //     switch (curr[0]) {
  //       case 'duration':
  //         acc.totalDuration = (acc.totalDuration || 0) + curr[1];
  //         break;
  //       case 'weight':
  //         acc.totalWeight = (acc.totalWeight || 0) + curr[1];
  //         break;
  //       case 'sets':
  //         acc.totalSets = (acc.totalSets || 0) + curr[1];
  //         break;
  //       case 'reps':
  //         acc.totalReps = (acc.totalReps || 0) + curr[1];
  //         break;
  //       default:
  //         break;
  //     }
  //   } else if (exercises.type === "Cardio" && typeof curr[1] === 'number') {
  //     switch (curr[0]) {
  //       case 'distance':
  //         acc.totalDistance = (acc.totalDistance || 0) + curr[1];
  //         break;
  //       case 'duration':
  //         acc.totalDuration = (acc.totalDuration || 0) + curr[1];
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  //   return acc;
  // }, {});
  // console.log(tallied)
  // return tallied;
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
          totalDuration: "Total Duration",
          totalDistance: "Distance Covered",
          totalWeight: "Weight Lifted",
          totalSets: "Sets Performed",
          totalReps: "Reps Performed",
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
          totalDuration: "Total Duration",
          totalDistance: "Distance Covered",
          totalWeight: "Weight Lifted",
          totalSets: "Sets Performed",
          totalReps: "Reps Performed",
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
