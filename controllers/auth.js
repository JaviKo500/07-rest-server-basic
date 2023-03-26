const { response, request } = require("express");
const User = require('../models/user');
const bcryptjs = require('bcrypt');
const { generateJWT } = require("../helpers/generateJWT");
const { googleVerify } = require("../helpers/googleVerify");
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

const googleSingIn = async ( req = request, res = response ) => {
  const { id_token } = req.body;
  try {
    const { name, picture, email } = await googleVerify( id_token );
    let user = await User.findOne( { email } );
    if ( !user ) {
      const data = {
        name,
        email, 
        picture,
        password: ':P',
        google: true
      };
      user = new User( data );
      await user.save();
    } 

    if ( !user.status ) {
      return res.status(401).json({
        msg: 'Speak with administrator, user blocked',
      });
    }

    const token = await generateJWT( user.id );
    res.status(200).json({
      msg: 'Login ok',
      token,
      user
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: 'Error log in',
      error
    });
  }
}

const renewToken = async ( req= request, res = response ) => {
  const { userAuthenticated } = req;
  const token = await generateJWT( userAuthenticated.id );
    res.status(200).json({
      msg: 'new token',
      token,
      userAuthenticated
    });
}

module.exports = {
    login,
    googleSingIn,
    renewToken
}