
const rolesController = require('./controller/role.controller')
const express = require('express');
router = express.Router();

router.post('/role', [
    rolesController.insert
  ]);
  router.get('/role/:userId', [
    UsersController.getById
]);

router.post('/role', [
    rolesController.insert
]);
router.get('/role', [
    rolesController.list
]);
router.get('/role/:userId', [
    rolesController.getById
]);
router.patch('/role/:userId', [
    rolesController.patchById
]);
router.delete('/role/:userId', [
    rolesController.removeById
]);