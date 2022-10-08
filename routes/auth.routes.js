const route = require("express").Router();

const db = require("../shared/mongo");

const {signUp,signIn} = require("../services/auth.services")

// Sign Up
route.post("/signup",signUp);




// Sign In 

route.post("/signin",signIn)

module.exports = route;
