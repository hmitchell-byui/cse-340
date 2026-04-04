// Needed Resources
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities")
const accountController = require("../controllers/accountController")


// Login view
router.get(
  "/login",
  utilities.handleErrors(accountController.buildLogin)
)

// Route to build the registration view
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
)
// Route to build the "My Account" view
router.get(
  "/",
  utilities.handleErrors(accountController.buildLogin)
)
// Route to handle registration form submission
router.post('/register', utilities.handleErrors(accountController.registerAccount))

module.exports = router
