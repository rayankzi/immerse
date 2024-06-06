import { useStorage } from "@plasmohq/storage/hook"

import "~/styles/global.css"

import { useEffect, useState } from "react"

import { ConciseUrlTable } from "~/components/tables/url-table"
import { buttonVariants } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/components/ui/card"
import { Skeleton } from "~/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
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
        Time to <span className="text-blue-500">Immerse</span> Yourself!
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

      <Tabs defaultValue="urls" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="urls">URLs</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="urls">
          <Card>
            <CardHeader>
              <CardTitle>URLs</CardTitle>
              <CardDescription>
                Look at which URLs you have blocked.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {urlEntries ? <ConciseUrlTable data={urlEntries} /> : <p></p>}
            </CardContent>

            <CardFooter
              className={cn(
                buttonVariants({ variant: "link" }),
                "cursor-pointer pb-7 ml-2"
              )}>
              <a href="/options.html" target="_blank">
                Manage URLs here
              </a>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
              <CardDescription>
                Look at what you have to do today.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-4">
                {tasks?.map((task) => (
                  <li className="flex items-center space-x-3" key={task.id}>
                    <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <span className="flex-1 text-gray-900 dark:text-gray-50 text-base">
                      {task.description}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter
              className={cn(
                buttonVariants({ variant: "link" }),
                "cursor-pointer pb-7 ml-2"
              )}>
              <a href="/options.html" target="_blank">
                Mark them as complete here
              </a>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col items-start">
        <a
          href="/tabs/pomodoro-timer.html"
          target="_blank"
          className={cn(buttonVariants({ variant: "link" }), "-ml-3 mt-3")}>
          Go to Pomodoro Timer{" "}
        </a>

        <a
          href="/options.html"
          target="_blank"
          className={cn(buttonVariants({ variant: "link" }), "-ml-3")}>
          Go to Settings{" "}
        </a>
      </div>
    </div>
  )
}

export default Popup
