const utilStats = {
    // getRandomRgb: function () {
    //   var num = Math.round(0xffffff * Math.random());
    //   var r = num >> 16;
    //   var g = num >> 8 & 255;
    //   var b = num & 255;
    //   return 'rgb(' + r + ', ' + g + ', ' + b + ', 0.5)';
    // },
    
    generatePalette: function(chartArraysHash){
  
      let cardioArrLength = chartArraysHash.Cardio.names.length;
      let resistanceArrLength = chartArraysHash.Resistance.names.length;
      let colorObj = {
        'Cardio': [],
        'Resistance': []
      };
    
      let getRandomRgb = () => {
        var num = Math.round(0xffffff * Math.random());
        var r = num >> 16;
        var g = num >> 8 & 255;
        var b = num & 255;
        return 'rgb(' + r + ', ' + g + ', ' + b + ', 0.5)';
      }
    
      for (let i = 0; i < cardioArrLength; i++) {
        let randomColor = getRandomRgb();
        colorObj['Cardio'].push(randomColor);
      }
    
      for (let i = 0; i < resistanceArrLength; i++) {
        let randomColor = getRandomRgb();
        colorObj['Resistance'].push(randomColor);
      }
      return colorObj;
    },  
    
    pieChartData: function(data){
    
      let exercises = data[data.length - 1].exercises;
      let nameDurationHash = {};
    
      let arrHash = {
        'Cardio': {
          'names': [],
          'durations': []
        },
        'Resistance': {
          'names': [],
          'durations': []
        }
      };
    
      for (let [key, value] of Object.entries(exercises)) {
        switch (value.type) {
          case 'Cardio':
            if (!nameDurationHash[value.type]) {
              nameDurationHash[value.type] = {};
            }
            if (!nameDurationHash[value.type][value.name]) {
              nameDurationHash[value.type][value.name] = value.duration;
            } else {
              nameDurationHash[value.type][value.name] += value.duration;
            }
            break;
          case 'Resistance':
            if (!nameDurationHash[value.type]) {
              nameDurationHash[value.type] = {};
            }
            if (!nameDurationHash[value.type][value.name]) {
              nameDurationHash[value.type][value.name] = value.duration;
            } else {
              nameDurationHash[value.type][value.name] += value.duration;
            }
            break;
          default:
            break;
        }
      }
    
      for (let [k, v] of Object.entries(nameDurationHash)) {
        for (let [key, value] of Object.entries(v)) {
          arrHash[k]['names'].push(key);
          arrHash[k]['durations'].push(value);
        }
    
      }
    
      return arrHash;
    },
    
    duration: function(data){
    
      let totalsArr = new Array(7).fill(0);
      let dateArr = utilFunctions.formatDate()
      let distance = {}
      let weekOfExercises = data[data.length - 1].exercises;
    
      for (const [key, value] of Object.entries(weekOfExercises)) {
        if (value.type === 'Cardio') {
          !distance[value.dayOf] ? distance[value.dayOf] = value.distance : distance[value.dayOf] += value.distance;
        }
      }
    
      for (const [key, value] of Object.entries(distance)) {
        let index = dateArr.indexOf(key);
        totalsArr[index] = value;
      }
      return (totalsArr);
    },
    
    calculateTotalWeight: function(data){
      let totalsArr = new Array(7).fill(0);
      let dateArr = utilFunctions.formatDate();
      let weight = {};
      let weekOfExercises = data[data.length - 1].exercises;
    
      for (const [key, value] of Object.entries(weekOfExercises)) {
        if (value.type === 'Resistance') {
          !weight[value.dayOf] ? weight[value.dayOf] = value.weight : weight[value.dayOf] += value.weight;
        }
      }
    
      for (const [key, value] of Object.entries(weight)) {
        let index = dateArr.indexOf(key);
        totalsArr[index] = value;
      }
    
      return totalsArr;
    },
    
    workoutNames: function(data) {
      let workouts = [];
    
      data.forEach(workout => {
        workout.exercises.forEach(exercise => {
          workouts.push(exercise.name);
        });
      });
      return workouts;
    }
    
  }