import styleText from "data-text:../styles/global.css"
import type { PlasmoGetStyle } from "plasmo"

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}

const CustomButton = () => {
  return (
    <></>
    // <div className="flex flex-col items-center justify-center justify-items-center min-h-screen pl-48">
    //   <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
    //     <h1 className="text-3xl font-bold mb-4 text-black">Uh Oh</h1>
    //     <p className="text-gray-500 dark:text-gray-400">
    //       Why are you here? Go back to working!
    //     </p>
    //   </div>
    // </div>
  )
}

export default CustomButton
