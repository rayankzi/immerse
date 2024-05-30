import type { ColumnDef } from "@tanstack/react-table"
import { Loader } from "lucide-react"

import { TaskCreateForm } from "~/components/forms/task-create-form"
import { DataTable } from "~/components/tables/data-table"
import { Badge } from "~/components/ui/badge"
import { capitalize } from "~/lib/utils"
import type { Task } from "~/types"
import { TaskEditForm } from "~components/forms/task-edit-form"

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
    }) => <Badge variant="outline">{capitalize(priority)}</Badge>
  },
  {
    accessorKey: "completed",
    header: "Completed",
    cell: ({
      row: {
        original: { completed }
      }
    }) => <p>{capitalize(completed.toString())}</p>
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original

      return <TaskEditForm ogData={task} />
    }
  }
]

const TaskTable = ({ data }: TaskTableProps) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchTerm="description"
      title="Tasks"
      description="Manage what you have to do today.">
      <TaskCreateForm />
    </DataTable>
  )
}

export const RenderTaskTable = ({ tasks }: { tasks: Task[] | null }) => {
  const priorityOrder: Record<string, number> = {
    high: 1,
    medium: 2,
    low: 3
  }

  const sortedTasks = tasks.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  )

  if (tasks) return <TaskTable data={sortedTasks} />
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
