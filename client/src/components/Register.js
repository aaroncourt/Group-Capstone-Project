import React, { useState } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

const Register = (props) => {
    //source: lecture
    const [registrationConfirmed, setRegistrationConfirmed] = useState("")
    const [errors, setErrors] = useState({})

    const [user, setUser] = useState({
        username: "",
        firstName: "",
        LastName: "",
        userEmail: "",
        userDOB: "",
        userCity: "",
        userState: "",
        userBio: "",
        userHobbies: "",
        userProfilePic: "",
        password: "",
        confirmPassword:""
    })

    const changeHandler = (e) => {
        console.log("changing")
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const registering = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/new",
            user,
            { withCredentials: true })
            .then((res) => {
                console.log(res.data)
                setUser({
                    username: "",
                    firstName: "",
                    LastName: "",
                    userEmail: "",
                    userDOB: "",
                    userCity: "",
                    userState: "",
                    userBio: "",
                    userHobbies: "",
                    userProfilePic: "",
                    password: "",
                    confirmPassword:""
                })
                setRegistrationConfirmed("Thanks for registering. You can now login",)
                setErrors({})
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data.errors)
                alert("password must be at least 8 characters and passwords must match")
            })
    }


    return (
        <div>
            <div className="regFormContainer">
                <h2>Not already a member? Sign up</h2>
                
                <Form onSubmit={registering}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            required
                            type="username" placeholder="First name" type="text" name="firstName" value={user.firstName}
                            onChange={changeHandler} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            required
                            type="text" placeholder="Last Name" type="text" name="LastName" value={user.LastName}
                            onChange={changeHandler} />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control placeholder="Email" type="email" name="userEmail" value={user.userEmail}
                            onChange={changeHandler}
                        />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control placeholder="Date of birth" type="text" name="userDOB" value={user.userDOB}
                            onChange={changeHandler}
                        />


                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control placeholder="City" type="text" name="userCity" value={user.userCity}
                            onChange={changeHandler}
                        />

                    </Form.Group>



                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control placeholder="State" type="text" name="userState" value={user.userState}
                            onChange={changeHandler}
                        />


                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control as="textarea" rows="5" columns="8" placeholder="Enter your bio" name="userBio" value={user.userBio}
                            onChange={changeHandler}
                        />


                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control placeholder="Hobbies" type="text" name="userHobbies" value={user.userHobbies}
                            onChange={changeHandler}
                        />


                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control placeholder="Profile pic" type="text" name="userProfilePic" value={user.userProfilePic}
                            onChange={changeHandler}
                        />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">

                        <Form.Control type="text" placeholder="Enter password" name="userPassword" value={user.userPassword}
                            onChange={changeHandler}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">

                        <Form.Control type="text" name="confirmUserPassword" placeholder="Confirm password" value={user.confirmUserPassword}
                            onChange={changeHandler}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                    {registrationConfirmed ? <p style={{ marginTop: "20px", marginBottom: "50px", fontWeight:"700", textAlign:"center" }}>{registrationConfirmed}</p> : null}



                </Form>

            </div>
        </div>

    )
}

export default Register;
