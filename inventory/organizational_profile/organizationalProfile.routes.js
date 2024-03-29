
//print bill send bill convert bill to pdf
const cleanBody = require("../common/middlewares/cleanbody");
const orgProfileController = require("./controller/organizationalProfile.controller");
const { validateToken } = require("../../authorization/middlewares/validateToken");
const privilages = require("../../authorization/middlewares/verifyPrivilageRoutesAndRequests");
const express = require('express');
router = express.Router();

router.get('/get-organization/:organizationId',[
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    orgProfileController.getById
  ]);

router.patch(('/patch-organization'), [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    orgProfileController.patchById
  ]);

  router.patch(('/remove-organization'), [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    orgProfileController.removeById
  ]);

module.exports = router;
