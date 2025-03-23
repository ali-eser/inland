import Note from "../models/note";
import { NotFoundError } from "../../exceptions/NotFoundError";
import { redisClient } from "../redis/redisClient";

const fetchNotesByUser = async (userId: number) => {
  try {
    const redisKey = `user:${userId}:notes`;
    const cachedNotes = await redisClient.get(redisKey);

    if (cachedNotes !== null) {
      console.log("Cache hit!: ", cachedNotes);
      return JSON.parse(cachedNotes);
    }

    console.log("Cache miss, fetching from database");
    const notes: Note[] | null = await Note.findAll({ where: { userId: userId } });

    if (notes && notes.length > 0) {
      await redisClient.setex(redisKey, 3600, JSON.stringify(notes));
      console.log("Notes cached in Redis");
    }
    return notes;
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
    const updatedNote = await note.update({ content: content })
    return updatedNote;
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
