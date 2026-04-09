import { startOfDay } from './calendar.js'

const PREFIX = 'wall-cal:'

/** @param {Date} d */
function dayKey(d) {
  const x = startOfDay(d)
  const y = x.getFullYear()
  const m = String(x.getMonth() + 1).padStart(2, '0')
  const day = String(x.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** @param {number} year @param {number} monthIndex */
export function monthNotesKey(year, monthIndex) {
  return `${PREFIX}month-${year}-${monthIndex}`
}

/** @param {Date} a @param {Date} b */
export function rangeNotesKey(a, b) {
  const ka = dayKey(a)
  const kb = dayKey(b)
  const [first, second] = ka <= kb ? [ka, kb] : [kb, ka]
  return `${PREFIX}range-${first}_${second}`
}

/** @param {string} key */
export function loadNote(key) {
  try {
    return localStorage.getItem(key) ?? ''
  } catch {
    return ''
  }
}

/** @param {string} key @param {string} value */
export function saveNote(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* ignore quota */
  }
}
