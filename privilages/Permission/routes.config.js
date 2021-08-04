
const permissionController = require('./controller/permission.controller');
const cleanBody = require ("../../common/middlewares/cleanbody");;
const express = require('express');
router = express.Router();


router.post('/', [
    cleanBody,
    permissionController.insert
]);
router.patch('/:userId', [
    cleanBody,
    rolesController.patchById
]);

  
module.exports = router;