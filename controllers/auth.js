const User = require("../models/User");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require('fs');

exports.register = async (req, res, next) => {
    upload.single("img")(req, res, async (err) => {
        if (err) {
            return res
                .status(400)
                .json({ success: false, message: err.message });
        }

        try {
            const {
                SSN,
                name,
                email,
                password,
                telephone_number,
                role,
                address,
            } = req.body;

            const newUser = new User({
                SSN: SSN,
                name: name,
                email: email,
                password: password,
                telephone_number: telephone_number,
                role: role,
                address: address,
                img: {
                    data: fs.readFileSync(req.file.path),
                    contentType: req.file.mimetype,
                },
            });

            newUser
                .save()
                .then(() => {
                    res.send("User Added!");
                    sendTokenResponse(newUser, 200, res);
                })
                .catch((err) => res.status(400).send("Error: " + err));

        } catch (err) {
            res.status(400).json({ success: false });
            console.log(err.stack);
        }
    });
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                msg: "Please provide an email and password",
            });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            res.status(400).json({
                success: false,
                msg: "Invalid credentials",
            });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            res.status(401).json({
                success: false,
                msg: "Invalid credentials",
            });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(401).json({
            success: false,
            msg: "cannot convert email or password to string",
        });
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(400).json({
            success: false,
        });
    }
};

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 60 * 60 * 24 * 1000
        ),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") {
        options.secure = true;
    }

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
    });
};

exports.logout = (req, res, next) => {
    res.cookie("token", "none", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        date: {},
    });
};
