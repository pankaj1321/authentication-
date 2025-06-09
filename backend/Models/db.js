const mongoose = require('mongoose');
//  mongo db url 
const mongo_url = process.env.MONGO_CONN;
// console.log(mongo_url);

// connecting from database
mongoose.connect(mongo_url)
.then(()=>{
    console.log("MONGO DB CONNECTED");
    
}).catch((err)=>{
    console.log("mongo db connection error",err);
    
})




