import errors from "../utils/apiError";

const authorization = (...roles)=>{
    return (req,res,next)=>{
        if(!req.user)
        {
            return next(
                errors.unauthorized("Login first")
            )
        }
        if(!roles.includes(req.user.role))
        {
            return next(
                errors.forbidden("This role is not authorized")
            )
        }
        next();
    }
}

export default authorization;