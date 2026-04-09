import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CalendarGrid } from './CalendarGrid.jsx'
import { NotesPanel } from './NotesPanel.jsx'
import { SpiralBinding } from './SpiralBinding.jsx'
import { MONTH_NAMES, compareDay, startOfDay } from '../utils/calendar.js'
import { SEASON_HERO_FOCUS, getSeason } from '../utils/holidays.js'
import { loadNote, monthNotesKey, rangeNotesKey, saveNote } from '../utils/storage.js'

export function CalendarWall() {
  /** Default matches reference artwork (January 2022). */
  const [viewYear, setViewYear] = useState(2022)
  const [viewMonth, setViewMonth] = useState(0)
  const [rangeStart, setRangeStart] = useState(null)
  const [rangeEnd, setRangeEnd] = useState(null)
  const [monthNotes, setMonthNotes] = useState('')
  const [rangeNotes, setRangeNotes] = useState('')
  const [pageTurn, setPageTurn] = useState(false)
  const turnTimer = useRef(null)

  const season = getSeason(viewMonth)
  const heroFocus = SEASON_HERO_FOCUS[season]

  const mKey = monthNotesKey(viewYear, viewMonth)

  useEffect(() => {
    setMonthNotes(loadNote(mKey))
  }, [mKey])

  useEffect(() => {
    setRangeStart(null)
    setRangeEnd(null)
  }, [viewYear, viewMonth])

  useEffect(() => {
    return () => {
      if (turnTimer.current) window.clearTimeout(turnTimer.current)
    }
  }, [])

  const rKey = useMemo(() => {
    if (!rangeStart || !rangeEnd) return null
    return rangeNotesKey(rangeStart, rangeEnd)
  }, [rangeStart, rangeEnd])

  useEffect(() => {
    if (!rKey) {
      setRangeNotes('')
      return
    }
    setRangeNotes(loadNote(rKey))
  }, [rKey])

  useEffect(() => {
    saveNote(mKey, monthNotes)
  }, [mKey, monthNotes])

  useEffect(() => {
    if (rKey) saveNote(rKey, rangeNotes)
  }, [rKey, rangeNotes])

  const handleDay = useCallback(
    (date, inCurrentMonth) => {
      if (!inCurrentMonth) return
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(startOfDay(date))
        setRangeEnd(null)
        return
      }
      const s = rangeStart
      const e = startOfDay(date)
      const first = compareDay(s, e) <= 0 ? s : e
      const last = compareDay(s, e) <= 0 ? e : s
      setRangeStart(first)
      setRangeEnd(last)
    },
    [rangeStart, rangeEnd]
  )

  const shiftMonth = (delta) => {
    if (turnTimer.current) window.clearTimeout(turnTimer.current)
    setPageTurn(true)
    turnTimer.current = window.setTimeout(() => {
      const d = new Date(viewYear, viewMonth + delta, 1)
      setViewYear(d.getFullYear())
      setViewMonth(d.getMonth())
      turnTimer.current = window.setTimeout(() => {
        setPageTurn(false)
        turnTimer.current = null
      }, 420)
    }, 160)
  }

  const selectionSummary = useMemo(() => {
    if (!rangeStart) return null
    if (!rangeEnd) {
      const opts = { month: 'short', day: 'numeric', year: 'numeric' }
      return `Selected: ${rangeStart.toLocaleDateString(undefined, opts)} — tap another day`
    }
    const opts = { month: 'short', day: 'numeric' }
    const a = rangeStart.toLocaleDateString(undefined, opts)
    const b = rangeEnd.toLocaleDateString(undefined, opts)
    return `Range: ${a} – ${b}`
  }, [rangeStart, rangeEnd])

  const monthTitle = `${MONTH_NAMES[viewMonth]}`
  const monthLabel = `${MONTH_NAMES[viewMonth]} ${viewYear}`

  return (
    <article className="calendar-page" data-season={season}>
      <div
        className={`calendar-page__inner ${pageTurn ? 'calendar-page__inner--page-turn' : ''}`}
      >
        <SpiralBinding />
        <header className="calendar-hero">
          <div className="calendar-hero__image-wrap">
            <img
              className="calendar-hero__image"
              src="/hero.jpg"
              alt="Mountain climber on an icy slope"
              width={1200}
              height={675}
              loading="lazy"
              style={{ objectPosition: heroFocus }}
            />
            <div className="calendar-hero__blue" aria-hidden="true" />
            <div className="calendar-hero__title-block">
              <p className="calendar-hero__year">{viewYear}</p>
              <h1 className="calendar-hero__month">{monthTitle}</h1>
              <div className="calendar-hero__nav">
                <button
                  type="button"
                  className="calendar-hero__nav-btn"
                  onClick={() => shiftMonth(-1)}
                  aria-label="Previous month"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="calendar-hero__nav-btn"
                  onClick={() => shiftMonth(1)}
                  aria-label="Next month"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="calendar-bottom">
          <NotesPanel
            monthLabel={monthLabel}
            monthNotes={monthNotes}
            onMonthNotesChange={setMonthNotes}
            selectionSummary={selectionSummary}
            rangeNotes={rangeNotes}
            onRangeNotesChange={setRangeNotes}
          />
          <CalendarGrid
            year={viewYear}
            monthIndex={viewMonth}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            onDayPointerDown={handleDay}
          />
        </div>
      </div>
    </article>
  )
}
