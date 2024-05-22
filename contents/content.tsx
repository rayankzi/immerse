import styleText from "data-text:../styles/global.css"
import type { PlasmoGetStyle } from "plasmo"

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}

const CustomButton = () => {
  return <p className="text-red-500">{window.location.href}</p>
}

export default CustomButton
