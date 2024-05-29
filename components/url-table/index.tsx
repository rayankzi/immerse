import type { ColumnDef } from "@tanstack/react-table"

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

export const UrlTable = ({ data }: UrlTableProps) => {
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
