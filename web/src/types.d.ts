export interface User {
  id: number,
  user: string
}

export interface NewUser {
  username: string,
  password: string,
  passwordConf: string,
  email: string
}

export interface Note {
  id: number,
  content: string,
  userId: number,
  createdAt: string,
  updatedAt: string
}

export interface NewNote {
  content: string,
  userId: number,
  updatedAt: string,
  createdAt: string
}

export interface Notification {
  type: "default" | "destructive" | null | undefined,
  title: string,
  description: string
}
