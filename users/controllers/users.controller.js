const Joi = require("joi");
const env = require('../../common/config/env.config');
const { v4: uuid } = require("uuid");
const { sendEmail } = require("../../helpers/mailler");
const User = require("../../users/models/users.model");
const schemaValidation=require("../middleware/requestValidation")

exports.insert = async(req, res) => {
    try {
    const result = schemaValidation.validate(req.body);
    if (result.error) {
      console.log(result.error.message);
      return res.json({
        error: true,
        status: 400,
        message: result.error.message,
      });
    }
        var user = await User.findOne({
            email: result.value.email,
          });
          if (user) {
            return res.json({
              error: true,
              message: "Email is already in use",
            });
          }
          if(result.value.password===''){
            let password = Math.floor(100000 + Math.random() * 900000);  //Generate random 6 digit code.  
            result.value.password=password;    
          }
          const hash = await User.hashPassword(result.value.password);
          const id = uuid(); //Generate unique id for the user.
          result.value.userId = id;
         result.value.password = hash;

         user.createUser(result.value)
       .then((result) => {
           res.status(201).send({id: result.userId});
       });

    }catch(error){
        
    }

 };

 exports.getById = (req, res) => {
    user.findById(req.params.userId).then((result) => {
        res.status(200).send(result);
    });
 };