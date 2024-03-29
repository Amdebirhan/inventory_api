const roleModel= require('../model/role.model');
const { v4: uuid } = require("uuid");
  const Joi = require("joi");

  const roleSchema = Joi.object().keys({
    roleName: Joi.string().min(3).max(30).required(),
    }).unknown();

    
          
exports.insert =async (req, res) => {
     try{
      console.log(req.body);
    //      const result =roleSchema.validate(req.body);
    //      console.log(result);
    //  if (result.error) {
    //    console.log(result.error.message);
    //    return res.json({
    //      error: true,
    //      status: 400,
    //     message: result.error.message,
    //    });

    //  }
    //Check if the role has been already registered.
    var roleSchema = await roleModel.findOne({
        roleName: req.body.roleName,
      });
      if (roleSchema) {
        return res.json({
          error: true,
          message: "role  already exist",
        });
      }
      roleModel.createRole(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });


    }catch(error){
      return res.status(500).json({
        error: true,
        message: "Cannot insert role",
      });
    }
    

        
 };

 exports.getById = (req, res) => {
    roleModel.findById(req.params.roleId).then((result) => {
        res.status(200).send(result);
    });
 };


 exports.patchById = (req, res) => {
     
    const result = roleSchema.validate(req.body);
    if (result.error) {
      console.log(result.error.message);
      return res.json({
        error: true,
        status: 400,
        message: result.error.message,
      });

    }

    roleModel.patchUser(req.params.roleId, req.body).then((result) => {
            res.status(204).send({});
    });
 };


 exports.list = (req, res) => {
   
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    roleModel.list(limit, page)
        .then((result) => {
          delete result.__v;
            res.status(200).send(result);
        })
 };

 exports.removeById =async (req, res) => {

    //Check if there is a user assign to this role.
    var user = await roleModel.findOne({
        roleId: result.value.roleId,
      });
      if (user) {
        return res.json({
          error: true,
          message: "Tplease meake sure there isn't any user assign to this role.",
        });
      }

    roleModel.removeById(req.params.roleId)
        .then((result)=>{
            res.status(204).send({});
        });
 };