const { response } = require("express")
const { restaurantServices, authServices } = require("../../services")

async function createRestaurant(req, res) {
    const restaurantName = req.body.name
    const restaurantPassword =  req.body.password
    const restaurantPasswordConfirmation = req.body.passwordConfirmation
    const restaurantEmail = req.body.email
    const restaurantPhone = req.body.phoneNumber

    try {
        const restaurant = await restaurantServices.createRestaurant(restaurantName, restaurantPassword, restaurantPasswordConfirmation, restaurantPhone, restaurantEmail)

        res.status(200).json({
            success: true,
            token: await authServices.createToken(restaurant)
        })
    }catch(error){
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

async function validateRestaurantLogin(req, res){
    const restaurantEmail = req.body.email
    const restaurantPassword = req.body.password

    try {
        const restaurant = await restaurantServices.validateRestaurantLogin(restaurantEmail, restaurantPassword)
        res.status(200).json({
            success: true,
            token: authServices.createToken(restaurant)
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

async function updateRestaurant(req, res) {
    const restaurantName = req.body.name
    const restaurantPassword =  req.body.password
    const restaurantPasswordConfirmation = req.body.passwordConfirmation
    const restaurantEmail = req.body.email
    const restaurantPhone = req.body.phoneNumber

    const token = req.headers.authorization
    const decodedToken = authServices.decodeToken(token)

    try {
        const restaurantUpdated = await restaurantServices.updateRestaurant(decodedToken.restaurantId, restaurantName, restaurantEmail, restaurantPassword, restaurantPasswordConfirmation, restaurantPhone)
        res.status(200).json({
            success: true,
            response: restaurantUpdated
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

async function deleteRestaurant(req, res){
    const token = req.headers.authorization
    const decodedToken = authServices.decodeToken(token)

    try {
        await restaurantServices.deleteRestaurant(decodedToken.restaurantId)
        res.status(200).json({
            success: true
        })
    } catch (error) {
        res.status(400).json({
            success: false
        })
    }
}

async function getRestaurantById(req, res) {
    const token = req.headers.authorization
    const decodedToken = authServices.decodeToken(token)

    try{
        const restaurant = await restaurantServices.getRestaurantById(decodedToken.restaurantId)
        res.status(200).json({
            success: true,
            response: restaurant
        })
    }catch(error){
        res.status(400).json({
            success: false
        })
    }
}

async function createMenuItem(req, res) {
    const menuItemName = req.body.name
    const menuItemImage = req.body.image
    const menuItemDescription = req.body.description
    const menuItemPrice = req.body.price
    const token = req.headers.authorization
    
    try {
        await restaurantServices.createMenuItem(menuItemName, menuItemImage, menuItemDescription, menuItemPrice, token)
        res.status(200).json({
            success: true,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

async function getAllMenuItems(req, res){
    const token = req.headers.authorization
    const decodedToken = authServices.decodeToken(token)

    try{
        const menu = await restaurantServices.getAllMenuItems(decodedToken.restaurantId)
        res.status(200).json({
            success: true,
            menu: menu
        })
    }catch(error){
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

async function updateMenuItem(req, res){
    const menuItemId = req.params.menuItemId
    const menuItemName = req.body.name
    const menuItemImage = req.body.image
    const menuItemDescription = req.body.description
    const menuItemPrice = req.body.price

    const token = req.headers.authorization
    const decodedToken = authServices.decodeToken(token)

    try{
        await restaurantServices.updateMenuItem(menuItemId, menuItemName, menuItemImage, menuItemDescription, menuItemPrice, decodedToken.restaurantEmail)
        res.status(200).json({
            success: true
        })
    }catch(error){
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

async function deleteMenuItem(req, res){
    const menuItemId = req.params.menuItemId
    const token = req.headers.authorization
    const decodedToken = authServices.decodeToken(token)

    try{
        await restaurantServices.deleteMenuItem(menuItemId, decodedToken.restaurantId)
        res.status(200).json({
            success: true
        })
    }catch(error){
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

module.exports = {
    createRestaurant: createRestaurant,
    validateRestaurantLogin: validateRestaurantLogin,
    getRestaurantById: getRestaurantById,
    updateRestaurant: updateRestaurant,
    deleteRestaurant: deleteRestaurant,
    createMenuItem: createMenuItem,
    getAllMenuItems: getAllMenuItems,
    updateMenuItem: updateMenuItem,
    deleteMenuItem, deleteMenuItem
}