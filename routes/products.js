const { Router } = require('express');
const { check } = require('express-validator');
const { getProducts, getProduct, addProduct, deleteProduct, updateProduct } = require('../controllers/products');
const { existProductName, existProduct } = require('../helpers/db-validators');
const { validateJWT, validateFields, hasRole } = require('../middleware');

const router = Router();


router.get( '/', getProducts);
router.get( '/:id', [
        check('id', 'Invalid id').isMongoId(),
        check( 'id' ).custom( existProduct ),
        validateFields
    ], 
    getProduct
);
router.post( '/', [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        check('category', 'Category is required').not().isEmpty(),
        check('category', 'Category is invalid').isMongoId(),
        check('name').custom( existProductName ),
        validateFields
    ], 
    addProduct
);
router.put( '/:id', [
        validateJWT,
        hasRole( 'ADMIN_ROLE' ),
        check('id', 'Invalid id').isMongoId(),
        check('status', 'Status is required').not().isEmpty(),
        check('category', 'Category is required').not().isEmpty(),
        check('category', 'Category is invalid').isMongoId(),
        check( 'id' ).custom( existProduct ),
        check('name').custom( existProductName ),
        validateFields
    ], 
    updateProduct
);
router.delete( '/:id', [
        validateJWT,
        hasRole('ADMIN_ROLE'),
        check('id', 'Invalid id').isMongoId(),
        check( 'id' ).custom( existProduct ),
        validateFields
    ], 
    deleteProduct
);

module.exports = router;