import Login from "./components/Login"
import { ThemeProvider } from "@/components/theme-provider"

const App = () => {
  return (
    <>
      <ThemeProvider>
        <Login />
      </ThemeProvider>
    </>
  )
}

export default App
