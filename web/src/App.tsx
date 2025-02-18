import { Routes, Route } from "react-router"
import Login from "@/components/Login"
import NoteApp from "@/components/NoteApp"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<NoteApp />} />
        <Route path="/auth" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
