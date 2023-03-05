const { Schema, model} = require('mongoose');

const CategorySchema = Schema( {
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
    }
});

CategorySchema.methods.toJSON = function () {
    const {__v, _id: uuid, status, ...category} = this.toObject();
    return { uuid, ...category };
}
module.exports = model( 'Category', CategorySchema );