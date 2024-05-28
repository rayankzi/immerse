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

interface ConciseUrlTableProps {
  data: UrlEntry[]
}

export const ConciseUrlTable = ({ data }: ConciseUrlTableProps) => {
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
