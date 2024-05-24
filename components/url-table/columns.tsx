import type { ColumnDef } from "@tanstack/react-table"

import type { UrlEntry } from "~/types"
import { UrlEditForm } from "~components/url-edit-forn"

export const entries: UrlEntry[] = [
  {
    name: "Youtube",
    url: "https://www.youtube.com/",
    enabled: "Yes",
    id: "qw"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/",
    enabled: "No",
    id: "s"
  }
]

export const columns: ColumnDef<UrlEntry>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "enabled",
    header: "Enabled"
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
