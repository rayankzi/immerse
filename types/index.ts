export type UrlEntry = {
  id: string
  name: string
  url: string
  blocked: "Yes" | "No"
}

export type Task = {
  id: string
  description: string
  priority: "low" | "medium" | "high"
  completed: boolean
}
