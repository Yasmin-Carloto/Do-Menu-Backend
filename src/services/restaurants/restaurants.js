const { validatePassword, validateEmail, validateName, validatePhoneNumber, validateDescription, validatePrice } = require("../validation/fieldsValiation");
const Restaurant = require("../../models/Restaurant/Restaurant");
const bcrypt = require("bcrypt");
const MenuItem = require("../../models/MenuItem/MenuItem");
const { decodeToken } = require("../auth/auth");

async function createRestaurant(restaurantName, restaurantPassword, restaurantPasswordConfirmation, restaurantPhone, restaurantEmail) {
    if (!validateName(restaurantName)) {
        throw Error("Field Name from restaurant is not valid.");
    } else if (!validateEmail(restaurantEmail)) {
        throw Error("Field Email from restaurant is not valid.");
    } else if (!validatePassword(restaurantPassword, restaurantPasswordConfirmation)) {
        throw Error("Fields Password and Password Confirmation from restaurant are not valid.");
    } else if (!validatePhoneNumber(restaurantPhone)) {
        throw Error("Field Phone Number from restaurant is not valid.");
    } else {
        const existingRestaurant = await getRestaurantByEmail(restaurantEmail);
        if (existingRestaurant) {
            throw Error(`There is a restaurant already signed up under ${restaurantEmail}`);
        } else {
            const encryptedPassword = await bcrypt.hash(restaurantPassword, 10);
            const restaurant = new Restaurant({
                name: restaurantName,
                email: restaurantEmail,
                password: encryptedPassword,
                phone: restaurantPhone
            });
            await restaurant.save();
            
            return {
                restaurantId: restaurant.id,
                restaurantName: restaurantName,
                restaurantEmail: restaurantEmail
            };
        }
    }
}

async function validateRestaurantLogin(restaurantEmail, restaurantPassword){
    if(!restaurantEmail){
        throw Error("Field Email from restaurant is not valid.")
    }else if(!restaurantPassword){
        throw Error("Field Password from restaurant is not valid.");
    }else{
        const restaurant = await getRestaurantByEmail(restaurantEmail)
        if(!restaurant){
            throw Error("This restaurant is not yet signed up.")
        }else{
            const isPasswordCorrect = await bcrypt.compare(restaurantPassword, restaurant.password)
            if(!isPasswordCorrect){
                throw Error("Password is incorrect.")
            }else{
                return {
                    restaurantId: restaurant.id,
                    restaurantName: restaurant.name,
                    restaurantEmail: restaurant.email,
                }
            }
        }
    }
}

async function updateRestaurant(restaurantId, restaurantName, restaurantEmail, restaurantPassword, restaurantPasswordConfirmation, restaurantPhone) {
    if (!restaurantId) {
        throw Error("Restaurant Id is not valid.");
    }
    if (!validateName(restaurantName)) {
        throw Error("Field Name from restaurant is not valid.");
    }
    if (!validateEmail(restaurantEmail)) {
        throw Error("Field Email from restaurant is not valid.");
    }
    if (!validatePhoneNumber(restaurantPhone)) {
        throw Error("Field Phone Number from restaurant is not valid.");
    }

    const currentRestaurant = await Restaurant.findById(restaurantId);

    let updates = {
        name: restaurantName,
        email: restaurantEmail,
        phone: restaurantPhone
    };

    if (restaurantPassword && restaurantPasswordConfirmation) {
        if (!validatePassword(restaurantPassword, restaurantPasswordConfirmation)) {
            throw Error("Fields Password and Password Confirmation from restaurant are not valid.");
        }

        if (restaurantPassword !== currentRestaurant.password) {
            updates.password = await bcrypt.hash(restaurantPassword, 10);
        }
    }

    const restaurantUpdated = await Restaurant.findByIdAndUpdate(
        restaurantId,
        updates,
        { new: true }
    );

    return restaurantUpdated;
}

async function deleteRestaurant(restaurantId) {
    if(!restaurantId){
        throw Error("Restaurant does not exist.")
    }else{
        await Restaurant.findByIdAndDelete(restaurantId)
    }
}

async function getRestaurantByEmail(email) {
    const existingRestaurant = await Restaurant.findOne({ email: email });
    return existingRestaurant;
}

async function getRestaurantById (id){
    const existingRestaurant = await Restaurant.findOne({ _id: id });
    return existingRestaurant
}

async function createMenuItem(menuItemName, menuItemImage, menuItemDescription, menuItemPrice, token) {
    if(!validateName(menuItemName)){
        throw Error("Field Name from from Menu Item is not valid.")
    }else if(!validateDescription(menuItemDescription)){
        throw Error("Field Description from Menu Item is not valid.")
    }else if(!validatePrice(menuItemPrice)){
        throw Error("Field Price from Menu Item is not valid.")
    }else{
        const menuItem = new MenuItem({
            name: menuItemName, 
            image: menuItemImage,
            description: menuItemDescription, 
            price: menuItemPrice
        })
        await menuItem.save()
        const decodedToken = decodeToken(token)
        await addMenuItemToRestaurantMenu(menuItem, decodedToken.restaurantId)
    }
}

async function addMenuItemToRestaurantMenu(menuItem, restaurantId) {
    const restaurant = await getRestaurantById(restaurantId)

    if(!restaurant){
        throw Error("Restaurant does not exist.")
    }else{
        await Restaurant.findOneAndUpdate(
            {_id: restaurant.id},
            {$push: {menu: menuItem}},
            {new: true}
        )
    }
}

async function getAllMenuItems(restaurantId) {
    const restaurant = await getRestaurantById(restaurantId)

    if(!restaurant){
        throw Error("Restaurant does not exist.")
    }else{
        return (await restaurant.populate("menu")).menu
    }
}

async function deleteMenuItem(menuItemId, restaurantId) {
    const restaurant = await getRestaurantById(restaurantId)
    
    if(!restaurantId){
        throw Error("Restaurant Id is not valid.")
    }else{
        if(!menuItemId){            
            throw Error("Menu Item Id is not valid.")
        }else{
            await MenuItem.findByIdAndDelete(menuItemId)
            await Restaurant.findByIdAndUpdate(restaurantId,
                {$pull: {menu: menuItemId}},
                {new: true}
            )
        }
    }
}

async function updateMenuItem(menuItemId, menuItemName, menuItemImage, menuItemDescription, menuItemPrice) {
    if(!menuItemId){
        throw Error("Menu Item Id is not valid.")
    }else if(!validateName(menuItemName)){
        throw Error("Field Name from from Menu Item is not valid.")
    }else if(!validateDescription(menuItemDescription)){
        throw Error("Field Description from Menu Item is not valid.")
    }else if(!validatePrice(menuItemPrice)){
        throw Error("Field Price from Menu Item is not valid.")
    }else{
        await MenuItem.findByIdAndUpdate(menuItemId,
        { 
            name: menuItemName,
            image: menuItemImage,
            description: menuItemDescription,
            price: menuItemPrice
        })
    }
}

module.exports = {
    createRestaurant: createRestaurant,
    getRestaurantById: getRestaurantById,
    validateRestaurantLogin: validateRestaurantLogin,
    updateRestaurant: updateRestaurant,
    deleteRestaurant: deleteRestaurant,
    createMenuItem: createMenuItem,
    getAllMenuItems: getAllMenuItems,
    deleteMenuItem: deleteMenuItem,
    updateMenuItem: updateMenuItem
};
