export interface User {
  id: number,
  user: string
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

export type NoteState = Note | null;
