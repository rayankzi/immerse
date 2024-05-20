import "~/styles/global.css"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { UrlTable } from "~/components/url-table"
import { columns, entries } from "~/components/url-table/columns"

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

          <UrlTable columns={columns} data={entries} />
        </div>
      </div>
    </div>
  )
}

export default Options
