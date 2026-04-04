const { body, validationResult } = require("express-validator")
const utilities = require(".")  // gives access to getNav()

const classificationValidate = {}

/* **********************************
 *  Classification Validation Rules
 * ********************************* */
classificationValidate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide a classification name.")
      .isAlphanumeric()
      .withMessage("Classification name must contain only letters and numbers. No spaces or special characters.")
  ]
}

/* **********************************
 *  Check data and return errors
 * ********************************* */
classificationValidate.checkClassificationData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()

    return res.render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors: errors.array(),
      message: null,
      classification_name: req.body.classification_name
    })
  }
  next()
}

module.exports = classificationValidate
