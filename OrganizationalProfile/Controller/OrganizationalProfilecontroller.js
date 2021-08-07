const { response } = require('express')
const OrganizationalProfilemodel = require('../models/OrganizationalProfilemodel')
exports.DisplayOrganizationalProfile = async (req, res) => {
    OrganizationalProfilemodel.find()
    .then(response => {
        res.json({
            response
    })
})
    .catch(error => {
        res.json({
            message: 'An error Occurs!'
        })
    })
};
// search by ID (Show single OrganizationalProfile)
exports.SearchOrganizationalProfile = async (req, res) => {
    let organization_ID = req.body.organization_ID
    OrganizationalProfilemodel.findById(organization_ID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occurs!'
        })
    })
}
// Add new Organization
exports.AddOrganizationalProfile = async (req, res) => {
        const OrganizationalProfile = new OrganizationalProfilemodel({
            organization_ID: req.body.organization_ID,
            organization_Name: req.body.organization_Name,
            contact_first_name: req.body.contact_first_name,
            contact_last_name: req.body.contact_last_name,
            contact_email: req.body.contact_email,
            buesiness_location: req.body.buesiness_location,
            zip_code: req.body.zip_code,
            contact_phone_no: req.body.contact_phone_no,
            country:req.body.country,
            state: req.body.state,
            city: req.body.city,
            stret1: req.body.stret1
        });
        OrganizationalProfile.save()
        .then(data => {
            res.json(data)
            })
        .catch(error => {
            res.json({
                message: 'An error occurs!'
            });
        }); 
    }
    // Update OrganizationalProfile using ID
  exports.UpdateOrganizationalProfile = async (req, res) => {
    let organization_ID = req.body.organization_ID
    let OrganizationalProfileupdatedData = {
        organization_ID: req.body.organization_ID,
        organization_Name: req.body.organization_Name,
        contact_first_name: req.body.contact_first_name,
        contact_last_name: req.body.contact_last_name,
        contact_email: req.body.contact_email,
        buesiness_location: req.body.buesiness_location,
        zip_code: req.zip_code,
        contact_phone_no: req.body.contact_phone_no,
        country:req.body.country,
        state: req.body.state,
        city: req.body.city,
        stret1: req.body.stret1
    }
    OrganizationalProfilemodel.findByIdAndUpdate(organization_ID, {$set: OrganizationalProfileupdatedData})
    .then(response => {
        res.json({
            message: 'OrganizationalProfile Updated Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurs!'
        })
    })
}     
// Delete OrganizationProfile
    exports.DeleteOrganizationalProfile = async (req, res) => {
    let organization_ID = req.body.organization_ID
    OrganizationalProfilemodel.findByIdAndRemove(organization_ID)
    .then(response => {
        res.json({
            message: 'OrganizationalProfile Deleted Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurs!'
        })
    })
}