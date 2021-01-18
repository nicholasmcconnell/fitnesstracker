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
    let id = location.search.split("=")[1];
    let res;

    try {
      res = await fetch("/api/workouts/" + id, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.log(err)
    }

    const json = await res.json();

    return json;
  },
  createWorkout: async function (data = {}) {
    let res;
    try {
      res = await fetch("/api/workouts", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
    } catch (err) {
      console.log(err)
    }

    const json = await res.json();
    return json;
  },

  getWorkoutsInRange: async function () {
    let res;

    try {
      res = await fetch(`/api/workouts/range`);
    } catch (err) {
      console.log(err)
    }
    let json = await res.json();

    return json[json.length - 1];
  },

  deleteCollection: async function () {
    let res;

    try {
      res = await fetch("/api/workouts", {
        method: "DELETE",
      });
    } catch (err) {
      console.log(err)
    }

    const json = await res.json();
    return json;
  },

  insertCollection: async function (data){
    console.log(data)
    let res;
    try {
      res = await fetch('/api/workouts/seed', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      })
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();
    console.log(json)
    return json;
  },
  getAllWorkouts: async function () {
    let res;
    try {
      res = await fetch("/api/workouts");

    } catch (err) {
      console.log(err)
    }
    const json = await res.json();
    console.log(json)

    return json;
  },
};