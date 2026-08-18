const authorization = (...roles)=>{
    return (req,res,next)=>{
        if(!req.user)
        {
            return res.status(401).json({"mssge":"Login first"});
        }

        if(!roles.includes(req.user.role))
        {
            return res.status(403).json({"mssge":"this role is not authorized"});
        }
        next();
    }
}

export default authorization;