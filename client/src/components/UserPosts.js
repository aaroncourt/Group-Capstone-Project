
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useParams, Link, useNavigate} from "react-router-dom";
import "./style.css"
import Header from "./Header"

const UserPosts = (props) => {
    const[posts, setPosts] = useState([]);
    const {id} = useParams(); 
    console.log(`id is : ${id}`)
    const[user, setUser] = useState();
    const[comments, setComments] = useState();
    const[pictures, setPictures] = useState();
    const[likes, setLikes] = useState();
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:8000/api/posts/all/${id}`, {withCredentials: true})
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


    //loop through records and add all ideaLikes

    return (
       <div>
        <Header/>
        <div className="mt-5 d-flex justify-content-center align-items-center flex-column">
            <button type="button" className="btn btn-success your_day">Tell Us About Your Day</button>
        </div>
        {
            posts?
            posts.map((post, index)=>(
                <div key={index} className="mt-5 postMain">
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
                            <p>{post.postBody}</p>
                        </div>
                        {/* <div className="col-6">
                            <img src="{post.picture}"></img>
                        </div> */}
                    </div>
                        <div className="mt-3 flex-column justifty-content-center">
                            <Link to={`/view/${post._id}`}><button type="button" className="btn btn-primary btnRight">Edit</button></Link>
                            <Link to={""}><button type="button" className="btn btn-primary">Comment</button></Link>
                        </div>
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

export default UserPosts;