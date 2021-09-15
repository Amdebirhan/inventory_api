
const resourcesController = require('./controller/resource.controller');
const cleanBody = require ("../../common/middlewares/cleanbody");
const express = require('express');
router = express.Router();

router.post('/insert-resource', [
    cleanBody,
    resourcesController.insert
]);

router.get('/list-resource', [
    cleanBody,
    resourcesController.list
]);


router.get('/defaultResources/:roleId', [
    cleanBody,
    resourcesController.geturlById
]);

module.exports = router;