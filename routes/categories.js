const { Router } = require('express');
const { check } = require('express-validator');
const { addCategory } = require('../controllers/categories');
const { validateJWT, validateFields } = require('../middleware');


const router = Router();

/**
 * {{url}}/api/categories
 */

router.get( '/', ( req, res ) =>{
    res.status(200).json({
      msg: 'Ok',
    });
});
router.get( '/:id', ( req, res ) =>{
    res.status(200).json({
      msg: 'Ok id',
    });
});
router.post( '/', [
  validateJWT,
  check('name', 'Name is required').not().isEmpty(),
  validateFields 
], addCategory);
router.put( '/:id', ( req, res ) =>{
    res.status(200).json({
      msg: 'Ok put',
    });
});
router.delete( '/:id', ( req, res ) =>{
    res.status(200).json({
      msg: 'Ok delete',
    });
});
module.exports = router;