const express = require('express')
const router = express.Router() ;
const { createCategory , fetchCategory } = require('../controller/category')

router.post("/" , createCategory) ;
router.get("/" , fetchCategory) ;

module.exports = router ;