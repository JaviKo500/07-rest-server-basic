const { Router } = require('express');
const { check } = require('express-validator');
const { loadFile } = require('../controllers/uploads');
const { validateFields } = require('../middleware/validate-fields');

const router = Router();

router.post('/', [
    
    validateFields
], loadFile)

module.exports = router;
