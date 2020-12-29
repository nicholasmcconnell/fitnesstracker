
export default {
  getLastWorkout: async function() {
    let res;
    try {
      res = await fetch("/api/workouts");
      console.log('fetch res', res)
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();

    return json[json.length - 1];
  },
  addExercise: async function(data) {
    console.log('in addExercise api')
    const id = location.search.split("=")[1];
    console.log('data', JSON.stringify(data))

    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const json = await res.json();
    // console.log(json)

    return json;
  },
  createWorkout: async function(data = {}) {
    console.log('in createWorkout')
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();
    console.log('create workout', json);

    return json;
  },

  getWorkoutsInRange: async function() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();
    console.log(json);
    return json;
  },
};

// module.exports = API;
