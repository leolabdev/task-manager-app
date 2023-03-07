/**
 * Deletes a cookie with the specified name.
 * @param {string} name - The name of the cookie to delete.
 */
export function deleteCookie(name) {
    // Set the expiration date of the cookie to a time in the past
    const expirationDate = new Date(0).toUTCString();

    // Set the cookie with an expiration date in the past
    document.cookie = `${name}=; expires=${expirationDate}; path=/`;
}

