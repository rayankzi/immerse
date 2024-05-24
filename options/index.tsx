import "~/styles/global.css"

import { Loader } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

import { useStorage } from "@plasmohq/storage/hook"

import { Toaster } from "~/components/ui/toaster"
import { UrlTable } from "~/components/url-table"
import { columns } from "~/components/url-table/columns"
import type { UrlEntry } from "~/types"

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
    <>
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

      <Toaster />
    </>
  )
}

export default Options
