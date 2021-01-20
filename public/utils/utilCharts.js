// let datesArr = utilFunctions.datesArr();

// let distance = utilStats.distancePerDay(data);
// let pounds = utilStats.weightPerDay(data);
// let chartArraysHash = utilStats.durations(data);
// let colors = utilStats.generatePalette(chartArraysHash);

// let line = document.querySelector("#canvas").getContext("2d");
// let bar = document.querySelector("#canvas2").getContext("2d");
// let pie = document.querySelector("#canvas3").getContext("2d");
// let pie2 = document.querySelector("#canvas4").getContext("2d");

// let titleFontSize = '14';
// const utilCharts = {
//   lineChart: () => new Chart(line, {
//     type: "line",
//     data: {
//       labels: datesArr,
//       datasets: [
//         {
//           label: "Workout Distance (miles)",
//           backgroundColor: utilStats.getRandomRgb(),
//           borderColor: utilStats.getRandomRgb(),
//           data: distance,
//           fill: true
//         }
//       ]
//     },
//     options: {
//       maintainAspectRatio: false,
//       // responsive: true,
//       title: {
//         display: true,
//         text: "Distance Covered",
//         fontSize: titleFontSize

//       },
//       scales: {
//         xAxes: [
//           {
//             display: true,
//             scaleLabel: {
//               display: true
//             }
//           }
//         ],
//         yAxes: [
//           {
//             display: true,
//             scaleLabel: {
//               display: true
//             }
//           }
//         ]
//       }
//     }
//   })

//   let barChart = new Chart(bar, {
//     type: "bar",
//     data: {
//       labels: datesArr,
//       datasets: [
//         {
//           label: `Week of ${utilFunctions.datesArr()[0]}`,
//           data: pounds,
//           backgroundColor: utilStats.barChartColors(),
//           borderColor: utilStats.barChartColors(),
//           borderWidth: 1
//         }
//       ]
//     },
//     options: {
//       title: {
//         display: true,
//         text: "Pounds Lifted",
//         fontSize: titleFontSize
//       },
//       scales: {
//         yAxes: [
//           {
//             ticks: {
//               beginAtZero: true
//             }
//           }
//         ]
//       },
//       // responsive: true, 
//       maintainAspectRatio: false
//     },

//   });

//   let cardioPieChart = new Chart(pie, {
//     type: "pie",
//     data: {
//       labels: chartArraysHash.Cardio.names,
//       datasets: [
//         {
//           label: 'Cardio Performed',
//           backgroundColor: colors.Cardio,
//           data: chartArraysHash.Cardio.durations
//         }
//       ]
//     },
//     options: {
//       maintainAspectRatio: false,
//       title: {
//         display: true,
//         text: !chartArraysHash.Cardio.durations.length ? 'No Cardio Minutes Logged' : "Cardio Performed (minutes)",
//         fontColor: !chartArraysHash.Cardio.durations.length ? 'Red' : '',
//         fontSize: titleFontSize
//       }
//     }
//   });

//   let resistancePieChart = new Chart(pie2, {
//     type: "pie",
//     data: {
//       labels: chartArraysHash.Resistance.names,
//       datasets: [
//         {
//           label: "Resistance Performed",
//           backgroundColor: colors.Resistance,
//           data: chartArraysHash.Resistance.durations
//         }
//       ]
//     },
//     options: {
//       maintainAspectRatio: false,
//       title: {
//         display: true,
//         text: !chartArraysHash.Resistance.durations.length ? 'No Resistance Minutes Logged' : "Resistance Performed (minutes)",
//         fontColor: !chartArraysHash.Resistance.durations.length ? 'red' : "",
//         fontSize: titleFontSize

//       }
//     }
//   });

//   //if boolean from click = true => run .destroy()
//   if(destroyCharts === true){
//     lineChart.destroy();
//     barChart.destroy();
//     cardioPieChart.destroy();
//     resistancePieChart.destroy()
//   }
// }