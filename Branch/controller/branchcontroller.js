const { response } = require('express')
const model = require('../models/branchmodel')
exports.Displaybranch = async (req, res) => {
    branchmodel.find()
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
// search by ID (Show single branch)
exports.Searchbranch = async (req, res) => {
    let branch_ID = req.body.branch_ID
    branchmodel.findById(branch_ID)
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
// Add new branch
exports.Addbranch = async (req, res) => {
        const branch = new branchmodel({
            branch_ID: req.body.branch_ID,
            branch_Name: req.body.branch_Name,
            email: req.body.email,
            phone_no: req.body.phone_no,
            zip_code: req.body.zip_code,
            country:req.body.country,
            region: req.body.region,
            city: req.body.city,
            street: req.body.stret
            
        });
        branch.save()
        .then(data => {
            res.json(data)
            })
        .catch(error => {
            res.json({
                message: 'An error occurs!'
            });
        }); 
    }
    // Update the existing branch information using ID
  exports.Updatebranch = async (req, res) => {
    let branch_ID = req.body.branch_ID
    let branchupdatedData = {
        branch_ID: req.body.branch_ID,
        branch_Name: req.body.branch_Name,
        zip_code: req.body.zip_code,
        email: req.body.email,
        phone_no: req.body.phone_no,
        country:req.body.country,
        region: req.body.region,
        city: req.body.city,
        street: req.body.stret
    }
    branchmodel.findByIdAndUpdate(branch_ID, {$set: branchupdatedData})
    .then(response => {
        res.json({
            message: 'branch Updated Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurs!'
        })
    })
}     
// Delete branchs 
    exports.Deletebranch = async (req, res) => {
    let branch_ID = req.body.branch_ID
    branchmodel.findByIdAndRemove(branch_ID)
    .then(response => {
        res.json({
            message: 'branch Deleted Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurs!'
        })
    })
}