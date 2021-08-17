const joi = require("@hapi/joi")

exports.datavalidation = async (req, res) => {

    const result = await validation_schema.validate(req.body);
    if (result.error) {
        res.json({
            success: 0,
            message: value.error.details[0].message
        })
    } else {
        next()
    }
}

const validation_schema = joi.object({
    price: joi.number().required(),
    quantity: joi.number(),
    tax: joi.number(),
    }).unknown();


module.exports = validation_schema;



