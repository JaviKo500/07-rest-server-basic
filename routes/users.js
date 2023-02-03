const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role');   
const {usersGet, usersPost, usersDelete, usersPatch, usersPut} = require('../controllers/users');
const { validateFields } = require('../middleware/validate-fields');
const router = Router();
router.get('/', usersGet);
router.put('/:id', usersPut);
router.post('/', [
    check( 'name', 'Name is required' ).not().isEmpty(),
    check( 'password', 'Min length is 6 characters').isLength({ min: 6 }),
    check( 'email', 'Invalid email').isEmail(),
    // check( 'role', 'Invalid rol' ).isIn( [ 'ADMIN_ROLE', 'USER_ROLE'] ),
    check( 'role' ).custom( async (role = '') => {
        const existRole = await Role.findOne( {role} );
        if ( !existRole ) {
            throw new Error( `Role: ${role} is not register` )
        }
    }),
    validateFields,
] , usersPost );
router.delete('/:id', usersDelete);
router.patch('/', usersPatch);
module.exports = router;