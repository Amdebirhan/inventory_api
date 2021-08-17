const joi = require("@hapi/joi")
const organizationalProfileModel = require("../models/organizationalProfile.models");
const warehouseModel=require("../../warehouse/models/warehouse.models");
const branchModel = require("../../branch/models/branch.models");
const  itemModel= require("../../item/models/item.models")

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

const validation_schema = joi.object({
    contact_email: joi.string().email(),
    contact_phone_no: joi.number().integer().min(0000000000).message("Invalid Phone Number!").required(),
    country: joi.string().max(50),
    }).unknown();


//check if there is a warehouse branch and item inside the organization if there is then give 30 days else just delete it

exports.deletePrecondition = async(req,res)=>{
    //check if there is no warehouse
    warehouses=warehouseModel.findOne({organization_ID:req.body.organizationId});
    branches=branchModel.findOne({organizational_ID:req.body.organizationId});
    items=itemModel.findOne({organization_ID:req.body.organizationId});
    if(warehouses === null && branches === null && items ===null){
        organizationalProfileSchema.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
    }else{

    }

}
