import "~/styles/global.css"

import { Loader } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

import { useStorage } from "@plasmohq/storage/hook"

import { Toaster } from "~/components/ui/toaster"
import { UrlCreateForm } from "~/components/url-create-form"
import { UrlTable } from "~/components/url-table"
import { columns } from "~/components/url-table/columns"
import type { UrlEntry } from "~types"

const defaultEntries: UrlEntry[] = [
  {
    id: uuidv4(),
    name: "YouTube",
    url: "https://www.youtube.com/",
    enabled: "Yes"
  },
  {
    id: uuidv4(),
    name: "TikTok",
    url: "https://www.tiktok.com/",
    enabled: "Yes"
  },
  {
    id: uuidv4(),
    name: "Instagram",
    url: "https://www.instagram.com/",
    enabled: "Yes"
  }
]

const Options = () => {
  const [urlEntries, setUrlEntries] = useStorage<UrlEntry[]>(
    "url-entries",
    (entries) => (entries === undefined ? defaultEntries : entries)
  )

  return (
    <div className="container mx-auto max-w-2xl py-12">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Options
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Configure which URLs should be blacklisted here.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center">
            <UrlCreateForm />
          </div>

          {urlEntries ? (
            <UrlTable columns={columns} data={urlEntries} />
          ) : (
            <div className="flex h-[50vh] w-full items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <Loader className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">Loading...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Toaster />
    </div>
  )
}

export default Options
