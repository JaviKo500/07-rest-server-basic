const path = require('path');
const fs = require('fs');
const { request, response } = require('express');
const { uploadFile } = require('../helpers');
const { User, Product } = require('../models');


const loadFile = async (req= request, res =response) => {
    try {
        // const nameFile =  await uploadFile( req.files, ['jpeg', 'jpg'], 'text' );
        // const nameFile =  await uploadFile( req.files );
        const nameFile =  await uploadFile( req.files, undefined, 'img' );
        res.status(200).json({
          msg: nameFile,
        });        
    } catch (error) {
        console.log(error);
        res.status(400).json({
          error,
        });
    }
}

const updateFile = async ( req = request,  res = response ) => {
  try {
    const { id, collection } = req.params;
    let model;
    switch ( collection ) {
      case 'users':
        model = await User.findById(id);
        if( !model ) return res.status(400).json({
          msg: 'Not exist this user',
        });
      break;
      case 'products':
        model = await Product.findById(id);
        if( !model ) return res.status(400).json({
          msg: 'Not exist this product',
        });
      break;
      default:
        return res.status(500).json({
          msg: `I forgot valid this ${collection}`,
        });
    }

    // delete previous image
    
    if ( model.picture ) {
      const picturePath = path.join( __dirname, '../uploads', collection, model.picture );
      if ( fs.existsSync(picturePath) ) {
        fs.unlinkSync( picturePath );
      }
    }

    const picture = await uploadFile( req.files, undefined, collection);
    model.picture = picture;
    await model.save();
    res.status(200).json({
      model
    });
  } catch (error) {
    res.status(400).json({
      error: error.toString(),
    });
  }
}

const getFile = async (req = request, res =  response) => {
  try {
    const { collection, id } = req.params; 
    let model;
    const placeholderPath = path.join( __dirname, '../assets', 'no-image.jpg' );
    const existPlaceholder = fs.existsSync(placeholderPath);
    console.log(existPlaceholder);
    switch ( collection ) {
      case 'users':
        model = await User.findById(id);
        if( !model && existPlaceholder ) {
          return res.sendFile( placeholderPath );
        }
        break;
      case 'products':
        model = await Product.findById(id);
        if( !model && existPlaceholder ) {
          return res.sendFile( placeholderPath );
        }
        break;
      default:
        if( existPlaceholder ) {
          return res.sendFile( placeholderPath );
        } 
        throw new Error('Not implement image');
    }

    //* verification image
    
    if ( model.picture ) {
      const picturePath = path.join( __dirname, '../uploads', collection, model.picture );
      if ( fs.existsSync(picturePath) ) {
        return res.sendFile( picturePath );
      }
    }

    if ( existPlaceholder) {
      return res.sendFile( placeholderPath );
    }
    throw new Error('Not implement image');
  } catch (error) {
    res.status(400).json({
      error: error.toString(),
    });
  }
}

module.exports = {
  loadFile,
  updateFile,
  getFile
}