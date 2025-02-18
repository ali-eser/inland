import { useNavigate } from "react-router";
import AppSidebar from "./layout/AppSidebar";

const NoteApp = () => {
  const navigate = useNavigate();
  const loggedUser= window.localStorage.getItem('loggedUser');
  if (!loggedUser) {
    navigate('/auth');
  }
  console.log(loggedUser)
  return (
    <>
      <AppSidebar loggedUser={loggedUser}/>
    </>
  )
}

export default NoteApp;