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
    },

    renderWorkoutSummary: (summary, lastWorkoutWeek) => {
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
            if (k === 'weekOfStats' && (lastWorkoutWeek.weekOf !== utilFunctions.formatDate()[0])) {
                const p = document.createElement("p");
                p.textContent = 'No workouts logged for this week.';
                container2.appendChild(p);
                return;
            }

            for (const [key, value] of Object.entries(v)) {
                const p = document.createElement("p");
                const strong = document.createElement("strong");
                p.setAttribute('class', 'stats-display')
                strong.textContent = workoutKeyMap[k][key];
                const textNode = document.createTextNode(`: ${summary[k][key]}`);
                p.appendChild(strong);
                p.appendChild(textNode);

                k === 'dayOfStatsCardio' || k === 'dayOfStatsResistance' ? container.appendChild(p) : container2.appendChild(p);
            }
        };
    }
}