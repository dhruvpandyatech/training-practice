import reviewModel from "../models/reviewModel.js";
const createReview = async (data) => {
    try {
        const { reviewerName, title } = data;
        const alreadyReviewed = await reviewModel.findOne({ reviewerName, title });
        if (alreadyReviewed) {
            throw new Error("pehle review de diya he bhai saaab");
        }
        const review = await reviewModel.create(data);
        return review;
    }
    catch (err) {
        throw err
    }
}


const getReview = async (data) => {
    try {
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
    catch (err) {
        throw err;
    }
}

const reviewById = async (data) => {
    try {
        const id = data;
        const review = await reviewModel.findById(id);
        if (!review) {
            throw new Error("Review not found");
        }
        return review;
    }
    catch (err) {
        throw err;
    }
}
// existance check karni he
const updateReview = async (id, data) => {
    try {
        const updatedReview = await reviewModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!updatedReview) {
            throw new Error("Review not found");
        }
        return updatedReview;
    }
    catch (err) {
        throw err
    }
}

// existance check karni he
const deleteReview = async (id) => {
    try {
        const deletedReview = await reviewModel.findByIdAndDelete(id);
        if (!deletedReview) {
            throw new Error("Review not found");
        }
        return deletedReview;
    }
    catch (err) {
        throw err;
    }
}

const reviewServices = {
    createReview,
    getReview,
    reviewById,
    updateReview,
    deleteReview
}
export default reviewServices;