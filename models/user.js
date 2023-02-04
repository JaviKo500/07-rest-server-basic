const { Schema, model } = require("mongoose");
const { use } = require("../routes/users");

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
    password: {
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
    const {__v, password, ...user} = this.toObject();
    return user;
};

module.exports = model( 'User', UserSchema );