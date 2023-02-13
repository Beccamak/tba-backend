import { createProduct,getAllProducts, getSingleProduct, updateProduct, deleteProduct, uploadImage } from "../controllers/productController.js";
import express from 'express';
import { authenticateUser, authorizePermissions } from "../middleware/authentication.js";

export const router = express.Router();

router.route("/createProduct").post(authenticateUser, authorizePermissions('admin'), createProduct);
router.route("/getAllProducts").get(getAllProducts);
router.route("/getSingleProduct").get(getSingleProduct);
router.route("/updateProduct").patch(authenticateUser, authorizePermissions('admin'), updateProduct);
router.route("/deleteProduct").delete(authenticateUser, authorizePermissions('admin'), deleteProduct);





// router
//     .route('/')
//     .post(authenticateUser, authorizePermissions('admin'), createProduct)
//     .get(getAllProducts)

// router.route('/uploadImage').post(authenticateUser, authorizePermissions('admin'), uploadImage)

// router.route('/:id')
//     .get(getSingleProduct)
//     .patch(authenticateUser, authorizePermissions('admin'), updateProduct)
//     .delete(authenticateUser, authorizePermissions('admin'), deleteProduct)

// router.route('/:id/reviews').get(getSingleProductReviews)

// module.exports = router


