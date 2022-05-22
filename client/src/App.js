import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Main from "./components/Main"
import OnePost from "./components/OnePost"
import UserPosts from "./components/UserPosts"
import Replies from "./components/Replies"

function App() {
  return (
    <div className="App">
<<<<<<< Updated upstream
=======
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/new" element={<OnePost/>} />
            <Route path="/reply/:id" element={<Replies/>} />
            <Route path="/user/:id" element={<UserPosts/>} />
          </Routes>
        </BrowserRouter>
      </div>

>>>>>>> Stashed changes
    </div>
  );
}

export default App;
