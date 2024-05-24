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
import { useToast } from "~/components/ui/use-toast"
import type { UrlEntry } from "~/types"

const formSchema = z.object({
  name: z.string().min(2).max(60),
  url: z.string().url().min(2)
})

export const UrlCreateForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      url: ""
    }
  })
  const [urlEntries, setUrlEntries] = useStorage<UrlEntry[]>("url-entries")
  const { toast } = useToast()

  const onSubmit = ({ name, url }: z.infer<typeof formSchema>) => {
    const id = uuidv4()

    if (urlEntries.filter((entry) => entry.name === name).length > 0) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "An entry already has this name!"
      })
      return
    }
    if (urlEntries.filter((entry) => entry.url === url).length > 0) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "An entry already has this URL!"
      })
      return
    }

    setUrlEntries([
      ...urlEntries,
      { id, name: name.trim(), url: url.trim(), enabled: "Yes" }
    ])
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add URL
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add URL</DialogTitle>
          <DialogDescription>Add a URL to block.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <FormField
              control={form.control}
              name="name"
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
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.youtube.com/" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the URL you want blacklisted.
                  </FormDescription>
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
