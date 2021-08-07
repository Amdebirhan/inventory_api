
const resourcesController = require('./controller/resource.controller');
const cleanBody = require ("../../common/middlewares/cleanbody");
const express = require('express');
router = express.Router();

router.post('/', [
    cleanBody,
    resourcesController.insert
]);

router.get('/', [
    cleanBody,
    resourcesController.list
]);


router.get('/defaultResources/:roleId', [
    cleanBody,
    resourcesController.geturlById
]);

module.exports = router;