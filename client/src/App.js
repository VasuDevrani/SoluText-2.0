import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route} from "react-router-dom";
import EditorTool from "./components/EditorTool";
import Home from "./components/Home";
import { useState } from "react";
import Auth from "./components/Auth";
import Translate from "./components/Translate";
import Library from "./components/Library";

// toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateEditor from "./components/UpdateEditor";
import UpdateTrans from "./components/UpdateTrans";

function App() {
  const [user, setUser] = useState(true);

  return (
    <div className="App">
      <ToastContainer position="bottom-center" limit={1}/>
      {/* navbar */}
      <Navbar />
      {/* routes */}
      <Routes>
      <Route path="/" element={user ? <Home /> : <Auth/>} />
        <Route path="/editor" element={<EditorTool />} />
        <Route path="/translate" element={<Translate/>} />
        <Route path="/library" element={<Library/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/editor/:id" element={<UpdateEditor/>} />
        <Route path="/trans/:id" element={<UpdateTrans/>} />
      </Routes>
    </div>
  );
}

export default App;
