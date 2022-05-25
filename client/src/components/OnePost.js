import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams, Link, useNavigate} from "react-router-dom";
import Header from './Header'

const OnePost = (props) => {
    const [post, setPost] = useState({})
    const {id} = useParams(); 
    const nav = useNavigate();
    console.log(id);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/posts/${id}`, {withCredentials: true})
        .then(res => {
            console.log(res.data);
            setPost(res.data);
        })
        .catch(err => console.error(err));
    }, []);

    const deleteHandler = (id)=>{
        axios.delete(`http://localhost:8000/api/posts/${id}`, {withCredentials: true})
            .then((res)=>{
                console.log(res.data);
                nav("/home")
            })
            .catch((err)=>{
                console.log(err);
            })
    }
 
    //loop through records and add all ideaLikes

    return (
       <div>
        <Header/>
        <div className="mt-5">
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
                                {/* {post.postBody} */}
                            </textarea>
                        </div>
                        {/* <div className="col-6">
                            <img src="{post.picture}"></img>
                        </div> */}
                    </div>
                    <div className="mt-3 d-flex justify-content-between flex-column">
                        <Link to={""}><button type="button" className="btn btn-primary">Comment</button></Link>
                        <button className='btn btn-danger my-3' onClick={(e)=>deleteHandler(post._id)}>Delete</button>
                    </div>
                    {/* {post.comments}?
                    {post.comments.map((comment, index)=>(
                        <div key={index}>
                            <p>{comment.byuser}</p>
                            <textarea>{comment.body}</textarea>
                        </div>
                        ))}
                        :null */}
                </div>

            
       </div>

    )

}

export default OnePost;
