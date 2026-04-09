/**
 * @param {{
 *   monthLabel: string,
 *   monthNotes: string,
 *   onMonthNotesChange: (v: string) => void,
 *   selectionSummary: string | null,
 *   rangeNotes: string,
 *   onRangeNotesChange: (v: string) => void,
 * }} props
 */
export function NotesPanel({
  monthLabel,
  monthNotes,
  onMonthNotesChange,
  selectionSummary,
  rangeNotes,
  onRangeNotesChange,
}) {
  return (
    <section className="notes-panel" aria-label="Notes">
      <h2 className="notes-panel__title">Notes</h2>
      <div className="notes-panel__lined notes-panel__lined--month">
        <label className="visually-hidden" htmlFor="month-notes">
          Notes for {monthLabel}
        </label>
        <textarea
          id="month-notes"
          className="notes-panel__textarea"
          placeholder="Jot down plans for this month…"
          value={monthNotes}
          onChange={(e) => onMonthNotesChange(e.target.value)}
          rows={8}
        />
      </div>

      {selectionSummary ? (
        <div className="notes-panel__selection">
          <p className="notes-panel__selection-label">{selectionSummary}</p>
          <div className="notes-panel__lined notes-panel__lined--range">
            <label className="visually-hidden" htmlFor="range-notes">
              Notes for selected dates
            </label>
            <textarea
              id="range-notes"
              className="notes-panel__textarea notes-panel__textarea--sm"
              placeholder="Notes for this selection…"
              value={rangeNotes}
              onChange={(e) => onRangeNotesChange(e.target.value)}
              rows={4}
            />
          </div>
        </div>
      ) : null}
    </section>
  )
}
