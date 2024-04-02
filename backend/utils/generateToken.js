const jwt = require("jsonwebtoken");

// Creating primary and refresh token
const generateToken = (id,fullname, email) => {
    const token=jwt.sign({id,fullname, email},
        process.env.PRIMARY_SECRET_KEY,
        {
        expiresIn:"1h"
    })

    // const refreshToken=jwt.sign({id,fullname, email},
    //     process.env.REFRESH_SECRET_KEY,
    //     {
    //     expiresIn:"7days"
    // })
    
    return (token)
}


// decrypting token

const decryptToken=(token)=>
{
    const tokenDecodablePart = token.split('.')[1];
    const decoded = JSON.parse(Buffer.from(tokenDecodablePart, 'base64').toString());
    return(decoded)
}


module.exports = { generateToken ,decryptToken};