const utilFunctions = {
  formatDate: () => {
    //returns the dates for the current week
    let d = new Date();

    let datesArr = new Array();

    for (let i = 0; i <= 6; i++) {
      let date = i - d.getDay();
      let day = new Date(d.setDate(d.getDate() + date));

      datesArr.push(`${d.getMonth() + 1}/${day.getDate()}/${d.getFullYear()}`);
    }
    return datesArr;
  },

  formatDateSeed: (year, month, day) => {
    //Works with weeksPast() to return object of weeks past date arr's 
    //whose size corresponds to size of seed¸
    let d = new Date(year, month, day);
    let datesArr = [];

    for (let i = 0; i <= 6; i++) {
      let date = i - (d.getDay());
      let day = new Date(d.setDate(d.getDate() + date))
      datesArr.push(`${d.getMonth() + 1}/${day.getDate()}/${d.getFullYear()}`)
    }

    return datesArr;
  },

  weeksPast: (numOfWeeks) => {
    let daysInAWeek = 7
    let weeksInDays = (numOfWeeks - 1) * daysInAWeek;
    let d = new Date()
    let month = d.getMonth();
    let day = d.getDate();
    let year = d.getFullYear();
    let weeksObj = {};

    for (let i = 0; i < numOfWeeks; i++) {
      let weekArr = utilFunctions.formatDateSeed(year, month, day - weeksInDays);
      weeksObj[i] = weekArr;
      weeksInDays -= 7;
    }
    return weeksObj;
  },

  datesArr: () => {
    let weeksPastKey = localStorage.getItem('weeksPastKey')
    let displayWeek = localStorage.getItem('displayWeek');
    let weeksPast = utilFunctions.weeksPast(3)
    let datesArr = [];

    !displayWeek ? datesArr = utilFunctions.formatDate() : datesArr = weeksPast[weeksPastKey];
    return datesArr;
  },

  todaysDate: () => {
    let d = new Date();
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
  }
};