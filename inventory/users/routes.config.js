const cleanBody = require("../common/middlewares/cleanbody");
const userController = require("./controllers/users.controller");
const { validateToken } = require("../../authorization/middlewares/validateToken");
const privilages = require("../../authorization/middlewares/verifyPrivilageRoutesAndRequests");
const express = require('express');
const url = require("url");
router = express.Router();

router.route('/insert-user').post(function (req, res) {
  [
    cleanBody,
    validateToken,
    privilages.getPrivilages,
    userController.insert
  ]
})

router.get(('/:userId'), [
  cleanBody,
  validateToken,
  privilages.getPrivilages,
  userController.getById
]);

router.get(('/list-users'), [
  cleanBody,
  validateToken,
  privilages.getPrivilages,
  userController.list
]);

router.patch('/update-users/:userId',
  userController.patchById,
);

router.patch('/assign-privilages',
  userController.assignPrivilage,
);

router.delete('/remove-users/:userId', [
  userController.removeById
]);



module.exports = router;

