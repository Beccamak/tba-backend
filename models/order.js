import mongoose from 'mongoose';

const singleOrderItemSchema = mongoose.Schema({
    name: { type: String, required: true },
    imgUrl: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    }
})
const OrderSchema = new mongoose.Schema({
    tax: {
        type: Number
    },
    shippingFee: { 
        type:Number},

  subtotal: { 
    type:Number
},
  total: { 
    type:Number
},
  orderItems:[singleOrderItemSchema],

  status: {
            type: String,
            enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
            default: 'pending'
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        clientSecret: {
            type: String,
            required: true
        },
        paymentIntentId: {
            type: String,
        },
    },
    { timestamps: true })


const Order = mongoose.model('Order', OrderSchema);
export default Order;