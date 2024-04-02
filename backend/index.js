const express=require('express');
const { postRoute } = require('./routes/posts/postRoute');
const userRoute = require('./routes/users/userRoute');
const { commentRoute } = require('./routes/comments/commentRoute');
const globalErrHandler = require('./middlewares/globalErrorHandler');
require("dotenv").config();
require("./config/dbConnect")
const app=express();
const PORT = process.env.PORT
const cors = require('cors');


const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain)
// post route
app.use("/posts", postRoute);

// user route
app.use("/users", userRoute);

// comment route
app.use("/comments", commentRoute);

// global errorHandler middleware
app.use(globalErrHandler);

app.get('/', (req, res) => {
    res.send('hello')
});

app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`)
});