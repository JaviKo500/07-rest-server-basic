const { Router } = require('express');
const { check } = require('express-validator');
const { loadFile, updateFile } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers');
const { validateFile } = require('../middleware');
const { validateFields } = require('../middleware/validate-fields');

const router = Router();

router.post('/', [validateFile], loadFile)
router.put('/:collection/:id', [
    validateFile,
    check( 'id', 'Invalid id' ).isMongoId(),
    check('collection').custom( collection => allowedCollections( collection, ['users', 'products'] ) ),
    validateFields
], updateFile);

module.exports = router;
