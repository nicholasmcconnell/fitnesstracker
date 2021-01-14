
const API = {
  getLastWorkout: async function () {
    let res;
    try {
      res = await fetch("/api/workouts");

    } catch (err) {
      console.log(err)
    }
    const json = await res.json();

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
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();
    return json;
  },
  // createWorkoutSeed: async function (data) {
  //   console.log('in workout seed', data)
  //   const res = await fetch("/api/workouts/seed", {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //     headers: { "Content-Type": "application/json" }
  //   });

  //   const json = await res.json();
  //   return json;
  // },

  getWorkoutsInRange: async function () {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json[json.length - 1];
  },
  deleteCollection: async function () {
    console.log('in util api deleteCollection')
    const res = await fetch('/api/workouts/delete');
    const json = await res.json()

    return json;
  }
};

// module.exports = API;
