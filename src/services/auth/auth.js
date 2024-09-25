const jwt = require("jsonwebtoken")
const jwtSecretKey = process.env.SECRET_KEY

function createToken(restaurant) {
    const token = jwt.sign(restaurant, jwtSecretKey)
    return token
}

function verifyToken(token) {
    if(!token){
        throw Error("Authentication failed. Missing token.")
    }else{
        const [bearer, tokenJWT] = token.split(" ")
        return jwt.verify(tokenJWT, jwtSecretKey)
    }
}

function decodeToken(token){
    if(!token){
        throw Error("Authentication failed. Missing token.")
    }else{
        const [bearer, tokenJWT] = token.split(" ")
        const jwtDecoded = jwt.verify(tokenJWT, jwtSecretKey)
        return {
            restaurantId: jwtDecoded.restaurantId,
            restaurantName: jwtDecoded.restaurantName,
            restaurantEmail: jwtDecoded.restaurantEmail
        }
    }
}

module.exports = {
    createToken: createToken,
    verifyToken: verifyToken,
    decodeToken: decodeToken
}