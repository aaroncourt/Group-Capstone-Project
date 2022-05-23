import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams, Link, useNavigate} from "react-router-dom";

const OnePost = (props) => {
    const [post, setPost] = useState({})
    const {id} = useParams(); 
    const nav = useNavigate();
    console.log(id);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pet/${id}`)
        .then(res => {
            console.log(res.data.toString());
            setPost(res.data);
        })
        .catch(err => console.error(err));
    }, []);

    const deleteHandler = (id)=>{
        axios.delete(`http://localhost:8000/api/pet/${id}`)
            .then((res)=>{
                console.log(res.data);
                nav("/")
            })
            .catch((err)=>{
                console.log(err);
            })
    }
 
    //loop through records and add all ideaLikes

    return (
       <div>
        <div className="header d-flex align-items-center flex-column">
            <div className="header_ph d-flex justify-content-center align-items-center flex-column">
                <h1 style="color:white">A Day...</h1>
            </div>
            <div className="nav border border-dark mt-5">
                <div className="row d-flex mx-auto justify-content-between align-items-center">
                    <div className="col-3">
                        <Link to={""} className="clean_link"><h5>Home</h5></Link>
                    </div>
                    <div className="col-3">
                        <Link to={""} className="clean_link"><h5>Edit</h5></Link>
                    </div>
                    <div className="col-3">
                        <Link to={""} className="clean_link"><h5>View</h5></Link>
                    </div>
                    <div className="col-3">
                        <Link to={""} className="clean_link"><h5>Help</h5></Link>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-5">
                    <div>
                        <h3>{post.title}</h3>
                    </div>
                    <div className="row d-flex mx-auto">
                        <div className="col-2">
                            <img src="{post.user.pic}"></img>
                            <img src="{post.likes}"></img>
                        </div>
                        <div className="col-4">
                            <p>Post by:</p>
                            <p>{post.by}</p>
                            <textarea><span class="d-inline-block text-truncate" style="max-height: 4rem;">
                                {post.body}
                            </span></textarea>
                        </div>
                        
                        <div className="col-6">
                            <img src="{post.picture}"></img>
                        </div>
                    </div>
                    <div className="mt-3 d-flex justify-content-between flex-column">
                        <Link to={""}><button type="button" className="btn btn-primary">Comment</button></Link>
                        <Link to={""}><button type="button" className="btn btn-primary">Like</button></Link>
                    </div>
                    {post.comments}?
                    {post.comments.map((comment, index)=>(
                        <div key={index}>
                            <p>{comment.byuser}</p>
                            <textarea>{comment.body}</textarea>
                        </div>
                        ))}
                        :null
                </div>

            
       </div>

    )

}

export default OnePost;
