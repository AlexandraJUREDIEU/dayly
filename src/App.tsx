import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { AppLayout } from "@/components/Layout";

function App() {

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* D'autres routes viendront ici plus tard */}
        </Routes>
      </AppLayout>
    </Router>
  )
}

export default App
