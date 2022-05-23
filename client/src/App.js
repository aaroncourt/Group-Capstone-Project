import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Main from "./components/Main"
import OnePost from "./components/OnePost"
import UserPosts from "./components/UserPosts"
import Replies from "./components/Replies"
import NewPost from './components/AddPost';

function App() {
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/view" element={<OnePost/>} />
            <Route path="/reply/:id" element={<Replies/>} />
            <Route path="/user/:id" element={<UserPosts/>} />
            <Route path="/add" element={<NewPost/>} />
          </Routes>
        </BrowserRouter>
      </div>

    </div>
  );
}

export default App;
