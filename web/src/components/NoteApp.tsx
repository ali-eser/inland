import { useNavigate } from "react-router";
import AppSidebar from "./layout/AppSidebar";
import Editor from "./layout/Editor";
import noteService from "@/services/noteService";
import { useSelector, useDispatch  } from "react-redux";
import { Note } from "@/types";
import { useEffect, useState } from "react";
import { setNotes } from "@/reducers/noteReducer";
import { setUser } from "@/reducers/userReducer";

const NoteApp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedNote, setSelectedNote] = useState("");
  const noteState: Note[] = useSelector(({ notes }: { notes: Note[] }): Note[] => notes);
  const loggedUser = window.localStorage.getItem("loggedUser");
  const loggedUserID = window.localStorage.getItem("loggedUserID");

  const handleLogout = (): void => {
    window.localStorage.clear();
    dispatch(setUser(null));
    navigate("/auth");
  };

  const handleSelectedNote = (content: string): void => {
    setSelectedNote(content);
  }

  useEffect(() => {
    console.log(selectedNote);
  }, [selectedNote]);

  useEffect(() => {
    if (!loggedUser || !loggedUserID) {
      navigate('/auth');
      return;
    }

    const getNotes = async () => {
      try {
        const response = await noteService.fetchNotes(parseInt(loggedUserID as string));
        dispatch(setNotes(response.notes));
      } catch (err) {
        console.error(err);
      }
    }
    getNotes();
  }, [dispatch, loggedUser, loggedUserID, navigate])

  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}>
      <AppSidebar loggedUser={loggedUser} notes={noteState} handleLogout={handleLogout} handleSelectedNote={handleSelectedNote} />
      <Editor content={selectedNote} />
    </div>
  )
}

export default NoteApp;
