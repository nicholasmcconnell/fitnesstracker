
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require('./routes')
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static("./public"));

mongoose.connect((process.env.MONGODB_URI || "mongodb://localhost/fitnesstracker"), {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false //may be needed for an indexDB option.   revisit this later.
},
).then(() => { console.log('Connection to database established.') })
  .catch(err => { console.log(err) });

require("./routes/html")(app);
app.use(routes);


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

