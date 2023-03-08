const { Router } = require('express');
const { check } = require('express-validator');
const { getProducts, getProduct, addProduct, deleteProduct, updateProduct } = require('../controllers/products');
const { existProductName } = require('../helpers/db-validators');
const { validateJWT, validateFields } = require('../middleware');

const router = Router();


router.get( '/', [

    ], 
    getProducts
);
router.get( '/:id', [
    
    ], 
    getProduct
);
router.post( '/', [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        check('status', 'Status is required').not().isEmpty(),
        check('category', 'Category is required').not().isEmpty(),
        check('category', 'Category is invalid').isMongoId(),
        check('name').custom( existProductName ),
        validateFields
    ], 
    addProduct
);
router.put( '/:id', [
    
    ], 
    updateProduct
);
router.delete( '/:id', [
    
    ], 
    deleteProduct
);

module.exports = router;