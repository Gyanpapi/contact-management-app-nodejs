const { constants } = require("../constants");

const errorHandler = ( err,req,res,next) =>{
    
    const statusCode= res.statusCode ? res.statusCode : 500;
    console.log(statusCode);
    console.log("mahin");
    switch(statusCode)
    {
        
        case constants.Valideaition_Error:
            res.json({
                title:"Bad Request",
                message: err.message,
                stack: err.stack
            });
            break;
        case constants.Unauthorized:
            res.json({
                title:"Unauthorized",
                message: err.message,
                stack: err.stack
            });
            break;
        case constants.NotFound:
            res.json({
                title:"Not Found",
                message: err.message,
                stack: err.stack
            });
            break;
        case constants.ServerError:
            res.json({
                title:"Server Error",
                message: err.message,
                stack: err.stack
            });
            break;
        case constants.Forbidden:
            res.json({
                title:"Forbidden",
                message: err.message,
                stack: err.stack
            });
            break;
        default:
            console.log("No error found");
            break;
    }
}
    
module.exports = errorHandler;