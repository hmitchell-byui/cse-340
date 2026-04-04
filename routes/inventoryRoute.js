// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const classificationValidate = require("../utilities/classification-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId)

// Route to build vehicle detail view
router.get("/detail/:inv_id", invController.buildByInvId)

// Route to build inventory management view
router.get("/", invController.buildManagement)

// Routes to build add classification view and handle form submission
router.get("/add-classification", invController.buildAddClassification)

router.post(
  "/add-classification",
  classificationValidate.classificationRules(),
  classificationValidate.checkClassificationData,
  invController.addClassification
)

// Route to build add inventory view
router.get("/add-inventory", invController.buildAddInventory)

// Route to handle add inventory form submission
router.post("/add-inventory", invController.addInventory)

module.exports = router
