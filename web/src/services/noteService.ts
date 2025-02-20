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

export default { fetchNotes };
