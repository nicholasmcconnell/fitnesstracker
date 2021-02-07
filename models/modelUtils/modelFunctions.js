const utilModelFunctions = {
  formatDate: function () {
    //shows dates for the current week
    let d = new Date();

    let datesArr = new Array();

    for (let i = 0; i <= 6; i++) {
      let date = i - d.getDay();
      let day = new Date(d.setDate(d.getDate() + date));

      datesArr.push(`${d.getMonth() + 1}/${day.getDate()}/${d.getFullYear()}`);
    }
    return datesArr;
  }
};

module.exports = utilModelFunctions;