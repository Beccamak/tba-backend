import mongoose from "mongoose";



const ProductSchema = new mongoose.Schema({
        name:{
            type: String,
            required: [true, "Enter product name"]
        },
        price:{
            type: Number,
            required: [true, "Enter product name"]
        },
        inventory:{
            type: Number,
            required: [true, "Enter product quantity"],
            default: 1
        },
       imgUrl:{
            type: String,
            required: [true, "Enter product name"]
        },
        mainCategory: {
            type: String,
        enum: ["Fashion", "Beauty", "Hair", "Lifestyle"],
        required: [true, "Each product needs to have a main category"]
            
        },
        subCategory: {
            type: String,
        enum: ["Women", 
            "Men",
            "Jewelry",
            "make up",
           "foundation",
            "High Jewelry",
           " Watches",
           "Fragrances",],
        required: [true, "Each product needs to have a sub category"]
        },
        category: {
            type: String,
        enum: ["lip gloss", 
            "Men",
            "Jewelry",
            "make up",
           "foundation",
            "High Jewelry",
           " Watches",
           " Fragrances",],
        required: [true, "Each product needs to have a category"]
        },
        sku:{
            type: String,
            required: [true, "Enter product name"]
        },
        averageRating: {
            type: Number,
            default: 0,
        },
        numOfReviews: {
            type: Number,
            default: 0
        },
        description:{
            type: String,
            required: [true, "Enter product name"]
        },
         features:{
            type: [String],
            required: [true, "Enter product name"]
        },
        specifications:{
            type: [String],
            required: [true, "Enter product name"]
        },
        delivery:{
            type: [String],
            required: [true, "Enter product name"]
        },
        colors:{
            type: [String],
            required: [true, "Enter product name"]
        },
        flashSale:{
            type: Boolean,
            required: [true, "Enter product name"],
            default: false
        },
        discount:{
            type: Number,
            required: [true, "Enter product name"]
        },
        brand:{
            type: String,
            required: [true, "Enter product name"]
        },
        freeShipping: {
            type: Boolean,
            default: false,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        }

    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
    )

const Product = mongoose.model("Product", ProductSchema)
export default Product;