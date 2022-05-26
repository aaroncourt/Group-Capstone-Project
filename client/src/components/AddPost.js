import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header"
import ImageUp from "./ImageUpLoader";

const NewPost = (props) => {
  const [errors, setErrors] = useState({});
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postPicture, setPostPicture] = useState("placeholder.png");
  const [postBy, setPostBy] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    // axios.post("http://localhost:8000/api/posts/new", {postTitle:postTitle, postBody:postBody, postPicture:postPicture, postedBy:postBy})
    axios.post("http://localhost:8000/api/posts/new", {postTitle:postTitle, postBody:postBody}, {withCredentials: true})
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

// if (postPicture === ""){
//         setPostPicture('placeholder-image.png')
//     }

  return (
    <div>
      <Header/>
      <form className="" onSubmit={submitHandler}>
        <div className="d-flex justify-content-around">
            <div className="col-12 addPostGroup">
                <div className="form-group text-start ms-5">
                    <label className="addPostHeaders">Title:</label><br></br>
                    <input className="postTitleEntry" onChange={(e) => setPostTitle(e.target.value)} name="postTitle" value={postTitle}/>
                    <br></br>
                    {errors.name ? <span className="text-danger">{errors.name.message}</span> : null}
                </div>
                <div className="form-group text-start ms-5 ">
                    <label className="addPostHeaders">Tell Us About Your Day:</label><br></br>
                    <textarea className="postBodyText" rows="5" columns="9" placeholder="Tell us about your day"  onChange={(e) => setPostBody(e.target.value)} name="postBody" value={postBody}/>
                    <br></br>
                    {errors.type ? <span className="text-danger">{errors.type.message}</span> : null}
                </div>
                {/* <div className="form-group">
                    <label>Photo:</label>
                    <input type="file" className="form-control" onChange={(e) => setPostPicture(e.target.value)} name="postPhoto" accept="image/*"/>
                    <br></br>
                    {errors.name ? <span className="text-danger">{errors.name.message}</span> : null}
                </div> */}
                <div className="">
                    <img src={`/images/${postPicture}`} className=""></img>
                </div>
            </div>
        </div>
        <div className="m-5 text-start">
            <button className="btn btn-primary ms-3">Add Your Day</button>
        </div>
      </form>
      {/* <ImageUp id ={id} postBody = {postBody} postTitle={postTitle} /> */}
    </div>
  );
};

export default NewPost;