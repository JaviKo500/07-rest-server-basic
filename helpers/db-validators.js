const { Category, Product } = require('../models');
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

const existCategory = async ( id = '' ) => {
    try {
        const categoryExist = await Category.findById( id );
        if ( !categoryExist ) {
            throw new Error(`The category with id '${ id }' doesn't exist`)
        }
    } catch (error) {
        throw new Error(`This isn't a valid Mongoose ID`);
    }
}

const existCategoryName = async ( name = '') => {
    name = name.toUpperCase();
    const exitsName = await Category.findOne( { name } );
    console.log(exitsName);
    if( exitsName ) {
        throw new Error( `Name: ${name} exist` );
    }
}

const existProduct = async ( id = '' ) => {
    try {
        const productExist = await Product.findById( id );
        if ( !productExist ) {
            throw new Error(`The product with id '${ id }' doesn't exist`)
        }
    } catch (error) {
        throw new Error(`This isn't a valid Mongoose ID`);
    }
}

const existProductName = async ( name = '') => {
    name = name?.toUpperCase();
    const exitsName = await Product.findOne( { name } );
    console.log(exitsName);
    if( exitsName ) {
        throw new Error( `Name: ${name} exist` );
    }
}

const allowedCollections = ( collection=  '', allowedCollections = []) => {
    if ( !allowedCollections.includes( collection ) ) {
        throw new Error( `Allowed collections: ${allowedCollections}` );
    }
    return true;
}

module.exports = {
    isValidRol,
    existEmail,
    existUserById,
    existCategory,
    existCategoryName,
    existProduct,
    existProductName,
    allowedCollections
};