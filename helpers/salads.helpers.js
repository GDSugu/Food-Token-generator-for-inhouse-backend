const {ObjectId} = require("mongodb");
const db = require("../shared/mongo");

module.exports = {
    findAll(){
        return db.salads.find().toArray();
    },

    findById(_id){
        return db.salads.findOne({_id:ObjectId(_id),active:true});
    },
    

    insert(_id,data,userId){
        return db.salads.insertOne({
            ...data,
            userId,
            active: true,
            createdOn: new Date()
        });
    },

    updateById(_id,data){
        return db.salads.findOneAndUpdate(
            {_id:ObjectId(_id),admin:true},
            {$set:{...data,lastModifiedOn:new Date()}},
            {returnDocument: "after"},
        
        );
    },

    deleteById(_id){
        return db.salads.updateOne(
            {_id:ObjectId(_id),admin:true},
            {$set:{active:false,lastModifiedOn:new Date()}}
        );
    }
};