const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const generateJWT = ( uuid = '' ) => {
    return new Promise(( resolve, reject ) => {
        const payload = { uuid };
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( error, token ) => {
            if ( error ) {
                console.log(error);
                reject('Not regenerate token');
            } else {
                resolve(token);
            }
        });
    });
}

const verifyJWT = async ( token = '' ) => {
    try {
        if ( token.length < 10) {
            return null;
        }
        const { uuid } =  jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const userDB = await User.findById( uuid );
        if ( userDB && userDB.status === true ) {
            return userDB;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

module.exports = {
    generateJWT,
    verifyJWT
}