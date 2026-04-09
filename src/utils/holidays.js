/** @param {number} monthIndex 0–11 */
export function getSeason(monthIndex) {
  if (monthIndex === 11 || monthIndex <= 1) return 'winter'
  if (monthIndex <= 4) return 'spring'
  if (monthIndex <= 7) return 'summer'
  return 'autumn'
}

/** `object-position` for the hero photo by season (subtle theme shift). */
export const SEASON_HERO_FOCUS = {
  winter: 'center 30%',
  spring: 'center 38%',
  summer: 'center 35%',
  autumn: 'center 28%',
}

/** @param {number} year @param {number} monthIndex 0–11 @param {number} day */
export function getHolidayLabel(year, monthIndex, day) {
  const key = `${monthIndex + 1}/${day}`
  const fixed = FIXED.get(key)
  if (fixed) return fixed

  const mlk = nthWeekday(year, 0, 0, 3)
  if (monthIndex === 0 && day === mlk) return "Martin Luther King Jr. Day"

  const pres = nthWeekday(year, 1, 0, 3)
  if (monthIndex === 1 && day === pres) return "Presidents' Day"

  const memorial = lastWeekday(year, 4, 0)
  if (monthIndex === 4 && day === memorial) return 'Memorial Day'

  const labor = nthWeekday(year, 8, 0, 1)
  if (monthIndex === 8 && day === labor) return 'Labor Day'

  const columbus = nthWeekday(year, 9, 0, 2)
  if (monthIndex === 9 && day === columbus) return 'Columbus Day'

  const thanks = thanksgivingDay(year)
  if (monthIndex === 10 && day === thanks) return 'Thanksgiving'

  return null
}

const FIXED = new Map([
  ['1/1', "New Year's Day"],
  ['6/19', 'Juneteenth'],
  ['7/4', 'Independence Day'],
  ['11/11', 'Veterans Day'],
  ['12/25', 'Christmas Day'],
])

/** @param {number} n 1-based nth (e.g. 3 = third Monday) */
function nthWeekday(year, monthIndex, weekdayMon0, n) {
  const first = new Date(year, monthIndex, 1)
  const jsDow = first.getDay()
  const mondayFirst = (jsDow + 6) % 7
  const target = weekdayMon0
  let delta = (target - mondayFirst + 7) % 7
  return 1 + delta + (n - 1) * 7
}

function lastWeekday(year, monthIndex, weekdayMon0) {
  let d = new Date(year, monthIndex + 1, 0).getDate()
  while (d >= 1) {
    const mf = (new Date(year, monthIndex, d).getDay() + 6) % 7
    if (mf === weekdayMon0) return d
    d -= 1
  }
  return 1
}

function thanksgivingDay(year) {
  return nthWeekday(year, 10, 3, 4)
}
