import { Storage } from "@plasmohq/storage"

type DestructiveButton = "none" | "stop" | "reset"
type TimerType = "pomodoro" | "long" | "short"

const main = async () => {
  const storage = new Storage({
    area: "local",
    copiedKeyList: ["shield-modulation"]
  })

  const timerDurations = {
    pomodoro: 25 * 60, // 25 minutes
    shortBreak: 5 * 60, // 5 minutes
    longBreak: 15 * 60 // 15 minutes
  }

  let timerDuration = 25 * 60

  let timeLeft: number = timerDuration
  let timerInterval: NodeJS.Timeout | null = null
  let destructiveButton: DestructiveButton = "none"

  const onTimerFinish = () => {
    console.log("Timer finished")
  }

  const startTimer = async () => {
    destructiveButton = "stop"
    await storage.set("destructive-button", destructiveButton)

    if (timerInterval) return

    timerInterval = setInterval(async () => {
      timeLeft--
      if (timeLeft <= 0) {
        clearInterval(timerInterval)
        timerInterval = null
        timeLeft = 0
        await storage.set("time-left", timeLeft)
        onTimerFinish()
      }
      await storage.set("time-left", timeLeft)
    }, 1000)
  }

  const stopTimer = async () => {
    destructiveButton = "reset"
    await storage.set("destructive-button", destructiveButton)

    if (timerInterval) {
      clearInterval(timerInterval as NodeJS.Timeout)
      timerInterval = null
    }
  }

  const resetTimer = async () => {
    stopTimer()
    timeLeft = timerDuration
    await storage.set("time-left", timeLeft)

    destructiveButton = "none"
    await storage.set("destructive-button", destructiveButton)
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "start") startTimer()
    else if (message.action === "stop") stopTimer()
    else if (message.action === "reset") resetTimer()
    else if (message.action === "getTime") sendResponse({ timeLeft })
    else if (message.action === "getDestructiveButton")
      sendResponse({ destructiveButton })
  })
}

main()
export {}
