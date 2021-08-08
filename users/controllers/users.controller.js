const User = require("../models/users.model");
const schemaValidation = require("../middleware/requestValidation");
const rights = require('../../authorization/middlewares/SignupRoleAndPrivilages');

exports.insert = async (req, res) => {
  try {
    
    const result =req.body;
    if (result.error) {
      return res.json({
        error: true,
        status: 400,
        message: result.error.message,
      });
    }
    var user = await User.findOne({
      email: result.email,
    });
    if (user) {
      return res.json({
        error: true,
        message: "Email is already in use",
      });
    }
    if (result.password === '') {
      let password = Math.random().toString(36).slice(-8);//Math.floor(100000 + Math.random() * 900000);  //Generate random 6 digit code.  
      result.password = password;
    }
    
    unhashedPassword=result.password;
    const hash = await User.hashPassword(result.password);
    result.password = hash;
    result.active= true;
    
    result.privilages =await rights.assignPrivilages(result.roleId);
    //console.log( result.privilages );
    //console.log( result);
    User.createUser(result)
      .then((result) => {
        res.status(201).send({ password: unhashedPassword });
      });

  } catch (error) {

  }

};

exports.getById = (req, res) => {
  User.findById(req.params.userId).then((result) => {
    res.status(200).send(result);
  });
};


exports.updatePrivilage=(req,res)=>{
   //grant permission
}

exports.assignPrivilage=(req,res)=>{
  //assign new privilages
}

exports.denyPrivilage=(req,res)=>{
  //remove privilages  
}