import {
  getMonthCells,
  isInSelectedRange,
  isRangeEndpoint,
  isWeekend,
  WEEKDAY_LABELS,
} from '../utils/calendar.js'
import { getHolidayLabel } from '../utils/holidays.js'

/**
 * @param {{
 *   year: number,
 *   monthIndex: number,
 *   rangeStart: Date | null,
 *   rangeEnd: Date | null,
 *   onDayPointerDown: (date: Date, inCurrentMonth: boolean) => void,
 * }} props
 */
export function CalendarGrid({ year, monthIndex, rangeStart, rangeEnd, onDayPointerDown }) {
  const cells = getMonthCells(year, monthIndex)

  return (
    <div className="calendar-grid-wrap">
      <div className="weekday-row" role="row">
        {WEEKDAY_LABELS.map((label, i) => (
          <div
            key={label}
            role="columnheader"
            className={
              i >= 5 ? 'weekday-cell weekday-cell--weekend' : 'weekday-cell'
            }
          >
            {label}
          </div>
        ))}
      </div>
      <div className="calendar-grid" role="grid" aria-label="Calendar dates">
        {cells.map(({ date, inCurrentMonth }, idx) => {
          const weekend = isWeekend(date)
          const holiday =
            inCurrentMonth ? getHolidayLabel(year, monthIndex, date.getDate()) : null
          const inRange =
            inCurrentMonth &&
            rangeStart &&
            rangeEnd &&
            isInSelectedRange(date, rangeStart, rangeEnd)
          const endpoint =
            inCurrentMonth &&
            rangeStart &&
            rangeEnd &&
            isRangeEndpoint(date, rangeStart, rangeEnd)

          let cellClass = 'calendar-cell'
          if (!inCurrentMonth) cellClass += ' calendar-cell--muted'
          else if (weekend) cellClass += ' calendar-cell--weekend'
          if (holiday) cellClass += ' calendar-cell--holiday'
          if (inRange) cellClass += ' calendar-cell--in-range'
          if (endpoint) cellClass += ' calendar-cell--range-endpoint'

          const label =
            holiday != null
              ? `${date.getDate()} — ${holiday}. Select a date range with two taps.`
              : `Day ${date.getDate()}`

          return (
            <button
              key={`${date.toISOString()}-${idx}`}
              type="button"
              role="gridcell"
              disabled={!inCurrentMonth}
              className={cellClass}
              title={holiday ?? undefined}
              aria-label={inCurrentMonth ? label : undefined}
              onPointerDown={(e) => {
                e.preventDefault()
                onDayPointerDown(date, inCurrentMonth)
              }}
            >
              <span className="calendar-cell__num">{date.getDate()}</span>
              {holiday ? (
                <span className="calendar-cell__holiday-dot" aria-hidden="true" />
              ) : null}
            </button>
          )
        })}
      </div>
      <p className="calendar-grid__hint">
        <span className="calendar-grid__hint-dot" aria-hidden="true" /> US federal / notable
        holidays (static rules). Drag-free range: tap start, then end day.
      </p>
    </div>
  )
}
