const organiizationalProfileModel = require("../../inventory/organizational_profile/models/organizationalProfile.models");

exports.verifyOrganization = (req, res) => {

    const organiization= await organiizationalProfileModel.findOne({
        active: true,
        delete_precondition: { $gt: Date.now() },//to check if the code is expires
      });

      if(organization === null){
        return res.status(400).json({
            error: true,
            message: "invalid detalis"
          });
      }else{
          next();
      }
 };

