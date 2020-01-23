import validator from 'validator';

export function required(value) {
    if(validator.isEmpty(value.trim())) {
        return {
            isValid: false,
            message: "To pole jest wymagane!"
        }
    }

    return { isValid: true }
}

export function minLength(value, min) {
    if(!validator.isLength(value.trim(), {min, max:undefined})) {
        return {
            isValid: false,
            message: "Pole musi mieć co najmniej " + min + " znaków."
        }
    }

    return { isValid: true }
}

export function confirmPassword(password, confirm) {
    if(password!==confirm) {
        return {
            isValid: false,
            message: "Hasła się nie zgadzają!"
        }
    }

    return { isValid: true }
}

function checkIfExist(array, element) {
    for(const elem of array) {
        if(elem === element) return true;
    }

    return false;
}

export function uniqueUsername(value, prefix, usernames) {
    if(usernames===undefined) usernames = [];
    if(prefix.length === 5) {
        fetch("http://localhost:3004/users/register/usernames?prefix="+prefix) 
        .then(resp => resp.json())
        .then(resp => {
            if(checkIfExist(resp, value)) {
                return {
                    isValid: false,
                    message: "Nazwa jest zajęta przez innego użytkownika.",
                    usernames: resp
                }
            }

            return { isValid: true }
        });
    } else {
        console.log(usernames + " to na dole")
        if(checkIfExist(usernames, value)) {
            return {
                isValid: false,
                message: "Nazwa jest zajęta przez innego użytkownika.",
                usernames
            }
        }

        return { isValid: true }
    }

    
}