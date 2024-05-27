import { Storage } from "@plasmohq/storage"

const main = async () => {
  const storage = new Storage({
    area: "local",
    copiedKeyList: ["shield-modulation"]
  })

  let timerDuration = 25 * 60 // 25 minutes in seconds
  let timeLeft: number = timerDuration
  let timerInterval: NodeJS.Timeout | null = null

  const onTimerFinish = () => {
    console.log("Timer finished")
  }

  const startTimer = () => {
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

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval as NodeJS.Timeout)
      timerInterval = null
    }
  }

  const resetTimer = async () => {
    stopTimer()
    timeLeft = timerDuration
    await storage.set("time-left", timeLeft)
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "start") startTimer()
    else if (message.action === "stop") stopTimer()
    else if (message.action === "reset") resetTimer()
    else if (message.action === "getTime") sendResponse({ timeLeft })
  })
}

main()
export {}
