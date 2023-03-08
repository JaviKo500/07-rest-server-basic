const { Schema, model} = require('mongoose');

const ProductSchema = Schema( {
    name: {
        type: String,
        required: [ true, 'Name is required'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: [ true, 'Status is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Required Category']
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true
    }
});

ProductSchema.methods.toJSON = function () {
    const {__v, _id: uuid, status, ...product} = this.toObject();
    return { uuid, ...product };
}
module.exports = model( 'Product', ProductSchema );