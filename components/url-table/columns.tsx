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

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(urlEntry.url)}>
              Copy URL
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Disable</DropdownMenuItem>
            <DropdownMenuItem>Edit Row</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
