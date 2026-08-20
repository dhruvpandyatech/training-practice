const createError = (statusCode,message,errors=[])=>{
    const error = new Error(message);
    error.statusCode = statusCode;
    error.errors = errors;

    return error;
}

const badRequest = (message,errors=[])=>{
    return createError(400,message,errors);
}

const unauthorized = (message,errors=[])=>{
    return createError(401,message,errors);
}

const forbidden = (message,errors=[])=>{
    return createError(403,message,errors);
}

const notFound = (message,errors=[])=>{
    return createError(404,message,errors);
}

const conflict = (message,errors=[])=>{
    return createError(409,message,errors);
}


const errors = {
    conflict,
    notFound,
    forbidden,
    unauthorized,
    badRequest,
}

export default errors;
