import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Editor from "./pages/editor/Editor";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#000000",
        minHeight: "100vh",
        padding: "24px",
        color: "#D4D4D4",
        fontFamily:
          "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
      }}
    >
      <Toaster position="top-right"></Toaster>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor/:roomId" element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
