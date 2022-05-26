import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewComment = (props) => {
    const { postID } = props;
    const [comment, setComment] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/comment/${postID}/new`, {comment}, {withCredentials: true})
            .then((res) => {
                navigate('/home')
            })
            .catch((err) => {
                console.log(`err is: ${err}`);
                setErrors(err.response.data.errors);
            });
    };

    return(
        <form className='hidden' onSubmit={submitHandler}>
            <textarea name="commentBody" onChange={(e) => setComment(e.target.value)}></textarea>
        </form>
    );
};

export default NewComment