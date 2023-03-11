const { request, response } = require("express");
const { User, Category, Product } = require("../models");
const { ObjectId } = require('mongoose').Types;
const collections = [
    'users',
    'categories',
    'products',
    'roles'
];
const searchUser = async ( term = '', res = response ) => {
    const isMongoId = ObjectId.isValid( term );
    if ( isMongoId ) {
        const user = await User.findById( term );
        return res.status(200).json({
          results: user ? [ user ] : []
        });
    }
    const regExp = new RegExp( term, 'i' )
    const users = await User.find({
        $or: [
            {name : regExp},
            {email : regExp},
        ],
        $and: [ { status: true } ]
    });
    res.status(200).json({
        results: users
    });
}

const searchCategories = async ( term = '', res = response ) => {
    const isMongoId = ObjectId.isValid( term );
    if ( isMongoId ) {
        const category = await Category.findById( term );
        return res.status(200).json({
          results: category ? [ category ] : []
        });
    }
    const regExp = new RegExp( term, 'i' )
    const categories = await Category.find({
        $or: [
            {name : regExp},
        ],
        $and: [ { status: true } ]
    });
    res.status(200).json({
        results: categories
    });
}

const searchProducts = async ( term = '', res = response ) => {
    const isMongoId = ObjectId.isValid( term );
    if ( isMongoId ) {
        const product = await Product.findById( term ).populate('category', 'name');
        return res.status(200).json({
          results: product ? [ product ] : []
        });
    }
    const regExp = new RegExp( term, 'i' )
    const products = await Product.find({
        $or: [
            {name : regExp},
        ],
        $and: [ { status: true } ]
    }).populate('category', 'name');
    res.status(200).json({
        results: products
    });
}

const search = async ( req = request, res = response) => {
    try {
        const { collection, term } = req.params;
        if ( !collections.includes( collection ) ) {
           return res.status(400).json({
             msg: ` Collections allowed are:  ${ collections }`,
           });
        }

        switch (collection) {
            case 'users':    
                searchUser( term, res );
            break;
            case 'categories':    
                searchCategories( term, res );
            break;
            case 'products':    
                searchProducts( term, res );
            break;
            default:
                res.status(500).json({
                  msg: `I forgot to do this route: '${collection}'`,
                });
        }
    } catch (error) {
        res.status(500).json({
          error,
        });
    }
}

module.exports = {
    search
};