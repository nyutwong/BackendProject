const express = require("express");
const dotenv = require("dotenv");
const car = require("./routes/cars");
const connectDB = require("./config/db");

dotenv.config({path:"./config/config.env"})

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
app.use(express.json());
app.use("/api/v1/cars",car);

process.on("unhandledRejection",(err,promise)=>{
    console.log(`ERROR: ${err.message}`);
    server.close(()=>process.exit(1));
});