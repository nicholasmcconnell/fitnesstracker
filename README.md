# Fitness Tracker

## Overview

Fitness Tracker is a full stack application where users may enter, view, and track workouts. The database stores workout details such as: date, number of reps, sets, distance, and elapsed time. The data sets vary depending on whether the exercise is a cardio or resistance training exercse.  With ChartJS and algorithms using JS's Date Object, workouts for the current week are displayed according to the date of their completion.

Cardio exercises for the week are displayed via a line chart (distance) and a pie chart (exercise duration).  Resistance exercises are displayed via a barchart (pounds lifted) and a pie chart (exercise duration).  Additionaly, users are able to recall  exercise statisics from previous weeks.  This app is built using a Mongo database with a Mongoose schema, Express route handling, Canvas.js, Vanilla and ES6 Javascript.  Exercises are associated with a partiuclar date using Javascript's Date Object. 

## Utilizing the App

- Experience the deployed app on Heroku: [Here](https://nmcconnell-fitnesstracker.herokuapp.com/ "Here")
- When the user loads the page, they are given the option to log a new workout.
 - The user is able to add a workout and view successfully added workouts via the stats page which displays workouts for the current week.  Here, users may also render past weeks exercises via the 'previous' and 'next' buttons.
      
## Demonstration
<p align="center">
<img src="https://github.com/nicholasmcconnell/fitnesstracker/blob/master/public/img/addworkout.gif" width="650" height="400"> 
  <img src="https://github.com/nicholasmcconnell/fitnesstracker/blob/master/public/img/stats.gif" width="650" height="400"> 
  </p>

## Tech used

- HTML
- CSS
- JS Date Object
- Javascript
- NodeJS
- Express
- MongoDB
- Mongoose
- ChartJS

## Contributers

- Nick McConnell
