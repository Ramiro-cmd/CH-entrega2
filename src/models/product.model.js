import mongoose from "mongoose"

const productCollection = "productos"

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    stock: {
        type: Number,
        default: 0
    },
    category: String,
    thumbnails: {
        type: [String],
        default: []
    }

})

const productModel = mongoose.model(productCollection, productSchema)

export default productModel