import { ResponseError } from "../utils/errResponse.js";

const errHandler = async (err, req, res, next) => {
    if(!err){
        return next();
    }
    const status = err.status || 500;
    let errMessage = err.message;
    
    if(err instanceof ResponseError){
        return res.status(status).json({
            errors : errMessage
        }).end();
    }

    
    res.status(status).json({
        message : errMessage,
    }).end();
}

export {
    errHandler
}