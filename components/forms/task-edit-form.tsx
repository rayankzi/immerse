import { zodResolver } from "@hookform/resolvers/zod"
import { MoreHorizontal } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useStorage } from "@plasmohq/storage/hook"

import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/components/ui/select"
import { useToast } from "~/components/ui/use-toast"
import type { PriorityType, Task } from "~/types"

const formSchema = z.object({
  description: z.string().min(2).max(100),
  priority: z.string().min(2)
})

interface TaskEditFormProps {
  ogData: Task
}

export const TaskEditForm = ({ ogData }: TaskEditFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: ogData.description,
      priority: ogData.priority
    }
  })
  const [tasks, setTasks] = useStorage<Task[]>("tasks")
  const { toast } = useToast()

  const onSubmit = ({ description, priority }: z.infer<typeof formSchema>) => {
    const updatedTasks = tasks.map((task) =>
      task.description === task.description
        ? { ...task, description, priority: priority as PriorityType }
        : task
    )

    setTasks(updatedTasks)

    toast({
      description: `Task successfully updated to "${description}"`
    })
  }

  const switchCompletedState = () => {
    const updatedTasks = tasks.map((task) =>
      task.completed === ogData.completed
        ? { ...task, blocked: !ogData.completed }
        : task
    ) as Task[]

    setTasks(updatedTasks)
  }

  const deleteTask = () => {
    const updatedTasks = tasks.filter(
      (task) => task.description !== ogData.description
    )
    setTasks(updatedTasks)

    toast({
      description: `Task successfully deleted`
    })
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => switchCompletedState()}>
            {ogData.completed ? "Mark as Uncompleted" : "Mark as Completed"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem>Edit Row</DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem onClick={() => deleteTask()}>
            Delete Row
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>Edit an existing task here.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="YouTube" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of the platform.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="How important is your task?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>How important the task is</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogClose>
              <Button type="submit">Submit</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
