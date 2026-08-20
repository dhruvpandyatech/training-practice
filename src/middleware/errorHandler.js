import errors from "../utils/apiError"


const notFound = (req,res,next)=>{
    next(errors.notFound(`Rotue ${req.originalUrl}  not found`))
};

const errorHandler = (err,req,res,next)=>{
    let statusCode = 500;
    let message = "Internal server error";
    let errors = [];

    // custom vale sare errors
    if(err.statusCode)
    {
        statusCode = err.statusCode;
        message = err.message;
        errors = err.errors;
    }

    // mongoose vala ho to
    else if(err.name === "CastError")
    {
        statusCode = 400;
        message = `Invalid value for ${err.path}`;
    }

    // validation error aayi to
    else if (err.name ==="ValidationError")
    {
        statusCode = 400;
        message = "Validation failed";

        errors = Object.values(err.errors).map((error)=>({
            field:error.path,
            message:error.message
        }))
    }

    else if(err.code === 11000)
    {
        statusCode = 409;
        message = "This email already exists";
    }
    
    // bonus vala

    else if(err.name === "TokenExpiredError"){
        statusCode = 401;
        message = "Token expired";
    }

    // stack vala b krdete he

    if(process.env.NODE_ENV !== 'production')
    {
        response.stack = err.stack;
    }

    // final response bhej rahe he

     res.status(statusCode).json({
        success:false,
        message:message,
        errors:errors
    })
}



export {
    notFound,
    errorHandler
}