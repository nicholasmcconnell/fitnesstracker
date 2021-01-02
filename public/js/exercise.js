////////////THIS FILE IS FOR ADDING NEW EXERCISES TO DATABASE/////////////////

const workoutTypeSelect = document.querySelector("#type");
const cardioForm = document.querySelector(".cardio-form");
const resistanceForm = document.querySelector(".resistance-form");
const cardioNameInput = document.querySelector("#cardio-name");
const nameInput = document.querySelector("#name");
const weightInput = document.querySelector("#weight");
const setsInput = document.querySelector("#sets");
const repsInput = document.querySelector("#reps");
const durationInput = document.querySelector("#duration");
const resistanceDurationInput = document.querySelector("#resistance-duration");
const distanceInput = document.querySelector("#distance");
const completeButton = document.querySelector("button.complete");
const addButton = document.querySelector("button.add-another");
const toast = document.querySelector("#toast");
const newWorkout = document.querySelector(".new-workout");

console.log('in exercise.js')
let workoutType = null;
let shouldNavigateAway = false;

async function initExercise() {
  let lastWorkout = await API.getLastWorkout();
  let weekOf = '12/28/20'
  // utilFunctions.formatDate()[0];
  // console.log(lastWorkout.weekOf)
  console.log('in init of exercise.js')
  console.log(window.location)
  // needs to be coded so weekOf and lastWorkout are combared to create work out
  ////ORIGINAL CODE -> IT WORKS/////
  if (lastWorkout === undefined || (lastWorkout.weekOf !== weekOf)) {
    console.log('in init of exercise.js if')

    let workout;

    // if (location.search.split("=")[1] === undefined) {
    console.log('in init exercise.js')
    workout = await API.createWorkout()
    // }
    if (workout) {
      window.history.pushState('page2', 'Title', '?id=' + workout._id);
      // window.location.search = "?id=" + workout._id;
    }
  }
  //////////////////////////////////////

  // 1. create new workout if weekOf of last workout doesnot not !== current week of
  // - current week of is [0] of utilFunction.FormateDate
  // 2. else call get last work out and use that as id
  // let workout;
  // let lastWorkout = undefined;
  // const lastWorkout = await API.getLastWorkout();
  // const weekOf = await utilFunctions.formatDate()[0];


  // if (lastWorkout.weekOf !== weekOf) {
  //   workout = 
  //   location.search = "?id=" + workout._id;
  // } 

  // if (lastWorkout.weekOf === weekOf) {
  //   console.log(lastWorkout._id)
  //   location.search = "?id=" + lastWorkout._id;
  //   // return;
  // }
  // if (!lastWorkout) {
  //   console.log('1', window.location.search.split("=")[1])
  //     workout = await API.createWorkout();
  //     console.log('1111111111111')
  // if (window.location.search.split("=")[1] === undefined) {
  // }
  //   console.log(workout)
  //   if (workout) {
  //     console.log('in if workout')
  //     window.location.search = "?id=" + workout._id;
  //     var myURL = window.location.href; 
  //     console.log(myURL)      
  //     // window.location.href = myURL + "id=" + workout._id;
  //     return;
  //   }
  //   return;
  // } else if (lastWorkout.weekOf === weekOf) {
  //   console.log('2')

  //   location.search = "?id=" + lastWorkout._id;

  // } else if (lastWorkout.weekOf !== weekOf) {
  //   console.log('3')

  //   workout = await API.createWorkout();

  //   if (workout) {
  //     location.search = "?id=" + workout._id;
  //     return;
  //   }

  // }

}
// if (lastWorkout.weekOf !== weekOf) {
//   initExercise();
// }
initExercise();

function handleWorkoutTypeChange(event) {
  workoutType = event.target.value;

  if (workoutType === "cardio") {
    cardioForm.classList.remove("d-none");
    resistanceForm.classList.add("d-none");
  } else if (workoutType === "resistance") {
    resistanceForm.classList.remove("d-none");
    cardioForm.classList.add("d-none");
  } else {
    cardioForm.classList.add("d-none");
    resistanceForm.classList.add("d-none");
  }
}

function validateInputs() {
  let isValid = true;

  if (workoutType === "resistance") {
    if (nameInput.value.trim() === "") {
      isValid = false;
    }

    if (weightInput.value.trim() === "") {
      isValid = false;
    }

    if (setsInput.value.trim() === "") {
      isValid = false;
    }

    if (repsInput.value.trim() === "") {
      isValid = false;
    }

    if (resistanceDurationInput.value.trim() === "") {
      isValid = false;
    }
  } else if (workoutType === "cardio") {
    if (cardioNameInput.value.trim() === "") {
      isValid = false;
    }

    if (durationInput.value.trim() === "") {
      isValid = false;
    }

    if (distanceInput.value.trim() === "") {
      isValid = false;
    }
  }

  if (isValid) {
    completeButton.removeAttribute("disabled");
    // addButton.removeAttribute("disabled");
    return true;
  } else {
    completeButton.setAttribute("disabled", true);
    // addButton.setAttribute("disabled", true);
    return false;
    //through error toast here
  }
}

async function handleFormSubmit(event) {
  // if (validateInputs()) {
  // } else {
  //   alert('exercise not iniciated')
  // };
  // await initExercise()
  event.preventDefault();

  let workoutData = {};

  if (workoutType === "cardio") {
    workoutData.type = "cardio";
    workoutData.name = cardioNameInput.value.trim();
    workoutData.distance = Number(distanceInput.value.trim());
    workoutData.duration = Number(durationInput.value.trim());
  } else if (workoutType === "resistance") {
    workoutData.type = "resistance";
    workoutData.name = nameInput.value.trim();
    workoutData.weight = Number(weightInput.value.trim());
    workoutData.sets = Number(setsInput.value.trim());
    workoutData.reps = Number(repsInput.value.trim());
    workoutData.duration = Number(resistanceDurationInput.value.trim());
  }
  console.log(workoutData)

  await API.addExercise(workoutData);
  // clearInputßs();
  toast.classList.add("success");
}

function handleToastAnimationEnd() {
  toast.removeAttribute("class");
  if (shouldNavigateAway) {
    location.href = "/";
  }
}

function clearInputs() {
  cardioNameInput.value = "";
  nameInput.value = "";
  setsInput.value = "";
  distanceInput.value = "";
  durationInput.value = "";
  repsInput.value = "";
  resistanceDurationInput.value = "";
  weightInput.value = "";
}

if (workoutTypeSelect) {
  workoutTypeSelect.addEventListener("change", handleWorkoutTypeChange);
}
if (completeButton) {
  completeButton.addEventListener("click", function (event) {
    // shouldNavigateAway = true;
    handleFormSubmit(event);
  });
}
// if (addButton) {

//   addButton.addEventListener("click", handleFormSubmit);
// }
toast.addEventListener("animationend", handleToastAnimationEnd);

//this isn't doing anything really, it runs when page loads and that's about it - doesn't validate form on submit and then empty forms are being submitted
document
  .querySelectorAll("input")
  .forEach(element => element.addEventListener("input", validateInputs));
