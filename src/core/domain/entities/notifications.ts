export enum NotificationReadStatusEnum {
  READ = "READ",
  NOT_READ = "NOT_READ",
}
export enum NotificationTypeEnum {
  OCCURRENCE = "OCCURRENCE",
  REQUEST = "REQUEST",
  FILE_SUCCESS = "FILE_SUCCESS",
  FILE_ERROR = "FILE_ERROR",
  MESSAGE = "MESSAGE",
  WARNINGS = "WARNINGS",
}

export interface Notification {
  id: string
  name: string;
  readStatus: NotificationReadStatusEnum;
  type: NotificationTypeEnum;
  createdAt: Date;
  occurrenceId?: string
  requestId?: string
  fileId?: string
  messageId?: string
}

export interface NotificationGroupByMonth<T> {
  month: string,
  notifications: T[]
}

export type NotificationsMonth = NotificationGroupByMonth<Notification>

export interface NotificationsResponse {
  readNotifications: NotificationsMonth[]
  notReadNotifications: NotificationsMonth[]
}
