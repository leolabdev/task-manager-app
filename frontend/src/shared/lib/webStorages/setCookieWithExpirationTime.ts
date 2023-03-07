/**
 * Sets a cookie with an expiration time.
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @param {number} expirationTimeInMinutes - The expiration time of the cookie in minutes.
 */
export function setCookieWithExpirationTime(name, value, expirationTimeInMinutes) {
    // Create a new Date object set to the current time plus the expiration time (in minutes)
    const expirationDate = new Date(new Date().getTime() + expirationTimeInMinutes * 60 * 1000);

    // Convert the expiration date to a UTC string
    const expirationDateString = expirationDate.toUTCString();

    // Set the cookie with an expiration date
    document.cookie = `${name}=${value}; expires=${expirationDateString}; path=/`;

    return name;
}
