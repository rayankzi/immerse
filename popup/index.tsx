import { useReducer } from "react"

import "~/styles/global.css"

import { Button } from "~/components/ui/button"

const Popup = () => {
  const [count, increase] = useReducer((c) => c + 1, 0)

  return <Button onClick={() => increase()}>Count: {count}</Button>
}

export default Popup
