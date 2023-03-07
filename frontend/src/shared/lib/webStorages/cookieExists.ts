/**
 * Check if a cookie with a given name exists.
 * @param {string} name - The name of the cookie to check.
 * @returns {boolean} - True if the cookie exists, false otherwise.
 */
export function cookieExists(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return true;
        }
    }
    return false;
}
