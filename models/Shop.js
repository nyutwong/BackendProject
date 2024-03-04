const mongoose = require('mongoose');
const Booking = require("./Booking");
const Car = require("./Car");


const ShopSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxlength: [30, 'Name cannot be more than 30 characters']
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        maxlength: [50, 'Address cannot be more than 50 characters']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\d{10}$/,'Phone number must contain 10 characters']
    },
    openingHours: {
        type: String
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    }
});

ShopSchema.pre('deleteOne',{document: true, query: false}, async function(next){
    console.log(`Cars being removed from shop ${this._id}`);
    await Car.deleteMany({shop: this._id});
    
    next();
});

module.exports = mongoose.model('Shop', ShopSchema);