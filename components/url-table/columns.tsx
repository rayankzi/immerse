import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: "url",
    header: "URL"
  },
  {
    accessorKey: "enabled",
    header: "Enabled"
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const urlEntry = row.original

      return <UrlEditForm ogData={urlEntry} />
    }
  }
]
