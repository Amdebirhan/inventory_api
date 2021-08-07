const resourceModel= require('../model/resource.model');
const defaultroutes= require('../../helper/registerdUrls');
const { v4: uuid } = require("uuid");
  const Joi = require("joi");
          
exports.insert =async (req, res) => {
     try{
      const url = [...defaultroutes.simple, ...defaultroutes.admin];
      req.body.url=url;
      console.log(req.body.url);
    

    var resourceSchema = await resourceModel.findOne({
        url:req.body.url
      });
      if (resourceSchema) {
        return res.json({
          error: true,
          message: "resource already exist",
        });
      }

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

 exports.list = (req, res) => {

  let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  
  let page = 0;
  if (req.query) {
      if (req.query.page) {
          req.query.page = parseInt(req.query.page);
          page = Number.isInteger(req.query.page) ? req.query.page : 0;
      }
  }
  resourceModel.list(limit, page)
      .then((result) => {
        delete result.__v;
          res.status(200).send(result);
      })
 };


exports.geturlById = (req, res) => {
  resourceModel.findOne( 
    {'roleId':req.params.roleId}, 
    function(err, result) {
        if (err || !result || !result.url || !result.url.length) {
            res.json({result});
        } else {
            res.json(result);
        }
    }
  );
  //resourceModel.findurlById(req.params.resourceId)
};

exports.getPrivilageByRoleId = (req, res) => {
  resourceModel.findOne( 
    {'roleId':req.params.roleId}, 
    function(err, result) {
        if (err || !result || !result.url || !result.url.length) {
            res.json({result});
        } else {
            res.json(result);
        }
    }
  );
  //resourceModel.findurlById(req.params.resourceId)
};