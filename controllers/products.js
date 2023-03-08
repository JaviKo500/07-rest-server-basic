const { request, response } = require('express');
const { Product } = require('../models');

const getProducts = async ( req =request, res = response ) => {
    try {
        const product = req.body;

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
const getProduct = async ( req =request, res = response ) => {
    try {
        const product = req.body;

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
        const product = req.body;
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
        const product = req.body;

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
const deleteProduct = async ( req =request, res = response ) => {
    try {
        const product = req.body;

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

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}