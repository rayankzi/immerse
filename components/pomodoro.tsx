import { Timer } from "~/components/timer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

export const Pomodoro = () => {
  const pomodoroDuration = 25 * 60
  const shortBreakDuration = 5 * 60
  const longBreakDuration = 10 * 60

  return (
    <Tabs defaultValue="pomodoro" className="w-[400px] p-10">
      <TabsList className="grid grid-cols-3">
        <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
        <TabsTrigger value="short">Short Break</TabsTrigger>
        <TabsTrigger value="long">Long Break</TabsTrigger>
      </TabsList>
      <TabsContent value="pomodoro">
        <Timer type="pomodoro" initialDuration={pomodoroDuration} />
      </TabsContent>
      <TabsContent value="short">
        <Timer type="short" initialDuration={shortBreakDuration} />
      </TabsContent>
      <TabsContent value="long">
        <Timer type="long" initialDuration={longBreakDuration} />
      </TabsContent>
    </Tabs>
  )
}
