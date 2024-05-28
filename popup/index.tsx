import { useStorage } from "@plasmohq/storage/hook"

import "~/styles/global.css"

import { ConciseUrlTable } from "~/components/url-table/concise"
import type { UrlEntry } from "~/types"
import { buttonVariants } from "~components/ui/button"
import { cn } from "~lib/utils"

const Popup = () => {
  const [urlEntries] = useStorage<UrlEntry[]>("url-entries")

  return (
    <div className="px-10 py-5 scrollbar-hide">
      <h1 className="text-3xl font-bold mb-4 whitespace-nowrap">
        Time to <span className="text-sky-500">Immerse</span> Yourself!
      </h1>

      <p className="text-lg font-medium">
        "We cannot solve problems with the kind of thinking we employed when we
        came up with them."
      </p>
      <p className="text-base mb-4 text-right">- Albert Einstein</p>

      <h2 className="text-2xl font-bold mt-2">URLs Table</h2>

      {urlEntries ? <ConciseUrlTable data={urlEntries} /> : <p></p>}

      <a
        href="/tabs/pomodoro-timer.html"
        target="_blank"
        className={cn(buttonVariants({ variant: "link" }), "-ml-3 mt-3")}>
        Go to Pomodoro Timer
      </a>
    </div>
  )
}

export default Popup
