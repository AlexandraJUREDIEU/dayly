import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { AppLayout } from "./components/Layout/AppLayout";


function App() {

  return (
    <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
    </Router>
  )
}

export default App
