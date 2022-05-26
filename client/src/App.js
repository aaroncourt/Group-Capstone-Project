import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Main from "./components/Main"
import OnePost from "./components/OnePost"
import UserPosts from "./components/UserPosts"
import Replies from "./components/Replies"
import NewPost from './components/AddPost';
import LoginReg from "./views/LoginReg"
import EditPost from './components/Edit'
import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [user,setUser] = useState({})
  const[comments, setComments] = useState("");



  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginReg/>} 
            user={user}
            setUser={setUser}/>
            <Route path="/home" element={<Main/>} 
            user={user}
            setUser={setUser}/>
            <Route path="/edit/:id" element={<EditPost/>}
            user={user}
            setUser={setUser}/>
            <Route path="/view/:id" element={<OnePost/>}
            user={user}
            setUser={setUser}/>
            <Route path="/reply/:id" element={<Replies/>} 
            comments={comments}
            setComments={setComments}
            user={user}
            setUser={setUser}/>
            <Route path="/user/:id" element={<UserPosts/>} 
            user={user}
            setUser={setUser}/>
            <Route path="/add" element={<NewPost/>} 
            user={user}
            setUser={setUser}/>
          </Routes>
        </BrowserRouter>
      </div>

    </div>
  );
}

export default App;
