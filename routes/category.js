const router = require('express').Router() 
const Category = require('../models/category')


// Create Category 
router.post("/" , async(req , res) =>{
      const newCat = new Category(req.body)
    try{
        const savedcat = await newCat.save()
        res.status(200).json(savedcat)
    
    }catch(err){
        res.status(500).json(err)
    }

})

//fetch all category

router.get("/" , async(req ,res)=>{

    try{
        const cats = await Category.find()
        res.status(200).json(cats) ;

    }catch(err){
        res.status(500),json(err)
    }

})

module.exports = router ;