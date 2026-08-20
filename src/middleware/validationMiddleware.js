import errors from "../utils/apiError";

const validationMiddleWare = (schema, source = "body") => {
    return (req, res, next) => {
        const result = schema.safeParse(req[source]);
        if (!result.success) {
            return next(
                errors.badRequest(
                    "Validation failed",
                    result.error.issues
                )
            )
        }
        if (source === "query") {
            Object.assign(req.query, result.data);
        } else {
            req[source] = result.data;
        }

        next();
    }
}

export default validationMiddleWare;