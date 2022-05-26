import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
function ImageUp(props) {
    
    const [newPost,setNewPost] = useState(
        {
        postPicture:''
        }
    )
    
    const id = props.id
    const postTitle = props.postTitle
    const postBody = props.postBody
    const navigate = useNavigate();
    console.log(postTitle,postBody)

    console.log(id)

    function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append('postTitle',postTitle);
    formData.append('postBody',postBody);
    formData.append('postPicture',newPost.postPicture);

    console.log(newPost.postPicture)
    axios.put(`http://localhost:8000/api/post/addimage/${id}`,formData,{withCredentials: true})
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
    <h3>Edit Image</h3>
    <form onSubmit={handleSubmit} encType='multipart/form-data'>
            
            <input 
                type={'file'}
                accept='.png, .jpg, .jpeg'
                name='postPicture'
                onChange={handlePhoto}
            />

            <input type="submit" 

            />

        
        </form>
    </div>
)
}

export default ImageUp