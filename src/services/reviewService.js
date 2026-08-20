import mongoose from "mongoose";
import reviewModel from "../models/reviewModel.js";
const createReview = async (data) => {
    const { reviewerName, title } = data;
    const alreadyReviewed = await reviewModel.findOne({ reviewerName, title });
    if (alreadyReviewed) {
        throw new Error("pehle review de diya he bhai saaab");
    }
    const review = await reviewModel.create(data);
    return review;
}



const getReview = async (data) => {

    const { status, page, limit, sort } = data;
    const filter = {};
    if (status) {
        filter.status = status
    }
    const skip = (page - 1) * limit;
    // sorting nikal rhe he , asc or desc
    let sortBy;
    if (sort === "ratingDesc") {
        sortBy = { rating: -1 };
    }
    else {
        sortBy = { rating: 1 };
    }
    const [reviews, totalReviews] = await Promise.all([
        reviewModel.find(filter).sort(sortBy).skip(skip).limit(limit),
        reviewModel.countDocuments(filter)
    ]);

    return {
        reviews,
        totalReviews,
        page,
        limit
    }
}



const reviewById = async (id) => {

    const review = await reviewModel.findById(id);
    if (!review) {
        const error = new Error("Review not found");
        error.statusCode = 404;
        throw error;
    }
    return review;
}
// existance check karni he
const updateReview = async (id, data) => {

    console.log(id);
    console.log(typeof (id));

    console.log(data);


    const review = await reviewModel.findById(id);
    if (!review) {
        throw new Error(404);
    }

    if (data.title !== undefined) {
        review.title = data.title;
    }

    if (data.comment !== undefined) {
        review.comment = data.comment;
    }

    if (data.rating !== undefined) {
        review.rating = data.rating;
    }

    if (data.reviewerName !== undefined) {
        review.reviewerName = data.reviewerName;
    }

    await review.save();
    return review;
}


// existance check karni he
const deleteReview = async (id) => {

    const deletedReview = await reviewModel.findByIdAndDelete(id);


    if (!deletedReview) {
        throw new Error(404);
    }
    return deletedReview;
}

const approve = async (id) => {
    const review = await reviewModel.findById(id);
    console.log(review.status);
    
    if (review.status === "approved") {
        const error = new Error("Review is already approved");
        error.statusCode = 400;
        throw error;
    }
    else {
        review.status = "approved";
        review.save();
        return review;
    }
}

const reviewServices = {
    createReview,
    getReview,
    reviewById,
    updateReview,
    deleteReview,
    approve
}
export default reviewServices;