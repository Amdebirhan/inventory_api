const roleModel = require('../../privilages/Role/model/role.model');
const privilageModel = require('../../privilages/Resource/model/resource.model')
const defaultPrivilages=require('../../privilages/helper/privilageRoutes');
const resourceController = require('../../privilages/Resource/controller/resource.controller');
const roleController = require('../../privilages/Role/controller/role.controller');


exports.assignRole=async (req,res)=>{
    //assign an admin role for first time users when they sign up
    const result = {
        roleName:req.roleName
    };
    roleSchema=await roleModel.findByName(result.roleName);
    //if there is no role in our role model insert this role to the database with the default privilages
    if (roleSchema === null) {
        roleModel.createRole(result);
        roleSchema=await roleModel.findByName(result.roleName); //find role and grab the role data
        return roleSchema._id;
      }else if(roleSchema !==null){ //if there is a role find privilages from db which is assign to the admin and give to the user
          return roleSchema._id;
      }
  }

  exports.assignPrivilages=async (roleId)=>{
      privilageSchema = await privilageModel.findByRoleId(roleId);
      if(privilageSchema === null){
        const adminPrivilage ={
            roleId:roleId,
            url:defaultPrivilages.admulUrls,
        }
        privilageModel.createResource(adminPrivilage);
      }
      privilageSchema = await privilageModel.findByRoleId(roleId);
      for (let i = 0; i < privilageSchema.url.length; i++) {
        delete privilageSchema.url[i]._id;
      } 
      return privilageSchema.url;
  }