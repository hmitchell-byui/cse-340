const { body, validationResult } = require("express-validator")
const utilities = require(".")

const inventoryValidate = {}

inventoryValidate.inventoryRules = () => {
  return [
    body("inv_make")
      .trim()
      .notEmpty().withMessage("Please provide a vehicle make.")
      .isLength({ min: 2 }).withMessage("Make must be at least 2 characters."),

    body("inv_model")
      .trim()
      .notEmpty().withMessage("Please provide a vehicle model."),

    body("inv_year")
      .trim()
      .notEmpty().withMessage("Please provide a year.")
      .isInt({ min: 1900, max: 2100 }).withMessage("Year must be between 1900 and 2100."),

    body("inv_description")
      .trim()
      .notEmpty().withMessage("Please provide a description."),

    body("inv_image")
      .trim()
      .notEmpty().withMessage("Please provide an image path."),

    body("inv_thumbnail")
      .trim()
      .notEmpty().withMessage("Please provide a thumbnail path."),

    body("inv_price")
      .trim()
      .notEmpty().withMessage("Please provide a price.")
      .isFloat({ min: 0 }).withMessage("Price must be a positive number."),

    body("inv_miles")
      .trim()
      .notEmpty().withMessage("Please provide mileage.")
      .isInt({ min: 0 }).withMessage("Miles must be a positive number."),

    body("inv_color")
      .trim()
      .notEmpty().withMessage("Please provide a color."),

    body("classification_id")
      .notEmpty().withMessage("Please choose a classification.")
  ]
}

inventoryValidate.checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationList = await utilities.buildClassificationList(req.body.classification_id)

    return res.render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classificationList,
      errors: errors.array(),
      message: null,

      // Sticky values
      inv_make: req.body.inv_make,
      inv_model: req.body.inv_model,
      inv_year: req.body.inv_year,
      inv_description: req.body.inv_description,
      inv_image: req.body.inv_image,
      inv_thumbnail: req.body.inv_thumbnail,
      inv_price: req.body.inv_price,
      inv_miles: req.body.inv_miles,
      inv_color: req.body.inv_color
    })
  }
  next()
}

module.exports = inventoryValidate