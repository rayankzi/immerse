import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"

const SettingsForm = () => {
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div>
        <h1 className="-ml-1 text-4xl font-semibold leading-none tracking-tight">
          Extra Settings
        </h1>
      </div>
      <div className="max-w-4xl items-start">
        <div className="grid gap-6">
          <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader>
              <CardTitle>Custom GIF</CardTitle>
              <CardDescription>
                See a custom GIF when you go on a forbidden page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Input placeholder="URL" />
              </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}

export default SettingsForm
