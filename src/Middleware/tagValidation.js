const { body } = require('express-validator');

exports.tagValidation = [
    body('name').notEmpty().withMessage('Tag name is required')
];