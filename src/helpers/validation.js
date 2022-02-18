export function isNotEmpty(val) {
    return val && val.trim().length > 0;
}

export function isValidEmail(val) {
    return val && val.includes('@');
}