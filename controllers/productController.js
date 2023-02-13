import { StatusCodes } from "http-status-codes";
import Product from "../models/product.js";
import CustomError from "../errors/index.js";

export const createProduct = async (req, res) => {
req.body.user = req.user.userId
const product = await Product.create(req.body);
res.status(StatusCodes.CREATED).json({product});
};
export const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({products,  count: products.length});
};
export const getSingleProduct = async (req, res) => {
  console.log(req.params);
//   const {id: productId} = req.params;
//   const product = await Product.findOne({_id: productId});
//   if(!product){
//     throw new CustomError.NotFoundError("There is no product with that id");
//   }
// res.status(StatusCodes.OK).json({product});
};
export const updateProduct = async (req, res) => {
    // const {id: productId} = req.params;
    // const product = await Product.findOneAndUpdate({_id: productId}, {
    //     new: true,
    //     runValidators: true
    // })
//   if(!product){
//     throw new CustomError.NotFoundError("There is no product with that id");
//   }
// res.status(StatusCodes.OK).json({product});
  res.send("createProduct");
};
export const deleteProduct = async (req, res) => {
    // const {id: productId} = req.params;
    // const product = await findOne({_id: productId});
    //   if(!product){
//     throw new CustomError.NotFoundError("There is no product with that id");
//   }
// await product.remove();
// res.status(StatusCodes.OK).json({msg: "product deleted sucessfully"});
  res.send("createProduct");
};
export const uploadImage = async (req, res) => {
  res.send("createProduct");
};


