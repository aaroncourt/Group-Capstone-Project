import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PostedComments = (props) => {
    const { postID } = props;
    const [loaded, setLoaded] = useState(false);
    const [comments, setComments] = useState();
    // const [commentAuthor, setCommentAuthor] = useState([]);    

    console.log(postID)

    async function getPostData(){
        try {
            var getComments = await axios.get(`http://localhost:8000/api/comments/all/${postID}`, {withCredentials: true})
            var commentsData = getComments.data
            console.log(commentsData)
            var comments = []
            for (var i = 0; i < commentsData.length; i++){
                console.log(commentsData[i])
                var getAuthor = await axios.get(`http://localhost:8000/api/users/${commentsData[i].commentByUser}`, {withCredentials: true})
                var authorData = getAuthor.data
                console.log(authorData)
                commentsData[i]['authorName'] = `${authorData.firstName} ${authorData.lastName}`
                console.log(commentsData[i])
                comments.push(commentsData[i])
            };
                
            setLoaded(true)
            setComments(comments)
            return comments
        } catch (err) {
            console.log(err)
        }
    }
    
    useEffect( () => {
        getCommentData()
    }, [loaded])

    console.log(comments)


    // useEffect ( () => {Promise.all([
    //     axios.get(`http://localhost:8000/api/comments/all/${postID}`, {withCredentials: true})
    //         .then(res => {
    //             setComments(res.data)
    //             console.log(res.data)
    //             comments.map( (comment, index) => {
    //                 axios.get(`http://localhost:8000git add ./api/users/${comment.commentByUser}`, {withCredentials: true})
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
                loaded && comments.map((comments, index) => {
                    return (
                    <div key={index} id={comments.id}>
                        <h4>{comments.author}</h4>
                        <p>{comments.body}</p>
                    </div>
                    )
                })
            }
        </div>
    );
};

export default PostedComments;