const utilWorkout = {
    tallyExercises: function (exercises) {

        const tallied = {};

        for (const [key, value] of Object.entries(exercises)) {
            for (const [k, v] of Object.entries(value)) {
                if (typeof v === 'number' && !tallied[k]) {
                    tallied[k] = v;
                } else if (typeof v === 'number' && tallied[k]) {
                    tallied[k] += v;
                }
            }
        }
        return tallied;
    },

    renderNoWorkoutText: function () {
        const container = document.querySelector(".dayOfStats");
        const p = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = "You have not created a workout yet!"

        p.appendChild(strong);
        container.appendChild(p);

        let thisWeek = document.getElementById('weekStatsTitle');
        thisWeek.textContent = '';
    }
}