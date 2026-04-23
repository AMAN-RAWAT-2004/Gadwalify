const dotenv=require('dotenv')
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
// const morgan=require('morgan')
const userRoutes=require('./routes/userRoute')
const songRoutes=require('./routes/songRoute')
const playlistRoutes=require('./routes/playlistRoute')
const redisClient=require('./config/redisClient')
// CREATING APP WITH EXPRESS 
const app=express();


// MIDDLEWARE 
app.use(express.json())
app.use(cors())
// app.use(morgan("dev"))



// CONNECTION TO ENV FILES 
dotenv.config({})


// CONNECTION TO DATABASE 
mongoose.connect(process.env.DATABASE).then(()=>{
    console.log('DATABASE CONNECTED SUCCESFULLY')
}).catch((err)=>{
    console.log(err)
})

// SERVER 
app.get('/',async(req,res)=>{
    res.end('Welcome to Spotify clone')
})

//API'S
app.use('/api/users',userRoutes)
app.use('/api/songs',songRoutes)
app.use('/api/playlist',playlistRoutes)



const Port=process.env.PORT ||8000;

(async () => {
    try {
        await redisClient.connectRedis();
        console.log("Redis Connected ✅");

        app.listen(Port, () => {
            console.log(`Server is Listening on Port ${Port}`);
        });

    } catch (err) {
        console.log("Redis Connection Failed ", err);
    }
})();
