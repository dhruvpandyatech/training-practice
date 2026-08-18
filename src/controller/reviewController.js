import reviewServices from "../services/reviewService.js";

const createReview = async(req,res)=>{
    try{
        const {title,comment,rating,reviewerName} = req.body;
        const data = {
            title,
            comment,
            rating,
            reviewerName
        }
        const review = await reviewServices.createReview(data);
        return res.status(201).json({
            success:true,
            message:"Review created successfully",
            review:review
        })
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            mssge:err.message
        })
 
    }
}

const getReviews = async(req,res)=>{
    try{
    const {status,page = 1,limit=10,sort="ratingAsc"} = req.query;
    const data = {
        status,
        page,
        limit,
        sort
    }

    const reviews = await reviewServices.getReview(data);
    res.status(200).json({
        success:true,
        message:"review mil gaye, balle balle",
        reviews:reviews
    })
}
    catch(err)
    {
        console.log(err);
        res.status(409).json({
            err:err.message
        })
        
    }
}




export const reviewController = {
    createReview,
    getReviews,
    
}