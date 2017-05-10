const 
mongooseDelete = require('mongoose-delete')
mongoose       = require('../config/config');
// Global      = require('../../global'),
// utcHr       = Global.utcHr;

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    sequence: {type: String, required: true},
    price: {type: Number, required: true},
    remarks: String,
    // createdAt: {type: Date, default: () => +new Date + utcHr},
    // updatedAt: {type: Date, default: () => +new Date + utcHr},
    // deletedAt: {type: Date, default: null},
},
     { timestamps: true } // If set timestamps, mongoose assigns createdAt and updatedAt fields to your schema, the type assigned is Date.
);

orderSchema.plugin(mongooseDelete, { deletedAt : true });

module.exports = mongoose.model('Order', orderSchema);