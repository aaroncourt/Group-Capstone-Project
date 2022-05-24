import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Main from "./components/Main"
import OnePost from "./components/OnePost"
import UserPosts from "./components/UserPosts"
import Replies from "./components/Replies"
import NewPost from './components/AddPost';
import LoginReg from "./views/LoginReg"
import io from 'socket.io-client';
import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [user,setUser] = useState({})
  const [socket, setSocket] = useState(() => io(":8000"))
  const[comments, setComments] = useState();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket in the client: ", socket.id)
    })

    return () => socket.disconnect(true);

  }, [])



  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginReg/>} 
            socket={socket}
            setSocket={setSocket}
            user={user}
            setUser={setUser}/>
            <Route path="/home" element={<Main/>} 
            socket={socket}
            setSocket={setSocket}
            user={user}
            setUser={setUser}/>
            <Route path="/view/:id" element={<OnePost/>}
            socket={socket}
            setSocket={setSocket}
            user={user}
            setUser={setUser}/>
            <Route path="/reply/:id" element={<Replies/>} 
            comments={comments}
            setComments={setComments}
            socket={socket}
            setSocket={setSocket}
            user={user}
            setUser={setUser}/>
            <Route path="/user/:id" element={<UserPosts/>} 
            socket={socket}
            setSocket={setSocket}
            user={user}
            setUser={setUser}/>
            <Route path="/add" element={<NewPost/>} 
            socket={socket}
            setSocket={setSocket}
            user={user}
            setUser={setUser}/>
          </Routes>
        </BrowserRouter>
      </div>

    </div>
  );
}

export default App;
