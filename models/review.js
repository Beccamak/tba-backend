import mongoose from 'mongoose';


const ReviewSchema = new mongoose.Schema({
    rating:{
        type: Number,
        min: 1,
        max: 5,
        required: [true]
    },
    title:{
        type: String,
        trim: true,
        required: [true, 'Please provide review title'],
        maxlength: 100
    },
    comment: {
        type: String,
        required: [true]
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    }
},  { timestamps: true }
)

ReviewSchema.index({product: 1, user: 1}, {unique: true});

ReviewSchema.statics.calculateAverageRating = async(productId) => {
    const result = await this.aggregate([
        {$match: {product: productId}},
        {
            $group:{
                _id: null, averageRating: {$avg: '$rating'},
                numOfReviews: {$sum: 1}
            }
        }
    ])
    console.log(result);
    try {
        await this.model('Product').findOneAndUpdate({ _id: productId }, {
            averageRating: Math.ceil(result[0]?.averageRating || 0),
            numOfReviews: Math.ceil(result[0]?.numOfReviews || 0),

        })
    } catch (error) {
        console.log(error);
    }
}
ReviewSchema.post('save', async function () {
    await this.constructor.calculateAverageRating(this.product);
})
ReviewSchema.post('remove', async function () {
    await this.constructor.calculateAverageRating(this.product)
})

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
