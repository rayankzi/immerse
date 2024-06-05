import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useStorage } from "@plasmohq/storage/hook"

import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { useToast } from "~/components/ui/use-toast"

const formSchema = z.object({
  url: z.string().url().min(2)
})

const SettingsForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: ""
    }
  })
  const { toast } = useToast()
  const [gifUrl, setGifUrl] = useStorage<string>("gif-url")

  const onSubmit = ({ url }: z.infer<typeof formSchema>) => {
    if (!url) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "You didn't type anything!"
      })
      return
    }

    setGifUrl(url)

    toast({
      description: "URL Successfully Set!"
    })
  }

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div>
        <h1 className="-ml-1 text-4xl font-semibold leading-none tracking-tight">
          Extra Settings
        </h1>
      </div>

      <div className="max-w-4xl items-start">
        <div className="grid gap-6">
          <Form {...form}>
            <Card>
              <CardHeader>
                <CardTitle>Custom GIF</CardTitle>
                <CardDescription>
                  See a custom GIF when you go on a forbidden page.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="URL" {...field} />
                        </FormControl>
                        <FormDescription>
                          Current URL: <a href={gifUrl}>{gifUrl}</a>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </CardContent>

              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
          </Form>
        </div>
      </div>
    </main>
  )
}

export default SettingsForm
