const router = require('express').Router()
const User = require("../models/user")
const Post = require("../models/post")


//Create  
router.post("/" , async(req ,res)=> {
    const NewPost = new Post(req.body);
    try{
        const savePost = await NewPost.save();
        res.status(200).json(savePost);
    }catch(err){
        res.status(500).json(err); 
    }
});

// Get
router.get('/:id' ,async (req , res)=>{
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err);
    }
})


// Update 

router.put("/:id" , async(req , res)=> {
    try{
          const post = await Post.findById(req.params.id)
       if (post.username === req.body.username){
       
          try{  
            const updatedPost = await Post.findByIdAndUpdate(
                req.params.id , 
                {$set: req.body}, 
                { new: true }
            )  
            res.status(200).json(updatedPost);
        }catch(err){
            res.status(500).json(err)
        }

    }else{
        res.status(401).json('you can update only your posts!')
    }

    }catch(err){ res.status(500).json(err) }
})


//Delete

router.delete("/:id" , async(req ,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.username === req.params.username) {

            try{
                await post.delete()
                res.status(200).json(`post has been deleted`);
            }catch(err){ res.status(500).json(err) }

        }else { res.status(401).json("you can delete only your post")}

    }catch(err) {
        res.status(500).json(err) ;
      }
})

//Get All Posts 
router.get("/" , async (req, res)=> {
    const username = req.query.user;
    const catName = req.query.cat ; 
    try{
        let posts ; 
        if(username){
            posts = await Post.find({username});
        
        } else if (catName) {
        
            posts = await Post.find({
                categories:{
                   $in: [catName],
                },
            })

        }else {
            posts = await Post.find();
        }
        res.status(200).json(posts) ;

    }catch(err){  res.status(500).json(err)}
})


module.exports = router ;