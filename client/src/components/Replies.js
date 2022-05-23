import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'



const Replies = (props) => {
    const { user, setUser } = props;
    const { id } = useParams();
    const { socket } = props;
    const { comments, setComments } = props;
    const { content, setContent } = props;

    useEffect(() => {
        axios.get(`http://localhost:8000/api/comments/all/${id}`,
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
            })

            .catch((err) => {
                console.log(err);
            })
    }, [])




    useEffect(() => {
        socket.on("Update_chat_likes", (data) => {
            console.log("our socket updated list", data)
            setComments(data)

        })
    }, [])


    //from course code
    const likeReply = (replyFromBelow) => {
        axios.put(`http://localhost:8000/api/comments/all/${replyFromBelow._id}`,
            {
                likes: replyFromBelow.likes + 1
            }
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
                let updatedCommentsList = comments.map((reply, index) => {
                    if (reply === replyFromBelow) {
                        let commentHolder = { ...res.data };
                        return commentHolder;
                    }
                    return reply;
                });


                socket.emit("Update_chat", updatedCommentsList)
            })
    }

    const addAReply = () => {
        axios.post(`http://localhost:8000/api/comments/new`,
            {
                content, 
                reply: id
            })
            .then((res) => {
                console.log(res.data);
                setComments([res.data, ...comments])
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
            <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />

            <button onClick={addAReply}>Add reply</button>
            {
                comments ?
                    comments.map((reply, index) => (
                        <div key={index}>
                            <p>{reply.content}</p>
                            <button onClick={() => likeReply(reply)}>Like {reply.likes}</button>
                        </div>
                    ))
                    : null
            }
        </div>
    )
}


export default Replies;
