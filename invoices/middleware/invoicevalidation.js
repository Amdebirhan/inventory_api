const joi = require("@hapi/joi")
const { validation_schema } = require("./invoicevalidationschema")

exports.datavalidation = async (req, res) => {
    
    const result = await validation_schema.validate(req.body);
        if(result.error){
            res.json({
                success: 0,
                message: value.error.details[0].message
            })
        } else{
            next()
        }
    }