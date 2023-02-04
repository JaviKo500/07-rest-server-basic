const Role = require('../models/role'); 
const User = require('../models/user');

const isValidRol = async (role = '') => {
    const existRole = await Role.findOne( {role} );
    if ( !existRole ) {
        throw new Error( `Role: ${role} is not register` );
    }
};

const existEmail = async ( email= '') => {
    const exitsEmail = await User.findOne( { email } );
    if( exitsEmail ) {
        throw new Error( `Email: ${email} exist` );
    }
}
const existUserById = async ( id = '') => {
    try {
        const userExist = await User.findById(id);
        if ( !userExist ) {
            throw new Error(`The user with ID '${ id }' doesn't exist`);
        }
    } catch (error) {
        throw new Error(`This isn't a valid Mongoose ID`);
    }
}
module.exports = {
    isValidRol,
    existEmail,
    existUserById
};