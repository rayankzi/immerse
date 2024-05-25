import type { ColumnDef } from "@tanstack/react-table"

import { Badge } from "~/components/ui/badge"
import { UrlEditForm } from "~/components/url-edit-forn"
import type { UrlEntry } from "~/types"

export const entries: UrlEntry[] = [
  {
    name: "Youtube",
    url: "https://www.youtube.com/",
    blocked: "Yes",
    id: "qw"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/",
    blocked: "No",
    id: "s"
  }
]

export const columns: ColumnDef<UrlEntry>[] = [
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
