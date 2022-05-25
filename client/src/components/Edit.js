import React, { useEffect, useState } from "react";
import {useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header"

const EditPost = (props) => {
  const [errors, setErrors] = useState({});
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postPicture, setPostPicture] = useState("");
  const [postBy, setPostBy] = useState("");
  const navigate = useNavigate();

  const [post, setPost] = useState({})
  const {id} = useParams(); 
  console.log(id);

  useEffect(() => {
      axios.get(`http://localhost:8000/api/posts/${id}`, {withCredentials: true})
      .then(res => {
          console.log(res.data.postTitle);
          setPostTitle(res.data.postTitle);
          setPostBody(res.data.postBody);
          setPost(res.data);
      })
      .catch(err => console.error(err));
  }, []);


  const submitHandler = (e) => {
    e.preventDefault();
    // axios.post("http://localhost:8000/api/posts/new", {postTitle:postTitle, postBody:postBody, postPicture:postPicture, postedBy:postBy})
    axios.put(`http://localhost:8000/api/posts/${id}/edit`, {postTitle:postTitle, postBody:postBody}, {withCredentials: true})
      .then((res) => {
        console.log("res info is: ")
        console.log(res.data);
        navigate("/home");
      })
      .catch((err) => {
        console.log(`err is: ${err}`);
        setErrors(err.response.data.errors);
      });
  };

  const deleteHandler = (id)=>{
    axios.delete(`http://localhost:8000/api/posts/${id}`, {withCredentials: true})
        .then((res)=>{
            console.log(res.data);
            navigate("/home")
        })
        .catch((err)=>{
            console.log(err);
        })
}

  return (
    <div>
      <Header/>
      <form className="border border-dark" onSubmit={submitHandler}>
        <div className="d-flex justify-content-around">
            <div className="col-4 mt-3">
                <div className="form-group text-start ms-5">
                    <label>Title:</label><br></br>
                    <input className="mt-3" onChange={(e) => setPostTitle(e.target.value)} name="postTitle" value={postTitle}/>
                    <br></br>
                    {errors.name ? <span className="text-danger">{errors.name.message}</span> : null}
                </div>
                <div className="form-group text-start ms-5 mt-3">
                    <label>Tell Us About Your Day:</label><br></br>
                    <textarea className="mt-3" onChange={(e) => setPostBody(e.target.value)} name="postBody" value={postBody}/>
                    <br></br>
                    {errors.type ? <span className="text-danger">{errors.type.message}</span> : null}
                </div>
                {/* <div className="form-group">
                    <label>Photo:</label>
                    <input type="file" className="form-control" onChange={(e) => setPostPicture(e.target.value)} name="postPhoto" accept="image/*"/>
                    <br></br>
                    {errors.name ? <span className="text-danger">{errors.name.message}</span> : null}
                </div> */}
            </div>
        </div>
        <div className="m-5 text-start">
            <button className="btn btn-primary ms-3">Update Your Day</button>
       </div>
      </form>
            <button className='btn btn-danger my-3' onClick={(e)=>deleteHandler(post._id)}>Delete</button>
    </div>
  );
};

export default EditPost;