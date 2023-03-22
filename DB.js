const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log(`connected to JECDB`);
}).catch((err)=>{
    console.log(err);
})
exports.mongoose;