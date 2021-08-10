const roleModel = require('../../privilages/Role/model/role.model');
const privilageModel = require('../../privilages/Resource/model/resource.model')
const defaultPrivilages=require('../../privilages/helper/privilageRoutes');
const resourceController = require('../../privilages/Resource/controller/resource.controller');
const resourceModel = require('../../privilages/Resource/controller/resource.controller');


exports.assignRole=(role)=>{
    //assign an admin role for first time users when they sign up
    roleSchema=roleModel.findByName(role);
    //if there is no role in our role model insert this role to the database with the default privilages
    if (!roleSchema) {
        roleModel.create(role);
        resourceController.insert(defaultPrivilages);
        roleSchema=roleModel.findByName(role); //find role and grab the role data
        return roleSchema._id;
      }else if(roleSchema){ //if there is a role find privilages from db which is assign to the admin and give to the user
          return roleSchema._id;
      }
  }

  exports.assignPrivilages=async (roleId)=>{
      privilageSchema = await privilageModel.findByRoleId(roleId);
      for (let i = 0; i < privilageSchema.url.length; i++) {
        delete privilageSchema.url[i]._id;
      } 
      return privilageSchema.url;
  }