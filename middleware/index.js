const  validateFields = require('../middleware/validate-fields');
const  validateJWT = require('../middleware/validateJWT');
const  validateRole = require('../middleware/validateRole');


module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRole
};