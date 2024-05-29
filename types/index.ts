export type UrlEntry = {
  id: string
  name: string
  url: string
  blocked: "Yes" | "No"
}

export type PriorityType = "low" | "medium" | "high"

export type Task = {
  id: string
  description: string
  priority: PriorityType
  completed: boolean
}
