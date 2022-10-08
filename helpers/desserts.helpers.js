const {ObjectId} = require("mongodb");
const db = require("../shared/mongo");

module.exports = {
    findAll(){
        return db.dessert.find().toArray();
    },

    findById(_id){
        return db.dessert.findOne({_id:ObjectId(_id),active:true});
    },
    

    insert(_id,data,userId){
        return db.dessert.insertOne({
            ...data,
            userId,
            active: true,
            createdOn: new Date()
        });
    },

    updateById(_id,data){
        return db.dessert.findOneAndUpdate(
            {_id:ObjectId(_id),admin:true},
            {$set:{...data,lastModifiedOn:new Date()}},
            {returnDocument: "after"},
        
        );
    },

    deleteById(_id){
        return db.dessert.updateOne(
            {_id:ObjectId(_id),admin:true},
            {$set:{active:false,lastModifiedOn:new Date()}}
        );
    }
};