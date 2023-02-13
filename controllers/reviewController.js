import Review from "../models/review.js";
import CustomError from '../errors/index.js';
import { StatusCodes } from "http-status-codes";
import checkPermissions from "../utils/checkPermissions.js";

export const createReview = async(req, res)=> {
    const {product: productId} = req.body
    const isValidProduct = await Product.findOne({_id: productId});
    if(!isValidProduct){
        throw new CustomError.NotFoundError(`No product with id : ${productId}`)
    }
    const alreadySubmitted = await Review.findOne({
        product: productId,
        user: req.user.userId
    })
    if(alreadySubmitted){
        throw new CustomError.BadRequestError("Review already submitted fro this product");
    }
    req.body.user = req.user.userId;
    const review = await Review.create(req.body)
    res.status(StatusCodes.OK).json({review});
}
export  const getAllReviews = async(req, res)=> {
    res.send("review")
//   const reviews = await Review.find({}).populate({
//     path: 'product',
//      select: 'name company price'
//   })
//   res.status(StatusCodes.OK).json({reviews, count: reviews.length});

}
export const getSingleReview = async(req, res)=> {
   res.send("Review getting statrtesd");
//    const {id: reviewId} = req.params;
//    const review = Review.findOne({_id: reviewId}).populate({
//        path: 'product',
//        select: 'name, company, price'
//    })
//    if(!review){
//        throw new CustomError.NotFoundError(`No review with the id; ${reviewId}`)
//    }
//    res.status(StatusCodes.OK).json({review})

}
export const updateReview = async(req, res)=> {
    res.send()
//   const {id: reviewId} = req.params;
//   const {rating, title, comment} = req.body
//   const review = await Review.findOneAndUpdate({_id: reviewId});
//   if(!review){
//     throw new CustomError.NotFoundError("No review with the id; ${reviewId}")
//   }
//   checkPermissions(req.user, review.user);
//   review.rating = rating;
//   review.title = title;
//   review.comment = comment;

//   await review.save();
//   res.status(StatusCodes.OK).json({review})
}
export const deleteReview = async (req, res) => {
    const { id: reviewId } = req.params
    const review = await Review.findOne({ _id: reviewId })
    if (!review) {
        throw new CustomError.NotFoundError(`No review with the id ${reviewId} `)
    }
    checkPermissions(req.user, review.user)
    await review.remove()
    res.status(StatusCodes.OK).json({ msg: `deleted successfully` })
}

const getSingleProductReviews = async (req, res) => {
    const { id: productId } = req.params
    const reviews = await Review.find({ product: productId })
    res.status(StatusCodes.OK).json({ reviews, count: reviews.length })
}