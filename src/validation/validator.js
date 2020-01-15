export function validate(...valids) {
    console.log(valids);
    for(const valid of valids) {
        if(!valid.isValid) return valid;
    }

    return { isValid: true }
}

export function canSubmit(...valids) {
    for(const valid of valids) {
        if(!valid.isValid) return false;
    }

    return true
}