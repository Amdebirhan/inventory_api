//get organization info
//insert organization info
// update organization info
//delete organization info in this case when we delete it must have no wh branch or item if there is 
//give them 1 month to contact us then delete the organization

const { date } = require("joi");
const organizationalProfileModel = require("../models/organizationalProfile.models");

exports.insert = (req, res) => {
    organizationalProfileModel.createOrganizationalProfile(req)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
 };

exports.getById = (req, res) => {
    organizationalProfileModel.findById(req.params.organizationId).then((result) => {
        res.status(200).send(result);
    });
 };


 exports.patchById = (req, res) => {
    organizationalProfileModel.patchOrganization(req.params.organizationId, req.body).then((result) => {
            res.status(204).send({});
    });
 };

 exports.removeById = (req, res) => {
    req.body.expiryTime = new date() + 30*24*60*60*1000;//Set expiry 30 days ahead from now
    console.log( req.body.expiryTime)
    //req.body.expiryTime.setDate(expiryTime.getDate()+30)
    //console.log( req.body.expiryTime)
    req.body.status = false;
    organizationalProfileModel.updateMany({ "_id": req.params.organizationId }, { "$set": { "active":  req.body.status  ,"delete_precondition":   req.body.expiryTime } }).then((result) => {
        res.status(204).send({});
});;
    
 };