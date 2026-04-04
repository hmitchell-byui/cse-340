// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build vehicle detail view
router.get("/detail/:inv_id", invController.buildByInvId);

// Routes to build add inventory view and handle form submission
router.get("/add", invController.buildAddInventory)
router.post("/add", invController.addInventory)


module.exports = router;
