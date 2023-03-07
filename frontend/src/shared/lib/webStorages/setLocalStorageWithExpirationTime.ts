/**
 * Sets an item in localStorage with an expiration time.
 * @param {string} key - The key for the item to be stored.
 * @param {*} value - The value to be stored.
 * @param {number} expirationTimeInSeconds - The expiration time for the item in seconds.
 */
export function setLocalStorageWithExpirationTime(key, value, expirationTimeInSeconds:number) {
    const expirationTimestamp = new Date().getTime() + expirationTimeInSeconds * 1000;
    const item = { value: value, expiration: expirationTimestamp };
    localStorage.setItem(key, JSON.stringify(item));
}
