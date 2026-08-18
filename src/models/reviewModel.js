import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minLength: 3,
        maxLength: 80,
        trim: true
    },
    comment: {
        type: String,
        required: [true, "Comment is required"],
        minLength: 10,
        maxLength: 500,
        trim: true,
        validate: {
            validator: (value) => {
                return (value.length > 0)
            },
            message: "comment value can not be empty space"
        }
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: 1,
        max: 5,
        validate: {
            validator: (value) => {
                return Number.isInteger(value) && value >= 1 && value <= 5;
            },
            message: "Rating must be between 1 and 5"
        }
    },
    reviewerName: {
        type: String,
        required: [true, "Reviewer name is required"],
        minLength: 2,
        maxLength: 50,
        trim: true
    },
    status: {
        type: String,
        enum: {
            values: ["pending", "approved", "rejected"],
            message: (props) => {
                return `${props.value} is not a valid status`
            }
        },
        default: "pending"
    },


    isVerifiedPurchase: {
        type: Boolean,
        default: false
    },
    helpfullCount: {
        type: Number,
        default: 0,
        validate: {
            validator: (value) => {
                return value >= 0
            },
            message: "value should not be negative"
        }
    }

}, {
    timestamps: true
}
)


const reviewModel = mongoose.model("review", reviewSchema);

export default reviewModel;