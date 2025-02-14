import { Routes, Route } from "react-router"
import Login from "@/components/Login"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
