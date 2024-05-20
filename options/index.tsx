import "~/styles/global.css"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

const Options = () => {
  return (
    <div className="container mx-auto max-w-2xl py-12">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Options
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Customize your options below.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              className="flex-1"
              placeholder="Enter an option"
              type="text"
            />
            <Button>Add</Button>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-medium text-base">
                  https://www.youtube.com/
                </p>
                <Button size="icon" variant="ghost">
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium text-base">Option 2</p>
                <Button size="icon" variant="ghost">
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium text-base">Option 3</p>
                <Button size="icon" variant="ghost">
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export default Options
