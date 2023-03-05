const { request, response } = require("express");
const {Category} = require('../models');

const getCategories = async (req = request, res = response ) => {
    try {
        const {limit = 5, since = 0} = req.query;
        const query = { status: true };
        const [ total, categories ] = await Promise.all([
            Category.countDocuments( query ),
            Category.find( query )
                .skip( Number( since ) )
                .limit( Number(limit) )
                .populate('user', 'name')
        ]);
        res.status(200).json({
          total,
          categories
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
          error,
        });
    }
}

const getCategory = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const category = await Category
            .findById(id)
            .populate('user', 'name'); 
        res.status(200).json({
          category,
        });
   } catch (error) {
        console.log(error);
        res.status(500).json({
          error,
        });
   }
}

const addCategory = async (req= request, res = response) => {
    try {
        const name = req.body.name.toUpperCase();
        const data = {
            name,
            user: req.userAuthenticated._id
        };

        const category = new Category( data );
        await category.save();
        res.status(200).json({
          msg: 'Add',
          category
        });
    } catch (error) {
        res.status(500).json({
          msg: `${error.toString()}`,
        });
    }
}

const updateCategory = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { _id, status, user, ...rest } = req.body;
        rest.user = req.userAuthenticated._id;
        rest.name = rest.name.toUpperCase();
        const categoryDB = await Category.findByIdAndUpdate( id, rest, { new: true } )
        res.status(200).json({
          categoryDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
          error,
        });
    }
}

const deleteCategory = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const categoryDB = await Category.findByIdAndUpdate( id, { status: false }, {new: true} );
        res.status(200).json({
          msg: 'delete category',
          categoryDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
          msg,
        });
    }
}
module.exports = {
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory
};