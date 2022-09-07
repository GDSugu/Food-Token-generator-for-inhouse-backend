const axios = require("axios")
const express = require("express");
const {config} = require("dotenv");
const cors = require('cors');


const jwt = require("jsonwebtoken");
const{log,middleware,mongo, validateToken} = require("./shared");


const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");

// const userRoutes = require("./routes/user.routes");



const app = express();
config();


const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const handler = (async() => {
    try {
        await mongo.connect();

        // PARSE REQUEST BODY AS JSON
        app.use(express.json());
        


        //LOGGING MIDDLEWARE

            app.use(middleware.logging);

        // MAINTENANCE MIDDLEWARE

            app.use(middleware.Maintenance);

        //Auth Route
        app.use("/auth",authRoutes);

        // Token Middleware
        // app.use(middleware.validateToken);

        //  Routes
        app.use("/pizza",adminRoutes );
        


//Initialising the port 

app.listen( process.env.PORT, () => log(`server listening at port ${process.env.PORT}`));
    
    } catch (err) {
        console.error(err)
    }

})();


module.exports = app