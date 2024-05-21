import "~/styles/global.css"

import { useStorage } from "@plasmohq/storage/hook"

import { UrlCreateForm } from "~/components/url-create-form"
import { UrlTable } from "~/components/url-table"
import { columns, entries } from "~/components/url-table/columns"

const Options = () => {
  const [checked, setChecked] = useStorage("checked", true)

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

          <UrlTable columns={columns} data={entries} />
        </div>
      </div>
    </div>
  )
}

export default Options
