const {MongoClient} = require("mongodb");

const log = require("./log");


const mongo = {
    db:null,     //DB connection string
    pizza: null,  //students connection
    users:null,    // users connection
    salads:null,    // salads connection
    drinks:null,    // drinks connection
    sauces:null,    // sauces connection
    pasta:null,    // pasta connection
    dessert:null,    // desserts connection


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
            this.salads = await this.db.collection("salads");
            this.dessert = await this.db.collection("dessert");
            this.drinks = await this.db.collection("drinks");
            this.sauces = await this.db.collection("sauces");
            this.pasta = await this.db.collection("pasta");

           this.users = await this.db.collection("users");

           log("Mongo collections Initialized");
        //    return {students,users}
       
        } catch (err) {

           console.log("Error creating server", err.message);
       
        }
    }
}

module.exports = mongo;


