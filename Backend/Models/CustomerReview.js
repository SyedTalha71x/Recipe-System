const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    recipe_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    customer_id: { type: Number, required: true },
    text: { type: String, required: true },
    stars: { type: Number, required: true },
    time: { type: Number, required: true },
})

module.exports = mongoose.models.reviews || mongoose.model('reviews', CustomerSchema);