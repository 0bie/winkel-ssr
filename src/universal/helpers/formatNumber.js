/**
 * Format numbers using `Intl.NumberFormat` constructor
 * @param {number} value
 * @returns {string}
 */

export default function formatNumber(value) {
    if (typeof window == 'undefined') {
        return new Intl.NumberFormat().format(value)
    }
    if (window.Intl && window.Intl.NumberFormat) {
        return new Intl.NumberFormat().format(value)
    }
  return value
}
