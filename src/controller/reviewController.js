import reviewServices from "../services/reviewService.js";

const createReview = async (req, res) => {
    try {
        const { title, comment, rating, reviewerName } = req.body;
        const data = {
            title,
            comment,
            rating,
            reviewerName
        }
        const review = await reviewServices.createReview(data);
        return res.status(201).json({
            success: true,
            message: "Review created successfully",
            review: review
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            mssge: err.message
        })

    }
}

const getReviews = async (req, res) => {
    try {
        const { status, page = 1, limit = 10, sort = "ratingAsc" } = req.query;
        const data = {
            status,
            page,
            limit,
            sort
        }

        const reviews = await reviewServices.getReview(data);
        res.status(200).json({
            success: true,
            message: "review mil gaye, balle balle",
            reviews: reviews
        })
    }
    catch (err) {
        console.log(err);
        res.status(409).json({
            err: err.message
        })

    }
}

const getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await reviewServices.reviewById(id);
        res.status(200).json({
            review: review
        })
    }
    catch (err) {
        console.log(err);
        res.status(err.statusCode).json({
            err: err.message
        })
    }
}

// update review test karna baaki he abi
const updateReview = async (req, res) => {
    try {
        const updatedReview = await reviewServices.updateReview(req.params.id, req.body);
        return res.status(200).json({ success: true, reviewAfterUpdating: updatedReview })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const deleteReview = async (req, res) => {
    try {
        const deleteReview = await reviewServices.deleteReview(req.params.id);
        console.log(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Review deleted successfullyy",
            deletedReview: deleteReview
        })
    }
    catch (err) {
        console.log(err);
        return res.status(501).json({
            err: err.message
        })
    }

}

const approve = async (req, res) => {
    try {
        const approved = await reviewServices.approve(req.params.id);
        return res.status(200).json({
            "success": true,
            review: approved
        })
    }

    catch (err) {
        console.log(err);
        return res.status(err.statusCode).json({
            error: err.message
        })
    }
}




export const reviewController = {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview,
    approve
}