const { request, response } = require("express");
const {Category} = require('../models');
const addCategory = async (req= request, res = response) => {
    try {
        const name = req.body.name.toUpperCase();
        console.log(name);
        const categoryDB = await Category.findOne( { name } );
        console.log(categoryDB);
        if ( categoryDB ) return res.status(400).json({
            msg: `Category ${categoryDB.name}, exist`,
        });
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
        console.log(error);
        res.status(500).json({
          msg: `${error.toString()}`,
        });
    }
}

module.exports = {
    addCategory
};