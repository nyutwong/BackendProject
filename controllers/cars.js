const car = require("../models/car");

exports.getCar = async (req,res,next)=>{
    try{
        const Car = await car.findById(req.params.id);
        if(!Car){
            res.status(400).json({ success:false, msg:"Not Found" });
        }
        res.status(200).json({ success:true,data:Car });
    }
    catch(err){
        res.status(400).json({ success:false, msg:"Not Found" });
    }
}

exports.createCar = async (req,res,next)=>{
    const Car = await car.create(req.body);
    res.status(201).json({ success:true, data:Car });
}

exports.getCars = async (req,res,next)=>{
    try{
        const Car = await car.find();
        if(!Car){
            res.status(400).json({ success:false, msg:"Not Found" });
        }
        res.status(200).json({ success:true, count:Car.length, data:Car });
    }
    catch(err){
        res.status(400).json({ success:false, msg:"Not Found" });
    }
}

exports.updateCar = async (req,res,next)=>{
    try{
        const Car = await car.findByIdAndUpdate(req.params.id,req.body, {
            new:true,
            runValidators:true,
        });
        if(!Car){
            res.status(400).json({ success:false, msg:"Not Found" });
        }
        res.status(200).json({ success:true,data:Car });
    }
    catch(err){
        res.status(400).json({ success:false, msg:"Not Found" });
    }
}

exports.deleteCar = async (req,res,next)=>{
    try{
        const Car = await car.findByIdAndDelete(req.params.id);
        if(!Car){
            res.status(400).json({ success:false, msg:"Not Found" });
        }
        res.status(200).json({ success:true,data:{} });
    }
    catch(err){
        res.status(400).json({ success:false, msg:"Not Found" });
    }
}