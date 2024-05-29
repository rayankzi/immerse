import type { ColumnDef } from "@tanstack/react-table"
import { Loader } from "lucide-react"

import { UrlCreateForm } from "~/components/forms/url-create-form"
import { UrlEditForm } from "~/components/forms/url-edit-forn"
import { Badge } from "~/components/ui/badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "~/components/ui/table"
import type { UrlEntry } from "~/types"
import { DataTable } from "~components/tables/data-table"

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
      searchTerm="name"
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

export const ConciseUrlTable = ({ data }: UrlTableProps) => {
  return (
    <Table className="scrollbar-hide">
      <TableCaption>
        <a href="/options.html" target="_blank">
          Manage them here.
        </a>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Blocked</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((urlEntry) => (
          <TableRow key={urlEntry.id}>
            <TableCell className="font-medium">{urlEntry.name}</TableCell>
            <TableCell>{urlEntry.url}</TableCell>
            <TableCell>{urlEntry.blocked}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
