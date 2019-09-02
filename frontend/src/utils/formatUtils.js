/**
 * Returns a string with the date in mm/dd/yyyy format
 * @param {Date} date
 */
const formatDate = (date) => {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

/**
 * Rounds distance to 2 decimal places
 * @param {num} dist 
 */
const formatDistance = (dist) => {
  return parseFloat(dist.toFixed(2))
}

/**
 * Formats a length of time in seconds to h:m:s, adding necessary padding
 * @param {number} seconds 
 */
const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return [
    h,
    m > 9 ? m : (h ? '0' + m : m || '0'),
    s > 9 ? s : '0' + s,
  ].filter(a => a).join(':');
}

export default {
  formatDate,
  formatDistance,
  formatTime,
}