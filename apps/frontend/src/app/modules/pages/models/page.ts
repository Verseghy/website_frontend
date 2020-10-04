export enum PageTemplate {
  SERVICES = 'services',
}

export interface PageData {
  id: number
  template: PageTemplate
  name: string
  title: string
  slug: string
  content: string
  extras: {
    [attr: string]: any
  }
  created_at: Date
  updates_at: Date
  deleted_at: Date | null
}
