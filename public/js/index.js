import API from '../utils/API.js';

init();

async function init() {
  if (location.search.split("=")[1] === undefined) {
    const workout = await API.getLastWorkout();
    console.log(workout)
    if (workout) {
      location.search = "?id=" + workout._id;
    } else if (!workout){
      document.querySelector("#continue-btn").classList.add("d-none")
    }
  }
}

