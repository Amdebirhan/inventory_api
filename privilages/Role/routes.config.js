
const rolesController = require('./controller/role.controller');
const cleanBody = require ("../../common/middlewares/cleanbody");;
const express = require('express');
router = express.Router();


router.post('/', [
    cleanBody,
    rolesController.insert
]);
router.get('/', [
    cleanBody,
    rolesController.list
]);
router.get('/:userId', [
    cleanBody,
    rolesController.getById
]);
router.patch('/:userId', [
    cleanBody,
    rolesController.patchById
]);
router.delete('/:userId', [
    cleanBody,
    rolesController.removeById
]);

  
module.exports = router;