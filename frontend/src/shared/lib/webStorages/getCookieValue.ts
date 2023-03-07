/**
 * Get the value of a cookie with a given name.
 * @param {string} name - The name of the cookie to get.
 * @returns {string|null} - The value of the cookie if it exists, null otherwise.
 */
export function getCookieValue(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return null;
}
