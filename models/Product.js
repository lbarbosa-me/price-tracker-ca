const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    priceHistory: [{ 
        price: Number,
        date: { type: Date, default: Date.now }
    }],
    url: { type: String }, // URL do produto no e-commerce
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
