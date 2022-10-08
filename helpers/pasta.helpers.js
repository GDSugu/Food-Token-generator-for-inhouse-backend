const {ObjectId} = require("mongodb");
const db = require("../shared/mongo");

module.exports = {
    findAll(){
        return db.pasta.find().toArray();
    },

    findById(_id){
        return db.pasta.findOne({_id:ObjectId(_id),active:true});
    },
    

    insert(_id,data,userId){
        return db.pasta.insertOne({
            ...data,
            userId,
            active: true,
            createdOn: new Date()
        });
    },

    updateById(_id,data){
        return db.pasta.findOneAndUpdate(
            {_id:ObjectId(_id),admin:true},
            {$set:{...data,lastModifiedOn:new Date()}},
            {returnDocument: "after"},
        
        );
    },

    deleteById(_id){
        return db.pasta.updateOne(
            {_id:ObjectId(_id),admin:true},
            {$set:{active:false,lastModifiedOn:new Date()}}
        );
    }
};