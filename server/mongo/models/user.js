const 
mongooseDelete = require('mongoose-delete')
mongoose       = require('../config/config');
// Global      = require('../../global'),
// utcHr       = Global.utcHr;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
},
     { timestamps: true }
);

userSchema.plugin(mongooseDelete, { deletedAt : true });

module.exports = mongoose.model('User', userSchema);