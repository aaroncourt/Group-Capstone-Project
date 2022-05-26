import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useParams, Link, useNavigate} from "react-router-dom";
import "./style.css"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Replies from "../components/Replies"
import Header from "./Header"
<<<<<<< HEAD
=======


>>>>>>> parent of 325636e (push for code testing)

const Main = (props) => {
    const[posts, setPosts] = useState([{comments: ""}]);
    const {id} = useParams(); 
    const[user, setUser] = useState({});
    const[pictures, setPictures] = useState();
    const[likes, setLikes] = useState();
    const navigate = useNavigate();
    const [picDeleted,setPicDeleted] = useState(false)
    const [loaded, setLoaded] = useState(false)

    async function getPostData(){
        try {
            // get posts
            var packagedPosts = []
            var getPosts = await axios.get(`http://localhost:8000/api/posts/all`, {withCredentials: true})
            var gottenPosts = getPosts.data
            for(var i = 0; i < gottenPosts.length; i++){
                packagedPosts.push(gottenPosts[i])
                // get comments by post ID
                var comments = []
                var getCommentsOnPost = await axios.get(`http://localhost:8000/api/comments/all/${gottenPosts[i]['_id']}`, {withCredentials: true})
                var commentsByPost = getCommentsOnPost.data

                for (var j = 0; j < commentsByPost.length; j++){
                    var getAuthor = await axios.get(`http://localhost:8000/api/users/${commentsByPost[j].commentByUser}`, {withCredentials: true})
                    var authorData = getAuthor.data
                    commentsByPost[j]['authorName'] = `${authorData.username}`
                    comments.push(commentsByPost[j])
                };
            
                packagedPosts[i]['comments'] = comments
            }
            setPosts(packagedPosts)
            console.log(packagedPosts)
            {posts && setLoaded(true)}
            return console.log("Loaded")
        } catch (err) {
            console.log(err)
        }

    }


    useEffect(() => {
<<<<<<< HEAD
        getPostData()
    }, [picDeleted, loaded])
=======
        axios.get(`http://localhost:8000/api/posts/all`, {withCredentials: true})
        .then((res)=>{
            setUserInfo();
            setPosts(res.data);
            console.log(posts);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [picDeleted])
>>>>>>> parent of 325636e (push for code testing)

    const setUserInfo = ()=>{
        axios.get("http://localhost:8000/api/logedinuser", {withCredentials: true})
        .then((res)=>{
            console.log(res.data);
            setUser(res.data)
        })
        .catch((err)=>{
            console.log(err);
        })

    }

    function deleteHandler (imageName) {
        axios.delete(`http://localhost:8000/api/post/deleteimage/${imageName}`,{withCredentials:true})
        .then((res) => {
            console.log(res)
            setPicDeleted(true)
            navigate("/home")

            
        })
        .catch((err) => console.log(err))
}

<<<<<<< HEAD
    if (!loaded) {
        console.log('Waiting')
        return <div className="App">Loading...</div>;
    }

    console.log(posts[0].comments)
=======

>>>>>>> parent of 325636e (push for code testing)
    return (

    <div className="mainContainer">
    <div>
        <Header/>
        <div className="mt-5 d-flex justify-content-center align-items-center flex-column">
        <Link to={"/add"} className="clean_link your_day"><button type="button" className="btn btn-success your_day">Tell Us About Your Day</button></Link>
        </div>
        { loaded &&
            posts.map((post, index)=>{
                return(
                <div key={index} className="mt-5 postMain">
                    <div className="">
                        <h3>{post.postTitle}</h3>
                    </div>

                    <div className="row d-flex mx-auto justify-content-center">
                        <div className="col-4">
                            <p>{post.postBody}</p>
                        </div>
<<<<<<< HEAD
                        {
                            post.postPicture 
                            ? <div className="col-4">
                                    <img  src={`/images/${post.postPicture[0]}`} alt=''style={{height: 250}}></img>
                            </div>

                            : null
                        }
                        
                        {post.comments.map((comment, index) =>{ 
                                return (
                                    <div key={index} id={comment._id}>
                                        <h4>{comment.authorName}</h4>
                                        <p>{comment.commentBody}</p>
                                    </div>
                                )
                            })
                        }
=======
                        {/* Testing post picture */}
                        {post.postPicture ?
                        <div className="col-4">
                                {console.log(post.postPicture)}
                                <img  src={`/images/${post.postPicture[0]}`} alt=''style={{height: 250}}></img>
                                {/* <Link to={'/home'} onClick={() => {deleteHandler(post.postPicture[0])}}>Delete</Link> */}
                        </div>
                        : null}
>>>>>>> parent of 325636e (push for code testing)
                    </div>
                    {
                        post.postedBy == user._id ?
                        <div className="mt-3 d-flex justify-content-between flex-column">
                            <Link to={`/edit/${post._id}`}><button type="button" className="btn btn-primary">Edit</button></Link>
                            <Link to={""}><button type="button" className="btn btn-primary">Comment</button></Link>
                        </div>
                        :
                        <div className="mt-3 d-flex justify-content-between flex-column">
                            <Link to={`/view/${post._id}`}><button type="button" className="btn btn-primary">View</button></Link>
                            <Link to={""}><button type="button" className="btn btn-primary">Comment</button></Link>
                        </div>
                    }
<<<<<<< HEAD
=======
                    
                    {/* {post.comments}?
                    {post.comments.map((comment, index)=>(
                        <div key={index}>
                            <p>{comment.byuser}</p>
                            <textarea>{comment.body}</textarea>
                        </div>
                        ))} 
                        :null */}
>>>>>>> parent of 325636e (push for code testing)
                </div>
            )})
        }
    </div>
    </div>
    )
}

export default Main;