import reviewModel from "../models/reviewModel.js";
const createReview = async(data)=>{
    try{
        const{reviewerName,title} = data;
        const alreadyReviewed = await reviewModel.findOne({reviewerName,title});
        if(alreadyReviewed)
        {
            throw new Error("pehle review de diya he bhai saaab");
        }
        const review = await reviewModel.create(data);
        return review;
    }
    catch(err){
        throw err
    }
}


const getReview = async(data)=>{
    try{
        const {status,page,limit,sort} = data;
        const filter = {};
        if(status){
            filter.status = status
        }
        const skip = (page-1)*limit;
        // sorting nikal rhe he , asc or desc
        let sortBy;
        if(sort === "ratingDesc")
        {
            sort = -1
        }
        else
        {
            sort = 1
        }
        const [reviews,totalReviews] = await Promise.all([
            reviewModel.find(filter).sort(sort).skip(skip).limit(limit),
            reviewModel.countDocuments(filter)
        ]);

        return {
            reviews,
            totalReviews,
            page,
            limit
        }
        
    }
    catch(err)
    {
        throw err;
    }
}



const reviewServices = {
    createReview,
    getReview,
    
}
export default reviewServices;