const { Router } = require('express');
const { check } = require('express-validator');
const { addCategory, getCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/categories');
const { existCategory, existCategoryName } = require('../helpers/db-validators');
const { validateJWT, validateFields, hasRole } = require('../middleware');


const router = Router();

/**
 * {{url}}/api/categories
 */

router.get( '/', getCategories);

router.get( '/:id', [
  check('id', 'Invalid id').isMongoId(),
  check('id').custom( existCategory ),
  validateFields
], getCategory);

router.post( '/', [
  validateJWT,
  check('name', 'Name is required').not().isEmpty(),
  check('name').custom( existCategoryName ),
  validateFields 
], addCategory);

router.put( '/:id', [
  validateJWT,
  hasRole( 'ADMIN_ROLE' ),
  check('id', 'Invalid id').isMongoId(),
  check( 'id' ).custom( existCategory ),
  check('name', 'Name is required').not().isEmpty(),
  check('name').custom( existCategoryName ),
  validateFields
], updateCategory);

router.delete( '/:id', [
  validateJWT,
  hasRole( 'ADMIN_ROLE'),
  check('id', 'Invalid id').isMongoId(),
  check( 'id' ).custom( existCategory ),
  validateFields
], deleteCategory);

module.exports = router;