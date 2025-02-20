import { useNavigate } from "react-router";
import AppSidebar from "./layout/AppSidebar";
import noteService from "@/services/noteService";
import { useSelector, useDispatch  } from "react-redux";
import { Note } from "@/types";
import { useEffect } from "react";
import { setNotes } from "@/reducers/noteReducer";
import { setUser } from "@/reducers/userReducer";

const NoteApp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const noteState: Note[] = useSelector(({ notes }: { notes: Note[] }): Note[] => notes);
  const loggedUser = window.localStorage.getItem("loggedUser");
  const loggedUserID = window.localStorage.getItem("loggedUserID");

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(setUser(null));
    navigate("/");
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
    <>
      <AppSidebar loggedUser={loggedUser} notes={noteState} handleLogout={handleLogout} />
    </>
  )
}

export default NoteApp;
