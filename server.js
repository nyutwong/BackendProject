const express = require("express");
const dotenv = require("dotenv");
const car = require("./routes/cars");

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log('App listening on port 3000!');
});

app.use("/api/v1/cars",car);