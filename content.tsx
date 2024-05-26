import styleText from "data-text:./styles/global.css"
import type { PlasmoGetStyle } from "plasmo"
import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import type { UrlEntry } from "~types"

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}

const Warning = () => {
  const [urls, setUrls] = useState<string[]>([])
  const [urlEntries, setUrlEntries] = useStorage<UrlEntry[]>("url-entries")
  const currentUrl = window.location.href

  useEffect(() => {
    if (urlEntries) {
      const newUrls = urlEntries.map(
        (entry) => entry.blocked === "Yes" && entry.url
      )
      setUrls(newUrls)
    }
  }, [urlEntries])

  if (urls.includes(currentUrl))
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <div className="text-center flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-black">
            What are you doing?
          </h1>
          <img
            src="https://media1.tenor.com/m/nCfArwGenA0AAAAd/the-rock-raising-eyebrow.gif"
            alt="A funny GIF"
            className="w-80 h-80"
          />
          <p className="text-5xl font-bold text-red-600 pt-4">
            GO BACK TO WORK!
          </p>
        </div>
      </div>
    )
  else return <></>
}

export default Warning
