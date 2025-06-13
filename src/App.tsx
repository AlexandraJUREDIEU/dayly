import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* D'autres routes viendront ici plus tard */}
      </Routes>
    </Router>
  )
}

export default App
