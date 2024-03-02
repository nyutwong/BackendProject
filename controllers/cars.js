const Car = require("../models/Car");

exports.getCars = async (req, res, next) => {
    let query;
    let queryStr = JSON.stringify(req.query);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    query = Car.find(JSON.parse(queryStr));

    try {
        const cars = await query;
        res.status(200).json({ success: true, count: cars.length, data: cars });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

exports.createCar = async (req, res, next) => {
    try {
        const car = await Car.create(req.body);
        res.status(201).json({ success: true, data: car });
    } catch (err) {
        res.status(400).json({ success: false });
    }

};

exports.getCar = async (req, res, next) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: car });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

exports.updateCar = async (req, res, next) => {
    try {
        const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!car) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: car });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

exports.deleteCar = async (req, res, next) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};
