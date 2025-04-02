import { Routes, Route } from "react-router"
import { useSelector } from "react-redux"
import Login from "@/components/Login"
import NoteApp from "@/components/NoteApp"
import { Notification } from "./types"
import keyManager from "./utils/keyManager"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useEffect } from "react"

const App = () => {
  const notification = useSelector(({ notification }: { notification: Notification | null }) => notification);

  useEffect(() => {
    console.log("key: ",keyManager.getMasterKey())
    if (!keyManager.getMasterKey()) {
      console.log("no key")
    }
  }, []);

  return (
    <>
      {notification && (
        <Alert variant={notification.type} className="alert">
          <AlertTitle>{notification.title}</AlertTitle>
          <AlertDescription>
            {notification.description}
          </AlertDescription>
        </Alert>
      )}
      <Routes>
        <Route path="/" element={<NoteApp />} />
        <Route path="/auth" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
