import { CalendarWall } from './components/CalendarWall.jsx'
import './App.css'

export default function App() {
  return (
    <div className="app-shell">
      <div className="wall-scene">
        <div className="wall-mount">
          <div className="wall-nail" aria-hidden="true" />
          <div className="wall-calendar-rot">
            <CalendarWall />
          </div>
        </div>
      </div>
    </div>
  )
}
