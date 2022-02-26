import { SafeHtml } from '@angular/platform-browser'

export interface Post {
  id: number
  author: Author
  color?: string
  content?: string | SafeHtml
  date: string
  description?: string
  images?: Image[]
  indexImage: string
  labels?: Label[]
  title: string
  type: string
  backgroundDark?: boolean
}

export interface Author {
  id: number
  name: string
  description: string
  image: Image
}

export interface Image {
  id: number
  url: string
}

export interface Label {
  id: number
  color: string
  name: string
}
