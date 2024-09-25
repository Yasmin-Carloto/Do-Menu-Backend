function validateName(name){
    if(!name){
        return false
    }else if(name.length < 3){
        return false
    }else{
        return true
    }
}

function validateEmail(email){
    if(!email){
        return false
    }else{
        const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        return regex.test(email)
    }
}

function validatePassword(password, passwordConfirmation){
    if(password !== passwordConfirmation){
        return false
    }else if(!password || !passwordConfirmation){
        return false
    }else{
        const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
        return regex.test(password)
    }
}

function validatePhoneNumber(phone){
    if(!phone){
        return false
    } else {
        const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
        return regex.test(phone)
    }
}

function validateDescription(description){
    if(!description){
        return false
    }else if(description.length < 10){
        return false
    } else {
        return true
    }
}

function validatePrice(price){
    if(!price){
        console.log("aqui")
        return false 
    }else if(price < 1){
        console.log("aqui1")
        return false
    }else{
        return true
    }
}

module.exports = {
    validateName: validateName,
    validateEmail: validateEmail,
    validatePassword: validatePassword,
    validatePhoneNumber: validatePhoneNumber,
    validateDescription: validateDescription,
    validatePrice: validatePrice
}