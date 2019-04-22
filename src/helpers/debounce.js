/**
 * Debounce
 * @param func
 * @param wait
 * @returns {Function}
 */
export default function(func, wait = 100) {
    let timeout;
    return function(...args) {
        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}