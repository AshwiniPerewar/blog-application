const mongoose = require("mongoose");
require("dotenv").config();


const dbConnect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected Successfully")
    }
    catch (err)
    {
        console.log("DB Connection failed",err)
    }
}


dbConnect();
