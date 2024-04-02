const appErr = require("../utils/appErr")
const protected = (req, res, next) => {
    if(req.headers.authorization){
        next()
    }
    else {
        next(appErr("Not Authorized, Please Login Again"))
    }
}

module.exports = protected;