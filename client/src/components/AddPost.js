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
            <div className="addContainer">
                <div className="text-start">
                    <label className="addPostHeaders">Title:</label><br></br>
                    <input className="postTitleEntry" onChange={(e) => setPostTitle(e.target.value)} name="postTitle" value={postTitle}/>
                    <br></br>
                    {errors.name ? <span className="text-danger">{errors.name.message}</span> : null}
                </div>
                <div className="text-start">
                    <label className="addPostHeaders">Tell Us About Your Day:</label><br></br>
                    <textarea className="postBodyText" rows="5" columns="9" placeholder="Tell us about your day"  onChange={(e) => setPostBody(e.target.value)} name="postBody" value={postBody}/>
                    <br></br>
                    {errors.type ? <span className="text-danger">{errors.type.message}</span> : null}
                {/* <div className="form-group">
                    <label>Photo:</label>
                    <input type="file" className="form-control" onChange={(e) => setPostPicture(e.target.value)} name="postPhoto" accept="image/*"/>
                    <br></br>
                    {errors.name ? <span className="text-danger">{errors.name.message}</span> : null}
                </div> */}
            </div>

        <div>
        <label className="addPostHeaders" style={{paddingRight: "20px", textAlign: "left"}}>Add a photo</label>
        <input 
                type={'file'}
                accept='.png, .jpg, .jpeg'
                name='postPicture'
                onChange={handlePhoto}
            />
</div>
<div className="text-start" style={{marginTop:"30px", marginBottom:"30px"}}>
            <button className="btn btn-primary">Add Your Day</button>
        </div>
</div>

           
</form>
    </div>
  );
};

export default NewPost;