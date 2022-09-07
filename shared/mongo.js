const {MongoClient} = require("mongodb");

const log = require("./log");


const mongo = {
    db:null,  //DB connection string
    pizza: null,  //students connection
    users:null,    // users connection
    salads:null,    // salads connection
    desserts:null,    // desserts connection
    drinks:null,    // drinks connection
    sauces:null,    // sauces connection
    sides:null,    // sides connection


    async connect() {
        try {
            //Connecting to Mongo( server)
           const client = new MongoClient(process.env.MONGO_URL);
            // using await in order to wait utill it get response
           await client.connect();
           log("Mongo Connected Successfully");

           log(process.env.MONGO_URL);
       
           // Selecting the DB
            this.db = await client.db(process.env.MONGO_NAME);
           log(` Mongo database selected - ${process.env.MONGO_NAME}`);
       
           
            this.pizza = await this.db.collection("pizza");

            // this.salads = await this.db.collection("salads");
            // this.desserts = await this.db.collection("desserts");
            // this.drinks = await this.db.collection("drinks");
            // this.sauces = await this.db.collection("sauces");
            // this.sides = await this.db.collection("sides");

           this.users = await this.db.collection("users");

           log("Mongo collections Initialized");
        //    return {students,users}
       
        } catch (err) {

           console.log("Error creating server", err.message);
        //    process.exit();
            // throw new Error(err);

        }
    }
}

module.exports = mongo;


