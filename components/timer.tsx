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
  const [progress, setProgress] = useState(100) // Start at 100%
  const [isRunning, setIsRunning] = useState(false) // Timer running state
  const [duration] = useState(initialDuration) // Duration of the timer in seconds
  const [timeLeft, setTimeLeft] = useState(initialDuration) // Time left in seconds
  const intervalRef = useRef(null) // Ref to store the interval ID
  const [destructiveButton, setDestructiveButton] =
    useState<DestructiveButton>("none")

  const onTimerFinish = () =>
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} Timer has finished!`)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            setIsRunning(false)
            onTimerFinish()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else clearInterval(intervalRef.current)

    return () => clearInterval(intervalRef.current)
  }, [isRunning])

  useEffect(() => {
    setProgress((timeLeft / duration) * 100)
  }, [timeLeft, duration])

  const startTimer = () => {
    if (timeLeft > 0) setIsRunning(true)
    setDestructiveButton("stop")
  }
  const stopTimer = () => {
    setIsRunning(false)
    setDestructiveButton("reset")
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(initialDuration)
    setProgress(100)
    setDestructiveButton("none")
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`
  }

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
        <CircularProgressBar progress={progress} size={110}>
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
