const User = require("../../models/user/User");
const bcrypt=require("bcrypt")
// fetching all users
const getUserCntrl = async (req, res) => {
    try {
        const user = await User.find({});
        res.send({ message: "User Fetched Successfully", user })
    }
    catch (err) {
        res.send(err);
    }
}

// fetching user by id
const getUserByidCntrl = async (req, res) => {
    try {
        const id = req.params.id();
        console.log(id)
        const user = await User.findById(id);
        res.send({ message: "User Fetched By Id Successfully", user })
    }
    catch (err) {
        res.send(err);
    }
}

// register new user controller
const registerUserCntrl=async(req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)
            res.send({ message: "User already exists" });
        else {
            const hash =await bcrypt.hash(password, 5);
            console.log(hash)
            const user = new User({ fullname, email, password:hash  });
            await user.save();
            res.send({ message: "User registerd Successfully", user })
        }
    }
    catch (err) {
        res.send({ message: "User Registration failed", err });
    }
}


// user login
const loginCntrl= async(req, res) => {
    try {
        console.log(req.body)

        const{email,password} = req.body;
        const user = await User.findOne({ email  });
        if (user)
        {
            const match=bcrypt.compare(password,user.password)
            if (match)
                res.send({ message: "Logged In Successfully" });
            else
            res.send({ message: "Invalid Login Credentials" });
                
        }
        else
        res.send({ message: "Invalid Login Credentials" });
    }
    catch (err) {
        console.log(err)

        res.send(err);
    }
}


// update user controller
const updateUserCntrl=async(req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id,req.body);
        res.send({message:"Updated Successfully"})
    }
    catch (err) {
        res.send(err);
    }
}

// delete user controller
const deleteUserCntrl=async(req, res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        res.send({message:"Deleted Successfully"})
    }
    catch (err) {
        res.send(err);
    }
}

module.exports = {
    getUserCntrl,getUserByidCntrl,registerUserCntrl, loginCntrl, updateUserCntrl, deleteUserCntrl
}