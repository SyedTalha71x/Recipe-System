const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, },
    role: { type: String, default: 'user' }
})

module.exports = mongoose.models.users || mongoose.model('users', UserSchema);