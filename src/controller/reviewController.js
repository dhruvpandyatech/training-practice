import reviewServices from "../services/reviewService.js";

const createReview = async (req, res) => {
    
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


const getReviews = async (req, res) => {
    
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


const getReviewById = async (req, res) => {

        const { id } = req.params;
        const review = await reviewServices.reviewById(id);
        res.status(200).json({
            review: review
        })
}

// update review test karna baaki he abi
const updateReview = async (req, res) => {

        const updatedReview = await reviewServices.updateReview(req.params.id, req.body);
        return res.status(200).json({ success: true, reviewAfterUpdating: updatedReview })
}

const deleteReview = async (req, res) => {
    
        const deleteReview = await reviewServices.deleteReview(req.params.id);
        console.log(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Review deleted successfullyy",
            deletedReview: deleteReview
        })
}

const approve = async (req, res) => {

        const approved = await reviewServices.approve(req.params.id);
        return res.status(200).json({
            "success": true,
            review: approved
        })
}




export const reviewController = {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview,
    approve
}