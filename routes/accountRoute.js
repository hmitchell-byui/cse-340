// Needed Resources
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities")
const accountController = require("../controllers/accountController")
const regValidate = require("../utilities/account-validation")

/* ****************************************
 *  Deliver Login View
 * *************************************** */
router.get(
  "/login",
  utilities.handleErrors(accountController.buildLogin)
)

/* ****************************************
 *  Deliver Registration View
 * *************************************** */
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
)

/* ****************************************
 *  Process Registration
 * *************************************** */
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

/* ****************************************
 *  Process Login
 * *************************************** */
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.loginAccount)
)

/* ****************************************
 *  Default Account Route → Login View
 * *************************************** */
router.get(
  "/",
  utilities.handleErrors(accountController.buildLogin)
)

module.exports = router
