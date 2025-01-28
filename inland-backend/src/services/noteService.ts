import Note from "../models/note";
import User from "../models/user";

const fetchSingleNote = async (id: number ) => {
  try {
    const note = await Note.findByPk(id);
    return note;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};

const fetchNotesByUser= async (userId: number) => {
  try {
    const user = await User.findByPk(userId);
    if (user) {
      return user.notes;
    } else {
      throw new Error("User doesn't exist");
    }
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};
