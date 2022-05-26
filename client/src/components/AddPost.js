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

  const [newPost,setNewPost] = useState(
    {
    postPicture:''
    }
)


// if (postPicture === ""){
//         setPostPicture('placeholder-image.png')
//     }

  return (
    <div>
      <Header/>
      <form className="" onSubmit={submitHandler}>

console.log(postTitle,postBody)


function handleSubmit(e) {
e.preventDefault();
const formData = new FormData();

formData.append('postTitle',postTitle);
formData.append('postBody',postBody);
formData.append('postPicture',newPost.postPicture);

axios.post(`http://localhost:8000/api/posts/new`,formData,{withCredentials: true})
.then((res) => {
console.log(res)
navigate('/home')

})
.catch((err) => {
console.log(err)

})


}

function handlePhoto(e){
setNewPost({...newPost,postPicture:e.target.files[0]}) //for single file
// setNewPost({...newPost,postPicture:e.target.files[0]})


console.log(newPost)


}

  

  
  return (
    <div>
      <Header/>
      <form className="border border-dark" onSubmit={handleSubmit} encType='multipart/form-data'>

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
        <input 
                type={'file'}
                accept='.png, .jpg, .jpeg'
                name='postPicture'
                onChange={handlePhoto}
            />

        <div className="m-5 text-start">
            <button className="btn btn-primary ms-3">Add Your Day</button>
        </div>
            
     


        
      </form>
      {/* <ImageUp id ={id} postBody = {postBody} postTitle={postTitle} /> */}
    </div>
  );
};

export default NewPost;