const resourceModel= require('../model/resource.model');
const defaultroutes= require('../../helper/registerdUrls');
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
    fooArray = Object.entries(defaultroutes.auth);

fooArray.forEach(([key, value]) => {
    req.body.right.url.path=[key];
    req.body.right.url.name=[value];
    console.log(req.body.right.url.path);
    console.log(req.body.right.url.name);
})
    

    // var resourceSchema = await resourceModel.findOne({
    //     url: { name:req.body.url}
    //   });
    //   if (resourceSchema) {
    //     return res.json({
    //       error: true,
    //       message: "resource already exist",
    //     });
    //   }

    console.log(req.body);
      resourceModel.createResource(req.body)
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
  