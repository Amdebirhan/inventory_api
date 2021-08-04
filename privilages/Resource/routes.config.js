
const resourcesController = require('./controller/resource.controller');
const cleanBody = require ("../../common/middlewares/cleanbody");;
const express = require('express');
router = express.Router();

router.post('/', [
    cleanBody,
    resourcesController.insert
]);

  
module.exports = router;