const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { restaurantController, authController } = require("../../controllers")
const router = express.Router()

router.post("/register", restaurantController.createRestaurant)
router.post("/login", restaurantController.validateRestaurantLogin)
router.put("/", authController.authentication, restaurantController.updateRestaurant)
router.delete("/", authController.authentication, restaurantController.deleteRestaurant)
router.get("/", authController.authentication, restaurantController.getRestaurantById)
router.post("/create-new-menu-item", authController.authentication, restaurantController.createMenuItem)
router.get("/menu", authController.authentication, restaurantController.getAllMenuItems)
router.put("/update/:menuItemId", authController.authentication, restaurantController.updateMenuItem)
router.delete("/delete/:menuItemId", authController.authentication, restaurantController.deleteMenuItem)

module.exports = {
    restaurantRouter: router
}