const { response, request } = require("express");
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if ( !token ) return res.status(400).json({
      msg: 'not token',
    }); 
    try {
        const { uuid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const userAuthenticated = await User.findById( uuid );

        // * user not exist

        if ( !userAuthenticated ) {
          return res.status(401).json({
            msg: 'Invalid token - not exist user in BD',
          });
        }

        if ( !userAuthenticated.status ) {
          return res.status(401).json({
            msg: 'Invalid token - user invalid',
          });
        }

        // * validate status user

        if ( !userAuthenticated.status ) {
          return res.status(401).json({
            msg: 'Invalid token - user invalid',
          });
        }

        req.userAuthenticated = userAuthenticated;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
          msg: 'Invalid token',
        });
    }
} 

module.exports = {
    validateJWT
};