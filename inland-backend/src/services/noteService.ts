import Note from "../models/note";
import User from "../models/user";
import { NotFoundError } from "../../exceptions/NotFoundError";

const fetchNotesByUser = async (userId: number) => {
  try {
    const user: User | null = await User.findByPk(userId);
    if (user) {
      return user;
    } else {
      throw new Error("User doesn't exist");
    }
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};

const fetchSingleNote = async (id: number ) => {
  try {
    const note: Note | null = await Note.findByPk(id);
    if (!note) {
      throw new NotFoundError(`Note with the specified ID ${id} does not exist`);
    }
    return note;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};

const createNote = async (userId: number, content: string, title?: string) => {
  try {
    if (!userId|| !content) {
      throw new Error("A note should have a user and content");
    }
    if (title) {
      const newNote =  {
        userId: userId,
        content: content,
        title: title
      }
      return await Note.create(newNote);
    } else {
      const newNote =  {
        userId: userId,
        content: content
      }
      return await Note.create(newNote);
    }
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

const updateNote = async (noteId: number, content: string) => {
  try {
    const note: Note | null = await Note.findByPk(noteId);
    if (!note) {
      throw new Error(`The note with the specified ID ${noteId} does not exist`);
    }

    return await note.update({ content: content });
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};

const deleteNote = async (noteId: number) => {
  try {
    const note: Note | null = await Note.findByPk(noteId);
    if (!note) {
      throw new NotFoundError(`The note with the specified ID ${noteId} does not exist`);
    }

    return await note.destroy();
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};

export default { fetchSingleNote, fetchNotesByUser, createNote, updateNote, deleteNote };
