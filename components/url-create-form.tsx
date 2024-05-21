import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { z } from "zod"

import { useStorage } from "@plasmohq/storage/hook"

import { Button } from "~/components/ui/button"
import {
  Dialog,
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
import type { UrlEntry } from "~types"

const formSchema = z.object({
  name: z.string().min(2).max(60),
  url: z.string().url().min(2)
})

const defaultEntries: UrlEntry[] = [
  {
    id: uuidv4(),
    name: "YouTube",
    url: "https://www.youtube.com/",
    enabled: "Yes"
  },
  {
    id: uuidv4(),
    name: "TikTok",
    url: "https://www.tiktok.com/",
    enabled: "Yes"
  },
  {
    id: uuidv4(),
    name: "Instagram",
    url: "https://www.instagram.com/",
    enabled: "Yes"
  }
]

export const UrlCreateForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      url: ""
    }
  })
  const [urlEntries, setUrlEntries] = useStorage<UrlEntry[]>(
    "url-entries",
    defaultEntries
  )

  const onSubmit = ({ name, url }: z.infer<typeof formSchema>) => {
    const id = uuidv4()
    setUrlEntries([...urlEntries, { id, name, url, enabled: "Yes" }])
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add URL</Button>
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
