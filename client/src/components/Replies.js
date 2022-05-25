import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'



const Replies = (props) => {
    const { user, setUser } = props;
    const { id } = useParams();
    const { comments, setComments } = props;
    const { content, setContent } = props;

    useEffect(() => {
        axios.get(`http://localhost:8000/api/comments/all/${id}`,
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
                // setComments(res.data)
            })

            .catch((err) => {
                console.log(err);
            })
    }, [])


    const addAReply = () => {
        axios.post(`http://localhost:8000/api/comments/new`,
            {
                content, 
                commentByUser: id
            })
            .then((res) => {
                console.log(res.data);
                setComments(res.data)
                setContent(res.data)
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
                            {/* <button onClick={() => likeReply(reply)}>Like</button> */}
                        </div>
                    ))
                    : null
            }
        </div>
    )
}


export default Replies;
