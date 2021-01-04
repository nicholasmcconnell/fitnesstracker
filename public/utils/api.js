
const API = {
  getLastWorkout: async function () {
    console.log('in getlastworkout')
    let res;
    try {
      res = await fetch("/api/workouts");

    } catch (err) {
      console.log(err)
    }
    const json = await res.json();
    console.log(json[json.length-1])

    return json[json.length - 1];
  },
  addExercise: async function (data) {
    const id = location.search.split("=")[1];

    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const json = await res.json();

    return json;
  },
  createWorkout: async function (data = {}) {
    console.log('in create workout');
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();
    console.log(json)
    return json;
  },

  getWorkoutsInRange: async function () {
    console.log('in api.js range')
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();
    console.log('in get range')
    console.log(json);
    return json;
  },
};

// module.exports = API;
