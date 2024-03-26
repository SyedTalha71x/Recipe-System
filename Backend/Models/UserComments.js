const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    text: { type: String, required: true },
    recipe_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    date: { type: String, default: Date.now },
});

module.exports = mongoose.models.comments || mongoose.model('comments', CommentSchema);
