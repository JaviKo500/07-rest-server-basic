const jwt = require('jsonwebtoken');
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

module.exports = {
    generateJWT
}