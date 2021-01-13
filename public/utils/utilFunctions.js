const utilFunctions = {
  formatDate: () => {
    //shows only the dates for the current week
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
      datesArr.push(`${d.getMonth() + 1}-${day.getDate()}-${d.getFullYear()}`)
    }

    return datesArr;
  },

  weeksPast: (numOfWeeks) => {
    numOfWeeks;
    let daysInAWeek = 7
    let weeksInDaysTotal = weeksInDays = numOfWeeks * daysInAWeek;
    let d = new Date()
    let month = d.getMonth();
    let day = d.getDate();
    let year = d.getFullYear();
    let weeksObj = {};

    for (let i = 0; i < numOfWeeks; i++) {
      let weekArr = utilFunctions.formatDateSeed(year, month, day - (weeksInDaysTotal - weeksInDays));
      weeksObj[i + 1] = weekArr;
      weeksInDays -= 7;
    }
    return weeksObj;
  }
};

// module.exports = utilFunctions;