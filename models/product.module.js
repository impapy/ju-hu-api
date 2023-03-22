const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        
        name: { type: String, required: true, unique: true },
        arname: { type: String, default: "" },/////
        imagePath: { type: [String], required: true },
        category: { type: String, required: true },
        arcategory: { type: String, default: "" },////
        subcategory: { type: String},
        arsubcategory: {type: String,default: ""},
        description: { type: String , default: "Order From Jumia express items and get free shipping."},
        ardescription: { type: String,default: "" },//////
        price: { type: Number },
        countInStock: { type: Number, default: 1 },
        sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        isDeleted:{type: Boolean, default: false},
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model('Product', productSchema);