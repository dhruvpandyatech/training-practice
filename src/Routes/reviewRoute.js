import { Router } from "express";
import validationMiddleWare from "../middleware/validationMiddleware.js";
import { createReviewSchema, getReviewsSchema, reviewIdSchema, updateReviewSchema } from "../ValidationSchema/reviewValidationSchema.js";
import { reviewController } from "../controller/reviewController.js";
const route = Router();

route.post("/createReview",validationMiddleWare(createReviewSchema),reviewController.createReview);

route.get("/getReviews",validationMiddleWare(getReviewsSchema,"query"),reviewController.getReviews);


export default route;