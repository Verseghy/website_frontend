export interface Post {
  id: number
  author: Author
  color: string
  content: string
  date: string
  description: string
  images: Image[]
  index_image: Image
  labels: Label[]
  title: string
  type: number
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
  backgroundDark?: boolean
}
