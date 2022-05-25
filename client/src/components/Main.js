import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useParams, Link, useNavigate} from "react-router-dom";
import "./style.css"
import Header from "./Header"



const Main = (props) => {
    const[posts, setPosts] = useState([]);
    // const {id} = useParams(); 
    const[user, setUser] = useState({});
    const[pictures, setPictures] = useState();
    const[likes, setLikes] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/posts/all`, {withCredentials: true})
        .then((res)=>{
            setUserInfo();
            setPosts(res.data);
            console.log(posts);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])

    const setUserInfo = ()=>{
        axios.get("http://localhost:8000/api/logedinuser", {withCredentials: true})
        .then((res)=>{
            console.log(res.data);
            setUser(res.data)
        })
        .catch((err)=>{
            console.log(err);
        })

    }
    
    const logout = () => {
        axios.post("http://localhost:8000/api/users/logout", {withCredentials: true})
        .then((res)=>{
            console.log(res.data);
            navigate("/")
        })
        .catch((err)=>{
            console.log(err);
        })

    }



    return (
       <div>
        <Header/>
        <div className="mt-5 d-flex justify-content-center align-items-center flex-column">
        <Link to={"/add"} className="clean_link your_day"><button type="button" className="btn btn-success your_day">Tell Us About Your Day</button></Link>
        </div>
        {
            posts?
            posts.map((post, index)=>(
                <div key={index} className="mt-5">
                    <div>
                        <h3>{post.postTitle}</h3>
                    </div>
                    <div className="row d-flex mx-auto justify-content-center">
                        {/* <div className="col-2">
                            <img src="{post.user.pic}"></img>
                            <img src="{post.likes}"></img>
                        </div> */}
                        <div className="col-4">
                            {/* <p>Post by:</p>
                            <p>{post.by}</p> */}
                            {/* <textarea><span class="d-inline-block text-truncate" style={{maxHeight: 4+"rem"}}>
                                {post.postBody}
                            </span></textarea> */}
                            <textarea value={post.postBody}>

                            </textarea>
                        </div>
                        {/* <div className="col-6">
                            <img src="{post.picture}"></img>
                        </div> */}
                    </div>
                    {
                        post.postedBy == user._id ?
                        <div className="mt-3 d-flex justify-content-between flex-column">
                            <Link to={`/view/${post._id}`}><button type="button" className="btn btn-primary">Edit</button></Link>
                            <Link to={""}><button type="button" className="btn btn-primary">Comment</button></Link>
                        </div>
                        :
                        <div className="mt-3 d-flex justify-content-between flex-column">
                            <Link to={""}><button type="button" className="btn btn-primary">Like</button></Link>
                            <Link to={""}><button type="button" className="btn btn-primary">Comment</button></Link>
                        </div>
                    }
                    {/* {post.comments}?
                    {post.comments.map((comment, index)=>(
                        <div key={index}>
                            <p>{comment.byuser}</p>
                            <textarea>{comment.body}</textarea>
                        </div>
                        ))} */}
                        {/* :null */}
                </div>

            ))
            :null
        }
       </div>
    )
}

export default Main;
