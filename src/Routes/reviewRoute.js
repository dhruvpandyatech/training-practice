import { Router } from "express";
import validationMiddleWare from "../middleware/validationMiddleware.js";
import { createReviewSchema, getReviewsSchema, reviewIdSchema, updateReviewSchema } from "../ValidationSchema/reviewValidationSchema.js";
import { reviewController } from "../controller/reviewController.js";
const route = Router();


route.post("/createReview",validationMiddleWare(createReviewSchema),reviewController.createReview);
route.get("/getReviews",validationMiddleWare(getReviewsSchema,"query"),reviewController.getReviews);
// yaha b check karna he kaha se hua he kyakya
route.get("/reviewById/:id",validationMiddleWare(reviewIdSchema,"params"),reviewController.getReviewById);
route.patch("/updateReview/:id",validationMiddleWare(updateReviewSchema),validationMiddleWare(reviewIdSchema,"params"),reviewController.updateReview);
route.delete("/delete/:id",validationMiddleWare(reviewIdSchema,"params"),reviewController.deleteReview);

export default route;