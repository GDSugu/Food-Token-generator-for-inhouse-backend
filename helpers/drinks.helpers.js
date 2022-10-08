const {ObjectId} = require("mongodb");
const db = require("../shared/mongo");

module.exports = {
    findAll(){
        return db.drinks.find().toArray();
    },

    findById(_id){
        return db.drinks.findOne({_id:ObjectId(_id),active:true});
    },
    

    insert(_id,data,userId){
        return db.drinks.insertOne({
            ...data,
            userId,
            active: true,
            createdOn: new Date()
        });
    },

    updateById(_id,data){
        return db.drinks.findOneAndUpdate(
            {_id:ObjectId(_id),admin:true},
            {$set:{...data,lastModifiedOn:new Date()}},
            {returnDocument: "after"},
        
        );
    },

    deleteById(_id){
        return db.drinks.updateOne(
            {_id:ObjectId(_id),admin:true},
            {$set:{active:false,lastModifiedOn:new Date()}}
        );
    }
};