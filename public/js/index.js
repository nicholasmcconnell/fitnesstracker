///////////// THIS FILE IS FOR DISPLAYING LAST WORKOUT SUMMARY ON INDEX.JS////////////
const control = async () => {
  const lastWorkoutWeek = await API.getLastWorkout();
  const workoutSummary = await initLastWorkout(lastWorkoutWeek);
  if (!lastWorkoutWeek || !workoutSummary) {
    return;
  } else {
    utilWorkout.renderWorkoutSummary(workoutSummary, lastWorkoutWeek);
  }
}

control();

//////////// MODAL CODE /////////////////
let modalBtn = document.getElementById("modal-btn")
let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".close-btn");
let seedBtn = document.querySelector('.seed-btn');
let clearBtn = document.querySelector('.clear-btn');

if (localStorage.getItem('modalBtnClick') === 'true') {
  modal.style.display = 'none';
  localStorage.setItem('modalBtnClick', '')
}

seedBtn.onclick = async () => {
  await utilStats.seedFunction();
  modal.style.display = "none"
  localStorage.setItem('modalBtnClick', 'true')
  window.location.reload();

}
clearBtn.onclick = async () => {
  API.deleteCollection();
  modal.style.display = "none"
  localStorage.setItem('modalBtnClick', 'true')
  window.location.reload()
}
closeBtn.onclick = function () {
  console.log('click')
  modal.style.display = "none"
}
window.onclick = function (e) {
  if (e.target === modal) {
    modal.style.display = "none"
  }
}


async function initLastWorkout(lastWorkoutWeek) {
  if (!lastWorkoutWeek || !lastWorkoutWeek.exercises.length) {
    utilWorkout.renderNoWorkoutText()
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
            ...utilWorkout.tallyExercises(lastWorkoutWeek.exercises)
          }
        }
        break;
      default:
        break;
    }

    return workoutSummary;
  }
}