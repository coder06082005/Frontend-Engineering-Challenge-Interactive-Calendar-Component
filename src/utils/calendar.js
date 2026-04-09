/** @param {Date} d */
export function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

/** @param {Date} a @param {Date} b */
export function compareDay(a, b) {
  return startOfDay(a).getTime() - startOfDay(b).getTime()
}

/** Monday = 0 … Sunday = 6 */
export function weekdayMondayFirst(date) {
  const sun = date.getDay()
  return sun === 0 ? 6 : sun - 1
}

/**
 * @param {number} year
 * @param {number} monthIndex 0–11
 * @returns {{ date: Date, inCurrentMonth: boolean }[]}
 */
export function getMonthCells(year, monthIndex) {
  const first = new Date(year, monthIndex, 1)
  const lead = weekdayMondayFirst(first)
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const prevMonthLast = new Date(year, monthIndex, 0)
  const prevYear = prevMonthLast.getFullYear()
  const prevMon = prevMonthLast.getMonth()
  const prevDays = prevMonthLast.getDate()

  const cells = []

  for (let i = 0; i < lead; i++) {
    const dayNum = prevDays - lead + i + 1
    cells.push({
      date: new Date(prevYear, prevMon, dayNum),
      inCurrentMonth: false,
    })
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      date: new Date(year, monthIndex, d),
      inCurrentMonth: true,
    })
  }

  const remainder = cells.length % 7
  const tail = remainder === 0 ? 0 : 7 - remainder
  const nextMonthStart = new Date(year, monthIndex + 1, 1)
  const ny = nextMonthStart.getFullYear()
  const nm = nextMonthStart.getMonth()

  for (let d = 1; d <= tail; d++) {
    cells.push({
      date: new Date(ny, nm, d),
      inCurrentMonth: false,
    })
  }

  return cells
}

export const MONTH_NAMES = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
]

export const WEEKDAY_LABELS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

/** @param {Date} date */
export function isWeekend(date) {
  const d = date.getDay()
  return d === 0 || d === 6
}

/** @param {Date} d @param {Date|null} start @param {Date|null} end */
export function isInSelectedRange(d, start, end) {
  if (!start || !end) return false
  const t = startOfDay(d).getTime()
  const a = startOfDay(start).getTime()
  const b = startOfDay(end).getTime()
  const lo = Math.min(a, b)
  const hi = Math.max(a, b)
  return t >= lo && t <= hi
}

function minMaxStartEnd(start, end) {
  if (!start || !end) return { lo: null, hi: null }
  const a = startOfDay(start).getTime()
  const b = startOfDay(end).getTime()
  return {
    lo: new Date(Math.min(a, b)),
    hi: new Date(Math.max(a, b)),
  }
}

/** @param {Date} d */
export function isRangeEndpoint(d, start, end) {
  const { lo, hi } = minMaxStartEnd(start, end)
  if (!lo || !hi) return false
  const t = startOfDay(d).getTime()
  return t === lo.getTime() || t === hi.getTime()
}
