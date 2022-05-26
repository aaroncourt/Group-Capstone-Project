import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useParams, Link, useNavigate} from "react-router-dom";
import "./style.css"


const Header = () => {
    const[user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/logedinuser", {withCredentials: true})
        .then((res)=>{
            setUser(res.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])

    const logout = () => {
        axios.post("http://localhost:8000/api/users/logout", {}, {withCredentials: true})
        .then((res)=>{
            console.log(res.data);
            navigate("/")
        })
        .catch((err)=>{
            console.log(err);
        })

    }

    function setUserInfo(){
        axios.get("http://localhost:8000/api/logedinuser", {withCredentials: true})
        .then((res)=>{
            console.log(res.data);
            return res.data;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })

    }

    return (
       <div>
        <div className="header d-flex align-items-center flex-column">
            <div className="header_ph d-flex justify-content-center align-items-center flex-column">
                <h1>A Day...</h1>
            </div>
            <div className="nav border border-dark mt-5">
                <div className="row d-flex mx-auto justify-content-between align-items-center">
                    <div className="col-3">
                        <Link to={"/home"} className="clean_link"><h5>Home</h5></Link>
                    </div>
                    <div className="col-3">
                        <Link to={"/add"} className="clean_link"><h5>New</h5></Link>
                    </div>
                    <div className="col-3">
                        <Link to={`/user/${user._id}`} className="clean_link"><h5>My Posts</h5></Link>
                    </div>
                    <div className="col-3">
                        <Link to={""} className="clean_link" onClick={logout}><h5>Logout</h5></Link>
                    </div>
                </div>
            </div>
        </div>
       </div>
    )
}

export default Header;
