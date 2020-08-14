export enum AlertMessagePriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface AlertMessage {
  message: string
  link: string
  priority: AlertMessagePriority
}
