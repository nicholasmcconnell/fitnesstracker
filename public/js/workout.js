///////////// THIS FILE IS FOR DISPLAYING LAST WORKOUT SUMMARY ON INDEX.JS////////////
console.log('in workout.js')
async function initWorkout() {
  const lastWorkout = await API.getLastWorkout();
  console.log(lastWorkout);
  if (lastWorkout) {
    document
      .querySelector("a[href='/exercise?']")
      .setAttribute("href", `/exercise?id=${lastWorkout._id}`);

    const lastWorkoutSpecs = lastWorkout.exercises[lastWorkout.exercises.length - 1];
    console.log(lastWorkoutSpecs)
    // date, name, type, reps, sets, weight  type, duration
    const workoutSummary = {
      sharedStats: {
        date: formatDate(lastWorkout.day),
        name: lastWorkoutSpecs.name,
        type: lastWorkoutSpecs.type,
        durationToday: lastWorkoutSpecs.duration,
        numExercises: lastWorkout.exercises.length,
      },
      specificStats: {
        ...tallyExercises(lastWorkoutSpecs)
      }
    }

    renderWorkoutSummary(workoutSummary);
  } else {
    renderNoWorkoutText()
  }
}

function tallyExercises(exercises) {

  console.log(exercises)
  const tallied = Object.entries(exercises).reduce((acc, curr) => {
    if (exercises.type === "resistance" && typeof curr[1] === 'number') {

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
    } else if (exercises.type === "cardio" && typeof curr[1] === 'number') {
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

  const workoutKeyMap = summary.sharedStats.type === "cardio" ? {
    sharedStats: {
      date: "Date",
      name: "Name",
      type: "Type",
      durationToday: "Last Workout Duration",
      numExercises: "Exercise's Performed",

    },

    specificStats: {
      totalDuration: "Today's Total Duration",
      totalDistance: "Total Distance Covered"
    }
  } :
    {
      sharedStats: {
        date: "Date",
        name: "Name",
        type: "Type",
        durationToday: "Last Workout Duration",
        numExercises: "Exercise's Performed",

      },

      specificStats: {
        totalDuration: "Today's Total Duration",
        totalWeight: "Total Weight",
        totalSets: "Total Sets Performed",
        totalReps: "Total Reps Performed",
      }
    };
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
