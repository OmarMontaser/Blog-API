const router = require('express').Router()

const {getPost , newPost , updatePost , deletePost , getAllPosts} = require('../controller/post')

router.post("/" , newPost) ; 

router.get('/:id' ,getPost) ; 

router.put("/:id" , updatePost) ; 

router.delete("/:id" , deletePost) ;

router.get("/" , getAllPosts);

module.exports = router ; 