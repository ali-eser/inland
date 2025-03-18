import { Note } from "@/types";

const baseURL = import.meta.env.VITE_BASE_URL;

const fetchNotes = async (id: number) => {
  try {
    const response = await fetch(`${baseURL}/api/note/${id}`, {
      method: "GET"
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.error(err);
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

export default { fetchNotes, updateNote };
