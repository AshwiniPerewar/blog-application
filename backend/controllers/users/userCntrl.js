const User = require("../../models/user/User");
const bcrypt=require("bcrypt");
const appErr = require("../../utils/appErr");
const { generateToken, decryptToken } = require("../../utils/generateToken");
const handleValidationErrDB = require("../../utils/validationError");


// fetching all users
const fetchUserCntrl = async (req, res,next) => {
    try {
        const {email,_id} = req.query;
        // console.log(req.params.id)
        const user = await User.findOne({ email :email,_id:_id});
        res.send({status:"success", message: "User Fetched Successfully", user })
    }
    catch (err) {
        res.send(next(appErr(err.message)));
    }
}

// fetching user by id
const fetchUserByidCntrl = async (req, res,next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        res.send({ message: "User Fetched By Id Successfully", user })
    }
    catch (err) {
        res.send(next(appErr(err.message)));
    }
}

// register new user controller
const registerUserCntrl=async(req, res, next) => {
    try {
        const { fullname, email, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return next(appErr("User already exists"));
            }
            else {
                const hash = await bcrypt.hash(password, 5);
                const user = new User({ fullname, email, password: hash });
                await user.save();
                res.status(200).send({ message: "User registerd Successfully", user })
            }
        }
    catch (err) {
        res.send(next(handleValidationErrDB(err)));
    }
}


// user login
const loginCntrl= async(req, res,next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return next(appErr("Email & password fields are required"))
        const userFound = await User.findOne({ email  });
        if (userFound)
        {
            const match = await bcrypt.compare(password, userFound.password);
            console.log(match)
            if (match)
            {
                const { id, fullname, email } = userFound;
                console.log(id);
                const token=generateToken(id, fullname, email);
                res.json({ message: "Logged In Successfully" ,data:userFound,token});
            }
            else
            res.json(next(appErr("Invalid Login Credentials",400 )));
                
        }
        else
        res.json(next(appErr("Invalid Login Credentials",400 )));
    }
    catch (err) {
        res.json(next(appErr(err.message)));
    }
}


// fetching profile by id
const profileCntrl = async (req, res,next) => {
    try {
       const token = req.headers.authorization.split(" ")[1];
            const user = decryptToken(token);
        const userFound = await User.findById(user.id).populate("posts");
        console.log(userFound)
            res.send({ message: "User Profile Fetched Successfully", data: userFound })
        }
    catch (err) {
        res.send(next(appErr(err.message)));
    }
}


// update user controller
const updateUserCntrl=async(req, res,next) => {
    try {
        const id = req.params.id;
        const { fullname, email,age } = req.body;
        const user = await User.findByIdAndUpdate(id,{fullname,email,age});
        res.send({message:"User Details Updated Successfully"})
    }
    catch (err) {
        res.send(next(appErr(err.message)));
    }
}

// update password controller
const updatePasswordCntrl=async(req, res,next) => {
    try {
        const id = req.params.id;
        const { password, newpassword } = req.body;
        const user = await User.findById(id);
        const match=bcrypt.compare(password,user.password)
        if (!match)
            return next(appErr({ message: "Incorrect password" }))
        else {
            const hash =await bcrypt.hash(newpassword, 5);
            await User.findByIdAndUpdate(id,{password:hash})
            res.send({ message: "Password has Changed Successfully" })
        }
    }
    catch (err) {
        res.send(next(appErr(err.message)));
    }
}

// update profile Image controller
const uploadProfileImageCntrl=async(req, res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const user = decryptToken(token);
        const path=req.file.path;
        const userFound = await User.findByIdAndUpdate(user.id,{profileImage:path});
        res.send({ message: "Profile Image Uploaded Successfully" })
        
    }
    catch (err) {
        res.send(next(appErr(err.message)));
    }
}

// update cover Image controller
const uploadCoverImageCntrl=async(req, res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const user = decryptToken(token);
        const path=req.file.path;
        const userFound = await User.findByIdAndUpdate(user.id,{coverImage:path});
        res.send({ message: "Cover Image Uploaded Successfully" })
        
    }
    catch (err) {
        res.send(next(appErr(err.message)));
    }
}

// delete user controller
const deleteUserCntrl = async (req, res, next) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        res.send({ message: "Deleted Successfully" })
    }
    catch (err) {
        res.send(next(appErr(err.message)));
    }
}

module.exports = {
    fetchUserCntrl,fetchUserByidCntrl,registerUserCntrl,profileCntrl, uploadProfileImageCntrl, uploadCoverImageCntrl, loginCntrl, updateUserCntrl,updatePasswordCntrl, deleteUserCntrl
}