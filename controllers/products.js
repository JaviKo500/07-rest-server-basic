const { request, response } = require('express');
const { Product } = require('../models');

const getProducts = async ( req =request, res = response ) => {
  try {
    const { limit = 5, since = 0 } = req.query;
    const query = { status: true };
    const [ total, products ] = await Promise.all([
      Product.countDocuments( query ),
      Product.find( query )
        .skip( Number( since ) )
        .limit( Number( limit ) )
        .populate( 'user', 'name' )
        .populate( 'category', 'name' )
    ]);
    res.status(200).json({
      total,
      products
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }    
}
const getProduct = async ( req =request, res = response ) => {
  try {
    const { id } = req.params;
    const product = await Product.findById( id )
      .populate('user', 'name')
      .populate('category', 'name')
    res.status(200).json({
      msg: 'getProducts',
      product
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }    
}
const addProduct = async ( req =request, res = response ) => {
  try {
    const { status, user, ...product } = req.body;
    product.name = product.name.toUpperCase();
    product.user = req.userAuthenticated._id;
    const productDB = new Product( product ); 
    await productDB.save();
    res.status(200).json({
      msg: 'getProducts',
      productDB
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }     
}
const updateProduct = async ( req =request, res = response ) => {
  try {
    const { id } = req.params;
    const { _id, status, user, ...data } = req.body;
    data.user =  req.userAuthenticated._id;
    if ( res.name ) {
      data.name = data?.name?.toUpperCase();
    }
    const productDB = await Product.findByIdAndUpdate( id, data, { new: true } );
    res.status(200).json({
      productDB
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }     
}
const deleteProduct = async ( req =request, res = response ) => {
  try {
    const { id } = req.params;
    const productDB = await Product.findByIdAndUpdate( id, { status: false }, { new: true } );
    res.status(200).json({
      productDB
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }    
}

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}