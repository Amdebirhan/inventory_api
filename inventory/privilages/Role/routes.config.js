
const rolesController = require('./controller/role.controller');
const cleanBody = require ("../../common/middlewares/cleanbody");;
const express = require('express');
router = express.Router();


router.post('/insert-role', [
    cleanBody,
    rolesController.insert
]);
router.get('/list-role', [
    cleanBody,
    rolesController.list
]);
router.get('get-role/:userId', [
    cleanBody,
    rolesController.getById
]);
router.patch('update-role/:userId', [
    cleanBody,
    rolesController.patchById
]);
router.delete('delete-role/:userId', [
    cleanBody,
    rolesController.removeById
]);

  
module.exports = router;