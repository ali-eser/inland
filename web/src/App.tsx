import { Routes, Route } from "react-router"
import Login from "@/components/Login"
import NoteApp from "@/components/NoteApp"
import { NotificationState } from "./types"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useSelector } from "react-redux"
import { useEffect } from "react"

const App = () => {
  const notification = useSelector(({ notification }: { notification: NotificationState }): NotificationState => notification);
  useEffect(() => {
    console.log(notification);
  }, [notification]);
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
