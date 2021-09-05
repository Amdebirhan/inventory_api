const cleanBody = require("../inventory/common/middlewares/cleanbody");
const authController = require("./controllers/authorization.controller");
const { validateToken } = require("../authorization/middlewares/validateToken");
const express = require('express');
router = express.Router();

router.post("/signup", [
    cleanBody,
     authController.Signup]);


router.post("/login",[
    cleanBody,
    authController.login]);


router.patch("/activate", [
    cleanBody,
    authController.activate
]);
router.patch("/forgot", [
    cleanBody,
    authController.forgetPassword
]);

router.patch("/reset", [
    cleanBody,
    authController.resetPassword
]);

router.get("/profile", [
    cleanBody,
    authController.profile
]);

router.patch("/logout", [
    cleanBody,
    authController.logout
]);

module.exports = router;