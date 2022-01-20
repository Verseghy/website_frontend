export interface CanteenDay {
    id: number
    menus: [Menu, Menu, Menu?]
    date: string
}

export interface Menu {
    id: number
    menu: string
    type: number
}
