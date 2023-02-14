const { response } = require("express");
const User = require('../models/user');
const bcryptjs = require('bcrypt');
const { generateJWT } = require("../helpers/generateJWT");
const login = async (req, res= response) => {
    const { email, password } =  req.body;
    try {
        const user = await User.findOne( { email } );
        if( !user ) return res.status(400).json({
          msg: 'User/ password invalid',
        }); 
        if( !user.status ) return res.status(400).json({
          msg: 'User/ password invalid / status == false',
        });
        const validPassword = bcryptjs.compareSync( password, user.password );
        if( !validPassword ) return res.status(200).json({
          msg: 'User/ password invalid',
        });
        const token = await generateJWT( user.id );
        res.status(200).json({
          msg: 'Login ok',
          token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
          msg: `login: ${error.toString()}`,
        });
    }
}

module.exports = {
    login   
}