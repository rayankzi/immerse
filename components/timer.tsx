import { useEffect, useRef, useState } from "react"

import { CircularProgressBar } from "~/components/circular-progress-bar"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/components/ui/card"

interface TimerProps {
  type: "pomodoro" | "long" | "short"
  initialDuration: number
}

type DestructiveButton = "none" | "stop" | "reset"

export const Timer = ({ type, initialDuration }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialDuration) // Time left in seconds
  const totalTime = initialDuration
  const [destructiveButton, setDestructiveButton] =
    useState<DestructiveButton>("none")

  const onTimerFinish = () =>
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} Timer has finished!`)

  useEffect(() => {
    const getTimeFromBackground = () => {
      chrome.runtime.sendMessage({ action: "getTime" }, (response) => {
        setTimeLeft(response.timeLeft)
      })
    }

    getTimeFromBackground()
    const interval = setInterval(getTimeFromBackground, 1000)
    return () => clearInterval(interval)
  }, [])

  const startTimer = () => {
    chrome.runtime.sendMessage({ action: "start" })
    setDestructiveButton("stop")
  }
  const stopTimer = () => {
    chrome.runtime.sendMessage({ action: "stop" })
    setDestructiveButton("reset")
  }

  const resetTimer = () => {
    chrome.runtime.sendMessage({ action: "reset" })
    setTimeLeft(initialDuration)
    setDestructiveButton("none")
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`
  }

  const getProgress = () => (timeLeft / totalTime) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {type === "pomodoro" && "Pomodoro Timer"}
          {type === "long" && "Long Break"}
          {type === "short" && "Short Break"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <CircularProgressBar progress={getProgress()} size={110}>
          {formatTime(timeLeft)}
        </CircularProgressBar>
      </CardContent>
      <CardFooter className="flex items-center justify-center space-x-4">
        <Button
          className="bg-green-500 hover:bg-green-600"
          onClick={startTimer}>
          Start
        </Button>
        <Button
          variant={destructiveButton === "stop" ? "destructive" : "outline"}
          onClick={stopTimer}>
          Stop
        </Button>
        <Button
          variant={destructiveButton === "reset" ? "destructive" : "outline"}
          onClick={resetTimer}>
          Reset
        </Button>
      </CardFooter>
    </Card>
  )
}
