const mongoose = require("mongoose");

const CarSchema = mongoose.Schema({
    license: {
        type: String,
        required: [true, "Please enter car's license"],
        unique: true,
        maxLength: [10, "License can not be more than 10 characters"],
    },
    type: {
        type: String,
        required: [true, "Please enter car's type"],
        maxLength: [30, "Type can not be more than 30 characters"],
    },
    model: {
        type: String,
        required: [true, "Please enter car's model"],
        maxlength: [30, "Type can not be more than 30 characters"],
    },
    color: {
        type: [String],
        required: [true, "Please enter car's color"],
        maxlength: [20, "Color can not be more than 20 characters"],
    },
    fuel_type: {
        type: String,
        required: [true, "Please enter car's fuel type"],
        maxlength: [20, "Fuel type can not be more than 20 characters"],
    },
    year: {
        type: Number,
        required: [true, "Please enter car's year"],
    },
    mileage: {
        type: Number,
        required: [true, "Please enter car's mileage"],
    },
    condition: {
        type: String,
        required: [true, "Please enter car's condition"],
        maxlength: [20, "Condition can not be more than 20 characters"],
    },
    image: {
        type: [String],
        required: [true, "Please enter car's image"],
    },
    number_of_seats: {
        type: Number,
        required: [true, "Please enter car's number_of_seats"],
    },
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

CarSchema.virtual('bookings', {
    ref: 'Booking',
    localField: '_id',
    foreignField: 'car',
    justOne: false
});

module.exports = mongoose.model("Car", CarSchema);
