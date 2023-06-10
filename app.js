require('dotenv').config() 
const express = require('express') 
const app = express() ;
const authRoute =require('./routes/auth')
const categoryRoute =require('./routes/category')
const postRoute =require('./routes/post')
const userRoute =require('./routes/user')
const multer = require('multer')

app.use(express.json());

//Connect to DB
const connectDB = require('./db/connect')


const storage = multer.diskStorage({
    destenation: (req , file , cb)=>{
        cb(null , "images");
    },
    filename: (req, file , cb)=>{
        cb(null , req.body.name)
    },
})


const upload = multer({storage: storage});
app.post("/api/upload" , upload.single("file"), (req ,res)=>{
        res.status(200).json("file is uploaded")
})

app.use("/api/auth" , authRoute)
app.use("/api/category" , categoryRoute)
app.use("/api/post" , postRoute)
app.use("/api/user" , userRoute)





const PORT = 3000 || process.env.PORT
const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT , console.log(`server is listen to port ${PORT}`))
    }
    catch (err){
        console.log(err)
    }
}
start()