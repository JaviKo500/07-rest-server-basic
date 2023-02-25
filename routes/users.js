const { Router } = require('express');
const { check } = require('express-validator');

const {usersGet, usersPost, usersDelete, usersPatch, usersPut} = require('../controllers/users');

const { validateFields, validateJWT, hasRole } = require('../middleware');

const { isValidRol, existEmail, existUserById } = require('../helpers/db-validators');

const router = Router();
router.get('/', usersGet);
router.put('/:id',[
    check('id', 'Invalid id').isMongoId(),
    check( 'id' ).custom( existUserById ),
    check( 'role' ).custom( isValidRol ),
    validateFields
], usersPut);
router.post('/', [
    check( 'name', 'Name is required' ).not().isEmpty(),
    check( 'password', 'Min length is 6 characters').isLength({ min: 6 }),
    check( 'email', 'Invalid email').isEmail(),
    // check( 'role', 'Invalid rol' ).isIn( [ 'ADMIN_ROLE', 'USER_ROLE'] ),
    check( 'role' ).custom( isValidRol ),
    check( 'email' ).custom( existEmail ),
    validateFields,
] , usersPost );
router.delete('/:id',[
    validateJWT,
    // isAdminRol,
    hasRole( 'ADMIN_ROLE', 'SALES_ROLE' ),
    check('id', 'Invalid id').isMongoId(),
    check( 'id' ).custom( existUserById ),
    validateFields
],usersDelete);
router.patch('/', usersPatch);
module.exports = router;