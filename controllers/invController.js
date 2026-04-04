const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

// All controller functions must have a try/catch block to catch any errors 
// that may occur and pass them to the next middleware (the error handler) with the next() function.
// This is a common pattern in Express applications to ensure that errors are handled gracefully 
// and do not crash the server.

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  try {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
  } catch (error) {
    next(error)
  }
}

/* ***************************
 *  Build vehicle detail view
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
  try {
    const inv_id = req.params.inv_id
    const vehicleData = await invModel.getVehicleById(inv_id)
    const nav = await utilities.getNav()
    const vehicleHTML = await utilities.buildVehicleDetailHTML(vehicleData)

    res.render("./inventory/detail", {
      title: `${vehicleData.inv_make} ${vehicleData.inv_model}`,
      nav,
      vehicleHTML,
    })
  } catch (error) {
    next(error)
  }
}

// Build add inventory view
invCont.buildAddInventory = async function (req, res, next) {
  try {
    const nav = await utilities.getNav()
    const classifications = await invModel.getClassifications()

    res.render("./inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classifications: classifications.rows,
      errors: null
    })
  } catch (error) {
    next(error)
  }
}
// Handle add inventory form submission
invCont.addInventory = async function (req, res, next) {
  try {
    const {
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    } = req.body

    const result = await invModel.addInventory(
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    )

    if (result) {
      req.flash("notice", "Vehicle successfully added.")
      res.redirect("/inv")
    } else {
      req.flash("notice", "Failed to add vehicle.")
      res.redirect("/inv/add")
    }
  } catch (error) {
    next(error)
  }
}


  module.exports = invCont