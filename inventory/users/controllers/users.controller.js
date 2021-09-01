const User = require("../models/users.model");
const schemaValidation = require("../middleware/requestValidation");
const rights = require('../../../authorization/middlewares/SignupRoleAndPrivilages');
const privilages = require('../../privilages/helper/privilageRoutes');

exports.insert = async (req, res) => {
  try {

    const result = req.body;
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

    unhashedPassword = result.password;
    const hash = await User.hashPassword(result.password);
    result.password = hash;
    result.active = true;

    result.privilages = await rights.assignPrivilages(result.roleId);
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
exports.patchById = (req, res) => {
  User.patchUser(req.params.userId, req.body).then((result) => {
          res.status(204).send({});
  });
};

exports.assignPrivilage = async (req, res) => {
  //console.log(req.body.userId);
  //req.body.privilage = privilages.admulUrls;
  //console.log(req.body.privilage[0].right.deny);
  
  const result =User.function.removePermission(req.body.privilage,req.body.privilage[0].right.deny,true);


}
exports.list = (req, res) => {
  let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
      if (req.query.page) {
          req.query.page = parseInt(req.query.page);
          page = Number.isInteger(req.query.page) ? req.query.page : 0;
      }
  }
  User.list(limit, page).then((result) => {
      res.status(200).send(result);
  })
};

exports.removeById = (req, res) => {
  User.removeById(req.params.userId)
      .then((result)=>{
          res.status(204).send({});
      });
};

  //const result = User.updatePrivilage(req.body.userId,req.body.privilage);
  
  // User.updateMany({
  //   _id: req.body.userId
  // }, {
  //   $set: {
  //     "privilages.$[privilage].right": req.body.privilage,
  //   },
  // }, { arrayFilters: [{ "privilage.path": { $in:req.body.path } }], multi: true, upsert: true }, function (err, updatec) {
  //   if (err) {
  //     console.log(err); 
  //   }
  //   else {
  //     console.log("permission updated");
  //   }
  // })

  
//  console.log(result);
//   for(var i=0; i <= req.body.privilage.length ; i++){
//     //find the privilage with the path name if it exist change the privilage ealse insert it
//     const result = await User.findByName(req.body.privilage.path);
//     if(result){
//       //update privilage
//       User.updatePrivilage(req.body.userId,req.body.privilage[i].path,req.body.privilage[i].right)
//     }else{
//       //insert it
//     }

  //}

  

  