const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name: {
        type: String,
        require: [ true, 'Name is required' ]
    },
    email: {
        type: String,
        require: [ true, 'Email is required' ],
        unique:  true
    },
    password: {
        type: String,
        require: [ true, 'Password is required' ],
    },
    picture: {
        type: String,
    },
    role: {
        type: String,
        require: [ true, 'Role is required' ],
        emun: [ 'ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function () {
    const {__v, password, _id: uuid, ...user} = this.toObject();
    return { uuid, ...user};
};

module.exports = model( 'User', UserSchema );