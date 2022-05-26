import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PostedComments = (props) => {
    const { postID } = props;
    const [loaded, setLoaded] = useState(false);
    const [comments, setComments] = useState([])
    // const [commentAuthor, setCommentAuthor] = useState([]);    

    console.log(postID)

    async function getCommentData(){
        try {
        var getComments = await axios.get(`http://localhost:8000/api/comments/all/${postID}`, {withCredentials: true})
        var commentsData = getComments.data
        console.log(commentsData)
        for (var i = 0; i < commentsData.length; i++){
            console.log(commentsData[i])
            setComments(... comments, commentsData[i])
        };
        console.log(comments)
        comments.map((comment, index) => {
            var getAuthor = axios.get(`http://localhost:8000/api/users/${comment.commentByUser}`, {withCredentials: true})
            console.log(getAuthor.data)
            var authorName = getAuthor.data
            console.log(authorName)
            comment.author = `${authorName.firstName} ${authorName.lastName}`
        })
        setLoaded(true)
    
        } catch (err) {
            console.log(err)
        }
        return comments
    }
    
    useEffect( () => {
        getCommentData()
    }, [])

    // useEffect ( () => {Promise.all([
    //     axios.get(`http://localhost:8000/api/comments/all/${postID}`, {withCredentials: true})
    //         .then(res => {
    //             setComments(res.data)
    //             console.log(res.data)
    //             comments.map( (comment, index) => {
    //                 axios.get(`http://localhost:8000/api/users/${comment.commentByUser}`, {withCredentials: true})
    //                     .then (res => {
    //                         comment.author = `${res.data.firstName} ${res.data.lastName}`
    //                     })
    //             })
    //             return comments
    //         })
                // get author name for the posted comment
            // .then((res) => {
            //         setCommentAuthor.name(`${res.firstName} ${res.lastName}`)
            //         setLoaded(true)
            // })
    //         .catch(err => console.log(err))
    // ])}, [loaded]);

    return (
        <div>
            {
                loaded && comments.map((comment, index) => {
                    return (
                    <div key={index} id={comment.id}>
                        <h4>{comment.author}</h4>
                        <p>{comment.body}</p>
                    </div>
                    )
                })
            }

        </div>
    );
};

export default PostedComments;