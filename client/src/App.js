import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route} from "react-router-dom";
import EditorTool from "./components/EditorTool";
import Home from "./components/Home";
import { useState } from "react";
import Auth from "./components/Auth";
import Translate from "./components/Translate";
import Library from "./components/Library";

function App() {
  const [user, setUser] = useState(true);

  return (
    <div className="App">
      {/* navbar */}
      <Navbar />
      {/* routes */}
      <Routes>
      <Route path="/" element={user ? <Home /> : <Auth/>} />
        <Route path="/editor" element={<EditorTool />} />
        <Route path="/translate" element={<Translate/>} />
        <Route path="/library" element={<Library/>} />
      </Routes>
    </div>
  );
}

export default App;
