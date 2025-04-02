import { Note, NewNote } from "@/types";
import keyManager from "@/utils/keyManager";
import { encryptText } from "@/utils/cryptography";

const baseURL = import.meta.env.VITE_BASE_URL;

const fetchNotes = async (id: number) => {
  try {
    const response = await fetch(`${baseURL}/api/note/${id}`, {
      method: "GET"
    });

    if (response.ok) {
      const data = await response.json();
      return data.notes;
    }
  } catch (err) {
    console.error(err);
    return [];
  }
}

const createNote = async (note: NewNote) => {
  try {
    const masterKey = keyManager.getMasterKey();

    if (masterKey) {
      const encryptedNote = await encryptText(note.content, masterKey);
      console.log(encryptedNote);
    }

    const response = await fetch(`${baseURL}/api/note`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note)
    });

    if (!response.ok) {
      const errorJson = await response.json();
      return { error: errorJson.error || "An unspecified error occurred while creating a new note" };
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: error.message || 'An error occurred while creating a note' }
  }
}

const updateNote = async (note: Note) => {
  try {
    const response = await fetch(`${baseURL}/api/note/${note.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note)
    });

    const data = await response.json();
    console.log(data);
    return data;

  } catch(error) {
    console.error(error);
    return;
  }
}

export default { fetchNotes, updateNote, createNote };
