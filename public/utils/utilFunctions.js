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
    let weeksInDays = numOfWeeks * daysInAWeek;
    let d = new Date()
    let month = d.getMonth();
    let day = d.getDate();
    let year = d.getFullYear();

    // console.log(currSunYear, currSunMonth, currSunDay)
    // let d = new Date(currSunYear, currSunMonth, currSunDay-28);
    for (let i = 0; i < numOfWeeks; i++) {
      let weekArr = utilFunctions.formatDateSeed(year, month, day - weeksInDays);
      weeksInDays -= 7;
      console.log(i, weekArr);
    }
  }

};

// module.exports = utilFunctions;