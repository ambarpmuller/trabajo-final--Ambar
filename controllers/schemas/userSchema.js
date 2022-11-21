const { check } = require('express-validator');

module.exports = [
    check('email')
        .exists().withMessage('The email is required')
        .notEmpty()
        .withMessage('The email is required')
        .custom((value, { req }) => value.includes("@") && value.includes(".com"))
        .withMessage('The email is required')

        , 


        check('password')
        .exists().withMessage('The password is required')
        .notEmpty().withMessage('The password is required')
        
]