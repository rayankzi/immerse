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
import type { UrlEntry } from "~/types"

const formSchema = z.object({
  name: z.string().min(2).max(60),
  url: z.string().url().min(2)
})

interface UrlEditFormProps {
  ogData: UrlEntry
}

export const UrlEditForm = ({ ogData }: UrlEditFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ogData.name,
      url: ogData.url
    }
  })
  const [urlEntries, setUrlEntries] = useStorage<UrlEntry[]>("url-entries")

  const onSubmit = ({ name, url }: z.infer<typeof formSchema>) => {
    const updatedEntries = urlEntries.map((urlEntry) =>
      urlEntry.url === ogData.url ? { ...urlEntry, name, url } : urlEntry
    )

    setUrlEntries(updatedEntries)
  }

  const switchBlockedState = () => {
    const newBlockedState = ogData.blocked === "Yes" ? "No" : "Yes"
    const updatedEntries = urlEntries.map((urlEntry) =>
      urlEntry.url === ogData.url
        ? { ...urlEntry, blocked: newBlockedState }
        : urlEntry
    ) as UrlEntry[]

    setUrlEntries(updatedEntries)
  }

  const deleteEntry = () => {
    const updatedEntries = urlEntries.filter(
      (urlEntry) => urlEntry.url !== ogData.url
    )
    setUrlEntries(updatedEntries)
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
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(ogData.url)}>
            Copy URL
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => switchBlockedState()}>
            {ogData.blocked === "Yes" ? "Unblock" : "Block"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem>Edit Row</DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem onClick={() => deleteEntry()}>
            Delete Row
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit URL</DialogTitle>
          <DialogDescription>Edit an existing URL here.</DialogDescription>
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
