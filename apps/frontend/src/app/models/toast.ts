export interface Toast {
  message: string
  actions: ToastAction[]
}

export interface ToastAction {
  title: string
  callback: () => void
}
