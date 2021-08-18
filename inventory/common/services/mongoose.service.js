//create a mongoose connection
const env= require('../config/env.config');
const mongoose=require("mongoose");
let count = 0;//to count the number of retry connection

const option ={
    autoIndex: false,   //don't build indexes
    poolSize:10,  //to create 10 connection sockets
    bufferMaxEnteries:0,
    useNewUrlParser:true,
    useUnifiedTopology:true
}

const connectWithRetry = ()=>{
    console.log('mongoDB connnect with retry')
    mongoose.connect(env.MONGO_URI,option).then(()=>{
        console.log('mongoDB is connected')
    }).catch(err=>{
        console.log('DB connection failed, retry after 5 second. ',++count);
        setTimeout(connectWithRetry,5000)
    })
};

connectWithRetry();

exports.mongoose = mongoose;

