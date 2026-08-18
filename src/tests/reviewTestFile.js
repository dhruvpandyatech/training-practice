import connectDb from "../config/db.js";
import reviewModel from "../models/reviewModel.js";
connectDb().then(async () => {
    try {
        const createReview = await reviewModel.create({
            title: "Tshirt ka review",
            comment: "This Tshrit is so nice, love the clor",
            rating: 5,
            reviewerName: "Dhruv Pandya",
            status: "approved",
            isVerifiedPurchase: true
        })
        console.log("Review created!!");

        console.log(createReview);

    }
    catch (err) {
        console.log(err.message);
    }
})