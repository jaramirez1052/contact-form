const Joi = require('joi');

const phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

const MessageSchema = Joi.object({
    firstName: Joi
        .string()
        .min(5)
        .required(),
    lastName: Joi
        .string()
        .required(),
    email: Joi
        .string()
        .email()
        .required(),
    phone: Joi
        .string()
        .pattern(phonePattern)
        .required(),
    message: Joi
        .string()
        .min(8)
        .required()
})


module.exports = {
    MessageSchema
}