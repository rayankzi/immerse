import { useReducer } from "react"

import "~/styles/global.css"

import { Pomodoro } from "~/components/pomodoro"
import { Button } from "~/components/ui/button"

const Popup = () => {
  const [count, increase] = useReducer((c) => c + 1, 0)

  return (
    <div>
      <Pomodoro />
    </div>
  )
}

export default Popup
