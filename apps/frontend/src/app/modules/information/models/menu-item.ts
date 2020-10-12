export interface MenuItem {
  name: string
  slug: string | null
  link: string | null
  type: 'page_link' | 'internal_link' | 'external_link'
  children: MenuItem[]
}
