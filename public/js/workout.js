///////////// THIS FILE IS FOR DISPLAYING LAST WORKOUT SUMMARY ON INDEX.JS////////////


const control = async () => {
  const workoutSummary = await initLastWorkout();
  renderWorkoutSummary(workoutSummary);
}

control();

async function initLastWorkout() {
  const lastWorkoutWeek = await API.getLastWorkout();

  if (!lastWorkoutWeek || !lastWorkoutWeek.exercises.length) {
    renderNoWorkoutText()
  } else if (lastWorkoutWeek.exercises.length) {
    document
      .querySelector("a[href='/exercise?']")
      .setAttribute("href", `/exercise?id=${lastWorkoutWeek._id}`);

    const lastWorkoutSpecs = lastWorkoutWeek.exercises[lastWorkoutWeek.exercises.length - 1];

    switch (lastWorkoutSpecs.type) {
      case 'Cardio':
        workoutSummary = {
          dayOfStatsCardio: {
            date: lastWorkoutSpecs.dayOf,
            type: lastWorkoutSpecs.type,
            name: lastWorkoutSpecs.name,
            duration: lastWorkoutSpecs.duration,
          },
          weekOfStats: {
            ...utilWorkout.tallyExercises(lastWorkoutWeek.exercises)
          }
        }
        break;
      case 'Resistance':
        workoutSummary = {
          dayOfStatsResistance: {
            date: lastWorkoutSpecs.dayOf,
            type: lastWorkoutSpecs.type,
            name: lastWorkoutSpecs.name,
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

    return workoutSummary;
  }
}
function renderWorkoutSummary(summary) {
  console.log(summary)
  
  const { dayOfStatsCardio, dayOfStatsResistance, weekOfStats } = {
    dayOfStatsCardio: {
      date: "Date",
      type: "Type",
      name: "Name",
      duration: "Duration",
    },

    dayOfStatsResistance: {
      date: "Date",
      type: "Type",
      name: "Name",
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

  const container = document.querySelector(".dayOfStats");
  const container2 = document.querySelector(".weekOfStats");



  for (const [k, v] of Object.entries(summary)) {
    for (const [key, value] of Object.entries(v)) {
      const p = document.createElement("p");
      const strong = document.createElement("strong");
    
      strong.textContent = workoutKeyMap[k][key];
      const textNode = document.createTextNode(`: ${summary[k][key]}`);
      p.appendChild(strong);
      p.appendChild(textNode);
     
      k === 'dayOfStatsCardio'|| k === 'dayOfStatsResistance' ? container.appendChild(p) : container2.appendChild(p);
    }
  };
}

// function tallyExercises(exercises) {

//   const tallied = {};

//   for (const [key, value] of Object.entries(exercises)) {
//     for (const [k, v] of Object.entries(value)) {
//       if (typeof v === 'number' && !tallied[k]) {
//         tallied[k] = v;
//       } else if (typeof v === 'number' && tallied[k]) {
//         tallied[k] += v;
//       }
//     }
//   }
//   return tallied;
// }

// function renderNoWorkoutText() {
//   const container = document.querySelector(".workout-stats");
//   const p = document.createElement("p");
//   const strong = document.createElement("strong");
//   strong.textContent = "You have not created a workout yet!"

//   p.appendChild(strong);
//   container.appendChild(p);
// }
