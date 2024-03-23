const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    state: { type: String, required: true },
    category: { type: String, required: true },
    ingredients: { type: [String], required: true },
    desc: { type: String, required: true },
    cookTime: { type: Number, required: true },
})

module.exports = mongoose.models.recipes || mongoose.model('recipes', RecipeSchema);