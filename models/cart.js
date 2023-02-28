import mongoose from "mongoose";

const singlCartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required:true
    },
    quantity:{
        type: Number,
        required: true
    }

})
const CartItemsSchema = new mongoose.Schema({
    user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
},
  cartItems:[singlCartItemSchema]
})


const Cart = mongoose.model('Cart', CartItemsSchema);
export default Cart;