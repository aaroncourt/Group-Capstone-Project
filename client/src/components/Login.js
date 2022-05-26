import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from "../components/Header"

const Login = (props) => {

    const navigate = useNavigate();

    
    const [loginInfo,setLoginInfo] = useState({
        username:"",
        password:""
    })
    const[erros,setErrors] = useState([])


    const hadnleChange = (e) => {
        setLoginInfo({
            ...loginInfo,[e.target.name]:e.target.value
        })
    }

    async function loginHand(e){
        e.preventDefault()
        axios.post('http://localhost:8000/api/users/login',loginInfo,{withCredentials:true})
            .then((data) => {
                console.log('login in successfully')
                console.log(data)
                navigate("/home")
})
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data.message)
                console.log(err.response.data.message)
            })


    }

    return (
        <div>

            {/* <Container max-width="md" className="loginContainer">

                <Row>

                    <Form onSubmit={login}>
                        <Row>
                            <Col xs="12" lg="4">
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control
                                        type="text"
                                        name="userEmail"
                                        placeholder="Enter email"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs="12" lg="4">
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control
                                        type="{passowrd}"
                                        name="userPassword"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setUserPassword(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs="12" lg="4">
                                <Form.Group>
                                    <Button style={{ width: "100%" }} variant="primary" type="submit">Sign in</Button>
                                </Form.Group>
                            </Col>

                        </Row>
                        <p className="loginErrorMessage">{errorMessage ? errorMessage : ""}</p>
                    </Form>
                </Row>

            </Container> */}

<div className=' container ' >

            <form className='login-form align-items-center  ' onSubmit={loginHand}>
                <h1>Welcome Back!</h1>
                <div className='login-from-element row mb-3  '>
                    <label className='col-sm-1 col-form-label col-form-label-sm'>Username: </label>
                    <input className='form-control form-control-sm' onChange={(e) =>hadnleChange(e)} name="username" value={loginInfo.username} type="text" placeholder='use your email to login' />
                </div>
                <div className='login-from-element row mb-3'>
                    <label className='col-sm-1 col-form-label col-form-label-sm'>Password:  </label>
                    <input className='form-control form-control-sm'  onChange={(e) =>hadnleChange(e)} name="password" value={loginInfo.passowrd} type="password" placeholder='enter your password' />
                    {erros ? <p id='red'>{erros}</p> : null}
                </div>
                
                <div className='login-btn-reg'>
                    <button className="btn btn-success" >Login</button>
                </div>

            </form>
        </div>

        </div>

    )

}

export default Login;
