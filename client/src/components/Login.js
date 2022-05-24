import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Login = (props) => {

    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/login",
            {
                userEmail: userEmail,
                userPassword: userPassword,
            },
            { withCredentials: true },
        )
            .then((res) => {
                console.log(res, "res")
                console.log(res.data, "is data")
                navigate("/home")
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorMessage("Username or password incorrect");
            })
    }

    return (
        <div>

            <Container max-width="md" className="loginContainer">

                <Row>

                    <Form onSubmit={login}>
                        <Row>
                            <Col xs="12" lg="4">
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control
                                        type="text"
                                        name="userEmail"
                                        placeholder="Enter email"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs="12" lg="4">
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control
                                        type="text"
                                        name="userPassword"
                                        placeholder="Enter password"
                                        value={userPassword}
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

            </Container>

        </div>

    )

}

export default Login;