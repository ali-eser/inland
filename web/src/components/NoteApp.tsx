import { useNavigate } from "react-router";
import AppSidebar from "./layout/AppSidebar";
import TextEditor from "./layout/TextEditor";
// import NoteTabs from "./layout/NoteTabs";
import keyManager from "@/utils/keyManager";
import { formatDate } from "@/utils/utils";
import noteService from "@/services/noteService";
import { useSelector, useDispatch  } from "react-redux";
import { Note, NewNote } from "@/types";
import { useEffect, useState } from "react";
import { setNotes } from "@/reducers/noteReducer";
import { setUser } from "@/reducers/userReducer";

const NoteApp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedNote, setSelectedNote] = useState<Note | Record<string, never>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true); 
  // const [activeNotes, setActiveNotes] = useState<Note[]>([]);
  const noteState: Note[] = useSelector(({ notes }: { notes: Note[] }): Note[] => notes);
  const loggedUser: string | null = window.localStorage.getItem("loggedUser");
  const loggedUserID: string | null = window.localStorage.getItem("loggedUserID");
  // const [activeTab, setActiveTab] = useState("defaultnewtab");

  const handleLogout = (): void => {
    window.localStorage.clear();
    keyManager.clearMasterKey();
    console.log("after clearing: ", keyManager.getMasterKey());
    dispatch(setUser(null));
    navigate("/auth");
  };

  const handleSelectedNote = (n: Note): void => {
    setSelectedNote(n);
    /*const alreadyActive = activeNotes.some(note => note.id === n.id);
    if (!alreadyActive) {
      setActiveNotes([...activeNotes, n]);
    }
    setActiveTab(n.id.toString());*/
  }

  const handleCreateNote = async () => {
    const date = new Date;
    const now = date.toISOString();

    const newNote: NewNote = {
      content: '',
      userId: parseInt(loggedUserID as string),
      updatedAt: now,
      createdAt: now
    }

    let result = await noteService.createNote(newNote);

    result = {
      ...result,
      updatedAt: formatDate(result.updatedAt),
      createdAt: formatDate(result.createdAt)
    };

    const newNotesArray: Note[] = [result, ...noteState];
    dispatch(setNotes(newNotesArray));
    setSelectedNote(result);
  }

  const handleNoteDelete = async () => {
    await noteService.deleteNote(selectedNote.id);
    const updatedNotesArray = noteState.filter(n => n.id !== selectedNote.id);
    dispatch(setNotes(updatedNotesArray));
    setSelectedNote(updatedNotesArray[0]);
  }

  const handleNotePut =  async (updatedNote: Note) => {
    await noteService.updateNote(updatedNote);

    const formattedUpdatedNote: Note = {
      ...updatedNote,
      createdAt: formatDate(updatedNote.createdAt),
      updatedAt: formatDate(updatedNote.updatedAt)
    };

    const updatedNoteState: Note[] = noteState.filter(n => n.id !== updatedNote.id);
    dispatch(setNotes([formattedUpdatedNote, ...updatedNoteState]));
  }

  useEffect(() => {
    if (!loggedUser || !loggedUserID) {
      navigate('/auth');
      return;
    }

    const getNotes = async () => {
      try {
        const response: Note[] = await noteService.fetchNotes(parseInt(loggedUserID as string));
        const formattedArray: Note[] = response.sort((a, b) => {
          const dateA = new Date(a.updatedAt);
          const dateB = new Date(b.updatedAt);
          return dateB.getTime() - dateA.getTime();
        });

        dispatch(setNotes(
          formattedArray.map(note => ({
            ...note,
            createdAt: formatDate(note.createdAt),
            updatedAt: formatDate(note.updatedAt)
          }))
        ));
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    getNotes();
  }, [dispatch, loggedUser, loggedUserID, navigate]);

  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
        <AppSidebar
          loggedUser={loggedUser}
          notes={noteState}
          isLoading={isLoading}
          handleLogout={handleLogout}
          handleSelectedNote={handleSelectedNote}
          handleCreateNote={handleCreateNote}
          handleNoteDelete={handleNoteDelete}
        />
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }} >
        {/*<div style={{ whiteSpace: 'nowrap' }}>
          <NoteTabs activeNotes={activeNotes} handleSelectedNote={handleSelectedNote} activeTab={activeTab} />
        </div>*/}
            <TextEditor
              note={selectedNote}
              handleNotePut={handleNotePut} 
            />
      </div>
    </div>
  )
};

export default NoteApp;
