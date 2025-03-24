import Note from "../models/note";
import { NotFoundError } from "../../exceptions/NotFoundError";
import { redisClient } from "../redis/redisClient";

const fetchAllFromCache = async (userId: number) => {
  try {
    const noteIdsKey = `user:${userId}:noteIds`;
    const noteIds = await redisClient.smembers(noteIdsKey);

    if (noteIdsKey.length === 0) {
      return;
    }

    const noteKeys: string[] = noteIds.map(noteId => `user:${userId}:note:${noteId}`);
    const cachedNotes = await redisClient.mget(...noteKeys);

    const notes = cachedNotes.filter(note => note !== null).map(note => JSON.parse(note));
    return notes;
  } catch (error) {
    console.error("Error fetching notes from cache: ", error);
  }
};

const fetchNotesByUser = async (userId: number) => {
  try {
    const cachedNotes = await fetchAllFromCache(userId);

    // console.log(typeof(cachedNotes));
    if (cachedNotes && cachedNotes.length > 0) {
      console.log(`Serving ${cachedNotes.length} notes from Redis for user ${userId}`);
      return cachedNotes;
    } else {
      console.log(`Cache miss or empty cache for user ${userId}, fetching from database`);
      const notes: Note[] | null = await Note.findAll({ where: { userId: userId } });

      const noteIdsKey = `user:${userId}:noteIds`;
      if (notes && notes.length > 0) {
        for (let i = 0; i < notes.length; i++) {
          await redisClient.setex(`user:${userId}:note:${notes[i].id}`, 3600, JSON.stringify(notes[i]));
          await redisClient.sadd(noteIdsKey, notes[i].id);
        }
        console.log(`Populated Redis cache with ${notes.length} notes for user ${userId}`);
      }
      return notes;
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
      const addedNote =  await Note.create(newNote);
      const noteKey = `user:${userId}:note:${addedNote.id}`;
      const noteIdsKey = `user:${userId}:noteIds`;

      await redisClient.setex(noteKey, 3600, JSON.stringify(addedNote));
      await redisClient.sadd(noteIdsKey, addedNote.id);
      return addedNote;
    } else {
      const newNote =  {
        userId: userId,
        content: content
      }
      const addedNote =  await Note.create(newNote);
      const noteKey = `user:${userId}:note:${addedNote.id}`;
      const noteIdsKey = `user:${userId}:noteIds`;

      await redisClient.setex(noteKey, 3600, JSON.stringify(addedNote));
      await redisClient.sadd(noteIdsKey, addedNote.id);
      return addedNote;
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

    const updatedNote = await note.update({ content: content });
    const cacheKey = `user:${updatedNote.userId}:note:${updatedNote.id}`;

    await redisClient.setex(cacheKey, 3600, JSON.stringify(updatedNote));

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

    const noteKey = `user:${note.userId}:note:${noteId}`;
    const noteIdsKey = `user:${note.userId}:noteIds`;

    await redisClient.del(noteKey);
    await redisClient.srem(noteIdsKey, noteId);

    return await note.destroy();
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};

export default { fetchSingleNote, fetchNotesByUser, createNote, updateNote, deleteNote };
