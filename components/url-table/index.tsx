import type { ColumnDef } from "@tanstack/react-table"
import { Loader } from "lucide-react"

import { Badge } from "~/components/ui/badge"
import { UrlCreateForm } from "~/components/url-create-form"
import { UrlEditForm } from "~/components/url-edit-forn"
import { DataTable } from "~components/data-table"
import type { UrlEntry } from "~types"

interface UrlTableProps {
  data: UrlEntry[]
}

const columns: ColumnDef<UrlEntry>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "blocked",
    header: "Blocked",
    cell: ({
      row: {
        original: { blocked }
      }
    }) => <Badge variant="outline">{blocked}</Badge>
  },
  {
    accessorKey: "url",
    header: "URL"
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const urlEntry = row.original

      return <UrlEditForm ogData={urlEntry} />
    }
  }
]

const UrlTable = ({ data }: UrlTableProps) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      title="URL Entries"
      description="Manage your URLs and if they are blocked or not">
      <UrlCreateForm />
    </DataTable>
  )
}

export const RenderUrlTable = ({
  urlEntries
}: {
  urlEntries: UrlEntry[] | null
}) => {
  if (urlEntries) return <UrlTable data={urlEntries} />
  else
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
}
