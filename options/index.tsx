import "~/styles/global.css"

import {
  Folder,
  Globe,
  Loader,
  PanelLeft,
  Settings,
  SquareCheckBig
} from "lucide-react"
import { v4 as uuidv4 } from "uuid"

import { useStorage } from "@plasmohq/storage/hook"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "~/components/ui/breadcrumb"
import { Button } from "~/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Toaster } from "~/components/ui/toaster"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "~/components/ui/tooltip"
import { UrlTable } from "~/components/url-table"
import { columns } from "~/components/url-table/columns"
import type { UrlEntry } from "~/types"

const defaultEntries: UrlEntry[] = [
  {
    id: uuidv4(),
    name: "YouTube",
    url: "https://www.youtube.com/",
    blocked: "Yes"
  },
  {
    id: uuidv4(),
    name: "TikTok",
    url: "https://www.tiktok.com/",
    blocked: "Yes"
  },
  {
    id: uuidv4(),
    name: "Instagram",
    url: "https://www.instagram.com/",
    blocked: "Yes"
  }
]

const Options = () => {
  const [urlEntries, setUrlEntries] = useStorage<UrlEntry[]>(
    "url-entries",
    (entries) => (entries === undefined ? defaultEntries : entries)
  )

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-gray-100">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-white sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <a
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-black text-lg font-semibold text-white md:h-8 md:w-8 md:text-base">
              <Folder className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Options</span>
            </a>

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-[color:hsl(215.4,16.3%,46.9%)] transition-colors hover:text-[color:hsl(222.2,84%,4.9%)] md:h-8 md:w-8">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">URLs</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right">URLs</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-[color:hsl(210,40%,96.1%)] text-[color:hsl(222.2,47.4%,11.2%)] transition-colors hover:text-[color:hsl(222.2,84%,4.9%)] md:h-8 md:w-8">
                  <SquareCheckBig className="h-5 w-5" />
                  <span className="sr-only">Tasks</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right">Tasks</TooltipContent>
            </Tooltip>
          </nav>

          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-[color:hsl(215.4,16.3%,46.9%)] transition-colors hover:text-[color:hsl(222.2,84%,4.9%)] md:h-8 md:w-8">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </nav>
        </aside>

        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <a
                    href="#"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[color:hsl(222.2,47.4%,11.2%)] text-lg font-semibold text-[color:hsl(210,40%,98%)] md:text-base">
                    <Folder className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">Options</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-[color:hsl(215.4,16.3%,46.9%)] hover:text-[color:hsl(222.2,84%,4.9%)]">
                    <Globe className="h-5 w-5" />
                    URLs
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-[color:hsl(215.4,16.3%,46.9%)] hover:text-[color:hsl(222.2,84%,4.9%)]">
                    <SquareCheckBig className="h-5 w-5" />
                    Tasks
                  </a>
                </nav>
              </SheetContent>
            </Sheet>

            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <a href="#">Immerse</a>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <a href="#">Options</a>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage>URLs</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

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
    </TooltipProvider>
  )
}

export default Options
