const express = require("express");
const router =  express.Router();
const {getCar, createCar, getCars, updateCar, deleteCar} = require("../controllers/cars");

router.route("/")
    .get(getCars)
    .post(createCar);
router.route("/:id")
    .get(getCar)
    .put(updateCar)
    .delete(deleteCar);

module.exports = router;
