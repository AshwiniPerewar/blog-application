const appErr= require("./appErr");

const handleValidationErrDB = (err) => {
    const error = Object.values(err.errors).map((err => err.message));
    const message=`Invalid Input Data ${error.join(".")}`
    return appErr(message,400);
}

module.exports = handleValidationErrDB;