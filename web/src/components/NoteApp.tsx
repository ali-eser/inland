import { useNavigate } from "react-router";
import AppSidebar from "./layout/AppSidebar";
import Editor from "./layout/Editor";
// import NoteTabs from "./layout/NoteTabs";

import noteService from "@/services/noteService";
import { useSelector, useDispatch  } from "react-redux";
import { Note } from "@/types";
import { useEffect, useState } from "react";
import { setNotes } from "@/reducers/noteReducer";
import { setUser } from "@/reducers/userReducer";

const NoteApp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedNote, setSelectedNote] = useState<Note | Record<string, never>>({});
  const [activeNotes, setActiveNotes] = useState<Note[]>([]);
  // const [activeTab, setActiveTab] = useState("defaultnewtab");
  const noteState: Note[] = useSelector(({ notes }: { notes: Note[] }): Note[] => notes);
  const loggedUser = window.localStorage.getItem("loggedUser");
  const loggedUserID = window.localStorage.getItem("loggedUserID");

  const handleLogout = (): void => {
    window.localStorage.clear();
    dispatch(setUser(null));
    navigate("/auth");
  };

  const handleSelectedNote = (n: Note): void => {
    setSelectedNote(n);
    const alreadyActive = activeNotes.some(note => note.id === n.id);
    if (!alreadyActive) {
      setActiveNotes([...activeNotes, n]);
    }
    //setActiveTab(n.id.toString());
  }

  const handleNotePut =  async (n: Note) => {
    await noteService.updateNote(n);
  }

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
    <div style={{ display: "flex", overflow: "hidden" }}>
        <AppSidebar
          loggedUser={loggedUser}
          notes={noteState}
          handleLogout={handleLogout}
          handleSelectedNote={handleSelectedNote}
        />
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }} >
        {/*<div style={{ whiteSpace: 'nowrap' }}>
          <NoteTabs activeNotes={activeNotes} handleSelectedNote={handleSelectedNote} activeTab={activeTab} />
        </div>*/}
            <Editor
              note={selectedNote}
              noteState={noteState}
              handleNotePut={handleNotePut} 
            />
      </div>
    </div>
  )
};

export default NoteApp;
