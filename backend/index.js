const express=require('express');
const { postRoute } = require('./routes/posts/postRoute');
const userRoute = require('./routes/users/userRoute');
const { commentRoute } = require('./routes/comments/commentRoute');
require("dotenv").config();
require("./config/dbConnect")
const app=express();
const PORT=process.env.PORT
app.use(express.json());


app.use("/posts", postRoute);
app.use("/users", userRoute);
app.use("/comments", commentRoute);


app.get('/', (req, res) => {
    res.send('hello')
});

app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`)
});