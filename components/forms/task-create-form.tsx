import { zodResolver } from "@hookform/resolvers/zod"
import { PlusCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
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
import type { Task } from "~/types"

const formSchema = z.object({
  description: z.string().min(2).max(100),
  priority: z.string().min(2)
})

type PriorityType = "low" | "medium" | "high"

export const TaskCreateForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      priority: "low"
    }
  })
  const [tasks, setTasks] = useStorage<Task[]>("tasks")
  const { toast } = useToast()

  const onSubmit = ({ description, priority }: z.infer<typeof formSchema>) => {
    const id = uuidv4()

    if (tasks.filter((entry) => entry.description === description).length > 0) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "You already put this down!"
      })
      return
    }

    setTasks([
      ...tasks,
      { id, description, priority: priority as PriorityType, completed: false }
    ])
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Task
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Track what you have to do today.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Do the dishes" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is a description of the tasky.
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
