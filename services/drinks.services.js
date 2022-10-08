
const route = require("express").Router();
const {ObjectId} = require("mongodb")
const {validate, postSchema} =  require("../shared/schema");

const db = require("../shared/mongo")

const {findAll,findById,insert,updateById,deleteById} = require("../helpers/drinks.helpers")

module.exports = {

    async getAll(_,res){
       
        try {
            const posts = await findAll();
             return res.json(posts);
            
        } catch (err) {
            console.error(err);
            res.status(500).json({message:"Error fetching posts"})
        }

    },
   
    async getById(req,res){
        try {
            const post = await findById(req.params.id)
            res.json(post)

            if(!post) return res.status(401).json({ message: "Invalid posts" });

            if(!post.active) return res.status(401).json({ message: "Post is deleted" });

            

            
        } catch (err) {
            console.error(err);
            res.status(500).json({message:"Error fetching posts"})
        }

    },

    async create(req,res){
     
        try {
    
                    // Request body validation
                    const isError = await validate(postSchema, req.body)
                    if (isError) return res.status(400).json({ message: isError })

                    const {insertedId}  = await insert(req.body,req.user._id);
                   

                    // const post = await findById(insertedId);

                    // if(!post.admin) return res.status(401).json({ message: "Unauthorised user" });
                    
                    res.json( {message:"Posts created successfully"}, req.body);

                } catch (err) {
                    console.error(err);
                    res.status(500).json({ error: "Error while creating a post" })
        
                }
        
    },

    async update(req,res){
        try {
    
            // Request body validation
            const isError = await validate(postSchema, req.body)
            if (isError) return res.status(400).json({ message: isError });

            // Posts Exists or Not

            let post = await findById(req.params.id);

            if(!post) return res.status(401).json({message:"Post does not exist"});

            if(post.userId != req.user._id) return res.status(401).json({message:"user is not authorized to perform this operation"});

            if(!post.admin) return res.status(401).json({ message: "Unauthorised user" });
            // Update Posts collection
             const {value} = await updateById(req.params.id, req.body);
                 
           
            res.json({ message: "Posts updated successfully", post:value });

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error while updating a post" })

        }

},

    async remove(req,res){
        try {
    
            // Request body validation
            const isError = await validate(postSchema, req.body)
            if (isError) return res.status(400).json({ message: isError });

            // Posts Exists or Not

            let post = await findById(req.params.id);
            if(!post) return res.status(401).json({message:"Post does not exist"});

            if(post.userId != req.user._id) return res.status(401).json({message:"user is not authorized to perform this operation"});

            if(!post.admin) return res.status(401).json({ message: "Unauthorised user" });
            // Delete from Posts collection
             await deleteById(req.params.id)
                

            res.json({ message: "Posts deleted successfully",post });

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error while deleting a post" })

        }
    }
    
}


