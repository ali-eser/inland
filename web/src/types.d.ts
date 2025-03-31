export interface User {
  id: number,
  user: string
}

export interface NewUser {
  username: string,
  password: string,
  passwordConf: string,
  email: string,
  keyDerivationSalt: string,
  encryptedMasterKey: string
}

export type UserState = User | null;

export interface Note {
  id: number,
  title?: string,
  content: string,
  userId: number,
  createdAt: string,
  updatedAt: string
}

export interface Notification {
  type: "default" | "destructive" | null | undefined,
  title: string,
  description: string
}

export type NotificationState = Notification | null;
