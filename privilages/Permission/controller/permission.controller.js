const permissionModel= require('../model/permission.model');
const { v4: uuid } = require("uuid");
  const Joi = require("joi");
          
exports.insert =async (req, res) => {
     try{
      
    //      const result =roleSchema.validate(req.body);
    //      //console.log(result);
    //  if (result.error) {
    //    console.log(result.error.message);
    //    return res.json({
    //      error: true,
    //      status: 400,
    //     message: result.error.message,
    //    });

    //  }
    //Check if the role has been already registered.
    var permissionSchema = await permissionModel.findOne({
        rights: { name:req.body.methodName}
      });
      if (permissionSchema) {
        return res.json({
          error: true,
          message: "right already exist",
        });
      }
      roleModel.createPermission(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });


    }catch(error){
      return res.status(500).json({
        error: true,
        message: "Cannot insert right",
      });
    }
    

        
 };


 exports.patchById = (req, res) => {
    roleModel.patchPermission(req.params.userId, req.body).then((result) => {
            res.status(204).send({});
    });
  };
  