import { useStorage } from "@plasmohq/storage/hook"

import "~/styles/global.css"

import { useEffect, useState } from "react"

import { ConciseUrlTable } from "~/components/tables/url-table"
import { buttonVariants } from "~/components/ui/button"
import { Skeleton } from "~/components/ui/skeleton"
import { cn } from "~/lib/utils"
import type { Task, UrlEntry } from "~/types"

interface Quote {
  text: string
  author: string
}

const Popup = () => {
  const [urlEntries] = useStorage<UrlEntry[]>("url-entries")
  const [tasks] = useStorage<Task[]>("tasks")
  const [quote, setQuote] = useState<Quote | null>(null)

  useEffect(() => {
    fetch("https://zenquotes.io/api/random")
      .then((data) => data.json())
      .then((data) => data[0])
      .then((data) => setQuote({ text: data.q, author: data.a }))
      .catch(() => alert("Error occured"))
  }, [])

  return (
    <div className="px-10 py-5 scrollbar-hide">
      <h1 className="text-3xl font-bold mb-4 whitespace-nowrap">
        Time to <span className="text-sky-500">Immerse</span> Yourself!
      </h1>

      {quote ? (
        <div className="max-w-md p-6 rounded-lg bg-slate-50 shadow-md mb-5">
          <blockquote className="text-xl italic font-semibold text-gray-900 mb-4">
            {quote.text}
          </blockquote>
          <p className="text-right text-gray-700">- {quote.author}</p>
        </div>
      ) : (
        <div className="max-w-md p-6 rounded-lg bg-slate-50 shadow-md mb-5 space-y-2">
          <Skeleton className="h-6 w-[300px]" />
          <Skeleton className="h-6 w-[300px]" />
        </div>
      )}

      <div className="space-y-3">
        <h2 className="text-2xl font-bold my-2">Task List</h2>
        <ul className="list-none p-0">
          {tasks?.map((task) => (
            <li className="flex items-center justify-between p-2 mb-2 border rounded-md bg-white">
              <span className="flex-1" key={task.id}>
                {task.description}
              </span>
            </li>
          ))}
        </ul>

        <a
          href="/options.html"
          target="_blank"
          className={cn(buttonVariants({ variant: "link" }), "-ml-3 -mt-3")}>
          Manage tasks here
        </a>
      </div>

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
