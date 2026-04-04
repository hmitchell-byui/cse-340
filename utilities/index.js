const invModel = require("../models/inventory-model")

const Util = {}

/* ****************************************
*  Error Handling Wrapper
* *************************************** */
Util.handleErrors = function (fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

/* ************************
 * Build the nav
 ************************ */
Util.getNav = async function () {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'

  data.rows.forEach(row => {
    list += `
      <li>
        <a href="/inv/type/${row.classification_id}" 
           title="See our inventory of ${row.classification_name} vehicles">
          ${row.classification_name}
        </a>
      </li>`
  })

  list += "</ul>"
  return list
}

/* **************************************
 * Build the classification grid
 ************************************** */
Util.buildClassificationGrid = async function (data) {
  let grid

  if (data.length > 0) {
    grid = '<ul id="inv-display">'

    data.forEach(vehicle => {
      grid += `
        <li>
          <a href="/inv/detail/${vehicle.inv_id}" 
             title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
            <img src="${vehicle.inv_thumbnail}" 
                 alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
          </a>
          <div class="namePrice">
            <h2>
              <a href="/inv/detail/${vehicle.inv_id}">
                ${vehicle.inv_make} ${vehicle.inv_model}
              </a>
            </h2>
            <span>$${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</span>
          </div>
        </li>
      `
    })

    grid += "</ul>"
  } else {
    grid = "<p class='notice'>Sorry, no matching vehicles could be found.</p>"
  }

  return grid
}

/* **************************************
 * Build the vehicle detail view HTML
 ************************************** */
Util.buildVehicleDetailHTML = async function (vehicle) {
  if (!vehicle) {
    return "<p class='notice'>Sorry, that vehicle could not be found.</p>"
  }

  let html = `
    <section id="vehicle-detail">
      <img src="${vehicle.inv_image}" 
           alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
      
      <div class="vehicle-info">
        <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>

        <p class="description">${vehicle.inv_description}</p>

        <p><strong>Price:</strong> 
           $${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</p>

        <p><strong>Mileage:</strong> 
           ${new Intl.NumberFormat("en-US").format(vehicle.inv_miles)} miles</p>

        <p><strong>Color:</strong> ${vehicle.inv_color}</p>
      </div>
    </section>
  `

  return html
}

// Build the classification dropdown for forms
Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}


module.exports = Util
