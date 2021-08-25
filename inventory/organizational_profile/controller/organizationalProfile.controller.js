//get organization info
//insert organization info
// update organization info
//delete organization info in this case when we delete it must have no wh branch or item if there is 
//give them 1 month to contact us then delete the organization

const organizationalProfileModel = require("../models/organizationalProfile.models");

exports.getById = (req, res) => {
    organizationalProfileModel.findById(req.params.organizationId).then((result) => {
        res.status(200).send(result);
    });
 };


 exports.patchById = (req, res) => {
     console.log(req.body)
    organizationalProfileModel.patchUser(req.params.organizationId, req.body).then((result) => {
            res.status(204).send({});
    });
 };

 exports.removeById = (req, res) => {
    req.body.expiryTime =Date.today().add(30).days(); //Set expiry 30 days ahead from now
    req.body.status = false
    organizationalProfileModel.patchUser(req.params.organizationId, req.body).then((result) => {
        res.status(204).send({});
});
 };