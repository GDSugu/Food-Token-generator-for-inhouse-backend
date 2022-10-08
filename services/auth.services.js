

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const joi = require("joi")


const {signInSchema,signUpSchema,validate} =  require("../shared/schema")


const db = require("../shared/mongo")

module.exports = {
    async signUp(req, res) {

        try {

            // Request body validation
           
            const isError = await validate(signUpSchema, req.body)
            if (isError) return res.status(400).json({ message: isError });

            // Check User Exists or Not
            let user = await db.users.findOne({ email: req.body.email});
            if (user)
                return res.status(400).json({ message: "user already exists" });

            //  Check password and confirm password same or not
            if(req.body.password !== req.body.cpassword)
            return res.status(400).json({message:"Password mismatch"});

            // Encrypt the password
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt)

            // Delete confirm password before Insertion
            delete req.body.cpassword;

            // Insert into users collection
            user = await db.users.insertOne({...req.body, active:true, createdOn:new Date()});

            res.json({ message: "user signed up successfully" });

        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "error in sign up" })

        }
    },

    async signIn(req, res) {

        try {

            // Request body validation

            const isError = await validate(signInSchema, req.body)
            if (isError) return res.status(400).json({ message: isError })


            //Check user exists or not
            let user = await db.users.findOne({ email: req.body.email});

            if (!user)
                return res.status(401).json({ message: "User does not exists" });
            if (!user.active)
                return res.status(401).json({ message: "User is inactive" });


            //Check Password
            const isValid = await bcrypt.compare(req.body.password, user.password);
            if (isValid) {

                delete user.password
                // Instead of user we can give only _id:user._id to display to the user
                // Third parameter is token expiry timings
                // const authToken = jwt.sign({_id:user._id}, process.env.JWT_SECRET , { expiresIn: process.env.JWT_EXPIRES_IN })

                // res.json({ message: "user signed in successfully", authToken })
                // res.json({ message: "user signed in successfully"})
            } else {
                res.status(401).json({ message: "Username or Password does not match" })
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "error in signin" })
        }
    },
}