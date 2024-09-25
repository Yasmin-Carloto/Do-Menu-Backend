const { authServices } = require("../../services")

async function authentication(req, res, next){
    try {
        const token = await authServices.verifyToken(req.headers.authorization)
        next()
    }catch(error){
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
} 

module.exports = {
    authentication: authentication
}