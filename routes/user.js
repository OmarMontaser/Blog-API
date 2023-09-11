const router = require("express").Router();

const {getUser , updateUser , deleteUser} = require('../controller/user')


router.get("/:id" , getUser)
router.put("/:id" ,updateUser);
router.delete("/:id" , deleteUser);


module.exports = router ; 