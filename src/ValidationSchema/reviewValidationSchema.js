import z from "zod"
import mongoose from "mongoose";

// createReview api
const createReviewSchema = z.object({
    title: z.string().trim().min(3).max(80),
    comment: z.string().trim().min(10).max(500),
    rating: z.coerce.number().min(1).max(5).refine((value) => Number.isInteger(value), {
        message: "Rating must be an integer"
    }),
    reviewerName: z.string().min(2).max(50).trim(),
})

// getReview api
const getReviewsSchema = z.object({
    status: z.enum(["pending", "approved", "rejected"], {
        message: "Invalid status"
    }).optional(),
    minRating: z.coerce.number().int().min(1).max(5).optional(),
    sort:z.string().default("ratingDesc").optional(),
    page: z.coerce.number().int().min(1).default(1).optional(),
    limit: z.coerce.number().int().min(1).max(20).default(10).optional()
})

// getReviewById
const reviewIdSchema = z.object({
    id: z.string().refine(
        (value) => mongoose.isValidObjectId(value),
        {
            message: "Invalid mongo Db Id"
        }
    )
});

// updateReview
const updateReviewSchema = z.object({
    title: z.string().trim().min(3).max(80).optional(),
    comment: z.string().trim().min(10).max(500).optional(),
    rating: z.number().int().min(1).max(5).optional(),
    reviewerName: z.string().min(2).max(50).trim().optional(),
}).refine(
    (data) => Object.keys(data).length > 0, {
    message: "At least one field to bharoooo "
}
)


export {
    createReviewSchema,
    getReviewsSchema,
    reviewIdSchema,
    updateReviewSchema
}