/**
 * Returns the number of days in the given year and month
 * @param {number} year 
 * @param {number} month 
 */
const getNumDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate()
}

/**
 * Returns an array of objects containing month name and array of days in that month
 */
const getLast12MonthsArray = () => {
  const last12Months = []
  last12Months.length = 12

  const curDate = new Date()
  let m = curDate.getMonth()
  let y = curDate.getFullYear()
  for (let i = 11; i >= 0; i--) {
    const monthName = new Date(y, m, 1).toLocaleString('default', { month: 'short' })
    const daysInMonth = []
    daysInMonth.length = getNumDaysInMonth(y, m)
    daysInMonth.fill(0)
    last12Months[i] = {
      data: daysInMonth,
      name: monthName,
    }
    if (m === 0) y--
    m = (m + 11) % 12
  }
  return last12Months
}

export default {
  getLast12MonthsArray,
  getNumDaysInMonth,
}