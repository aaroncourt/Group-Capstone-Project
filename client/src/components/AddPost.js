import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const NewPost = (props) => {
  const [errors, setErrors] = useState({});
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postPicture, setPostPicture] = useState("");
  const [postBy, setPostBy] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(petSkills)
    addSkills();
    axios.post("http://localhost:8000/api/comments/new", {postTitle:postTitle, postBody:postBody, postPicture:postPicture, postBy:postBy})
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(`err is: ${err}`);
        setErrors(err.response.data.errors);
      });
  };

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
                <div className="form-group">
                    <label>Photo:</label>
                    <input type="file" className="form-control" name="postPhoto" accept="image/*"/>
                    <br></br>
                    {errors.name ? <span className="text-danger">{errors.name.message}</span> : null}
                </div>
            </div>
        </div>
        <div className="m-5 text-start">
            <button className="btn btn-primary ms-3">Add Your Day</button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;