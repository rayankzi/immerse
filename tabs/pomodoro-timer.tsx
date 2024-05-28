import "../styles/global.css"

import { Pomodoro } from "~/components/pomodoro"

const PomodoroTimerPage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 md:px-6 bg-slate-50">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-center">
          Pomodoro Timer
        </h1>
      </div>
      <Pomodoro />
    </main>
  )
}

export default PomodoroTimerPage

// chrome-extension://jcgcbfhinbchhadlepajoiaehmkmjoaj/tabs/pomodoro-timer.html
