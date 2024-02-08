const express=require('express');
const userRoute = express.Router();
const {registerUserCntrl, loginCntrl, updateUserCntrl, deleteUserCntrl, getUserCntrl, getUserByidCntrl } = require('../../controllers/users/userCntrl');


// Fetching all Users
userRoute.get('/', getUserCntrl);

// Fetch user by id
userRoute.get('/:id',getUserByidCntrl );

// egister new user 
userRoute.post('/register',registerUserCntrl );


// user login
userRoute.post('/login',loginCntrl);


// Update user by id
userRoute.patch('/:id', updateUserCntrl);


// Delete users by id
userRoute.delete('/:id', deleteUserCntrl);


module.exports = userRoute;