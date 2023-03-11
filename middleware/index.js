const  validateFields = require('../middleware/validate-fields');
const  validateJWT = require('../middleware/validateJWT');
const  validateRole = require('../middleware/validateRole');
const  validateFile = require('../middleware/validate-file');


module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRole,
    ...validateFile
};