const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middleware');
const { validateFields } = require('../middleware/validate-fields');

const router = Router();
router.post('/login',[
    check( 'email', 'Email is required' ).isEmail(),
    check( 'password', ' Password is required' ).not().isEmpty(),
    validateFields
], login );

router.post('/google', [
    check( 'id_token', 'id_token google is required').not().isEmpty(),
    validateFields
], googleSingIn);


router.get( '/', [
    validateJWT
], renewToken )
module.exports = router;
