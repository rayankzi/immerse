import { v4 as uuidv4 } from "uuid"

import type { Task, UrlEntry } from "~/types"

export const defaultEntries: UrlEntry[] = [
  {
    id: uuidv4(),
    name: "YouTube",
    url: "https://www.youtube.com/",
    blocked: "Yes"
  },
  {
    id: uuidv4(),
    name: "TikTok",
    url: "https://www.tiktok.com/",
    blocked: "Yes"
  },
  {
    id: uuidv4(),
    name: "Instagram",
    url: "https://www.instagram.com/",
    blocked: "Yes"
  }
]

export const defaultTasks: Task[] = [
  {
    id: uuidv4(),
    description: "Do the Dishes",
    priority: "low",
    completed: true
  },
  {
    id: uuidv4(),
    description: "Wash the car",
    priority: "medium",
    completed: false
  },
  {
    id: uuidv4(),
    description: "Feed the fish",
    priority: "high",
    completed: true
  }
]

export const defaultGifUrl =
  "https://media1.tenor.com/m/nCfArwGenA0AAAAd/the-rock-raising-eyebrow.gif"
