import type { ColumnDef } from "@tanstack/react-table"
import { Loader } from "lucide-react"

import { Badge } from "~/components/ui/badge"
import { DataTable } from "~components/data-table"
import type { Task } from "~types"

import { UrlCreateForm } from "./url-create-form"

interface TaskTableProps {
  data: Task[]
}

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "description",
    header: "Description"
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({
      row: {
        original: { priority }
      }
    }) => <Badge variant="outline">{priority}</Badge>
  },
  {
    accessorKey: "completed",
    header: "Completed"
  }
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const urlEntry = row.original

  //     return <UrlEditForm ogData={urlEntry} />
  //   }
  // }
]

const TaskTable = ({ data }: TaskTableProps) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchTerm="description"
      title="Tasks"
      description="Manage what you have to do today.">
      <UrlCreateForm />
    </DataTable>
  )
}

export const RenderTaskTable = ({ tasks }: { tasks: Task[] | null }) => {
  if (tasks) return <TaskTable data={tasks} />
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
