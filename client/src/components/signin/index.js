import React, { useState } from "react";
import "./index.css";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_IN, USER, USERDATA, SHOWSIGNUP } from "../../actions";
import API from "../../utils/API";
import { useHistory } from 'react-router-dom';

function Signin(){  
    const [ error, setError ] = useState({});     
    const dispatch = useDispatch();  
    const handleChange = e => {
        e.persist();
        dispatch(USER(e.target));
    };
    const show = () => {
        dispatch(SHOWSIGNUP());
    };
    const userState = useSelector(state => state.user);   
    const history = useHistory();
    const signIn = e => {
        e.preventDefault();       
        if(!userState.password || !/\S+@\S+\.\S+/.test(userState.email)){
            setError({...error, login: "invalid login" })
        } else {
            API.checkUser(userState.email, userState.password)
            .then(res => {       
                if(res.data.email === userState.email){                    
                    dispatch(USERDATA(res.data));            
                    dispatch(SIGN_IN());                    
                    history.push("/main");
                } else {
                    setError({...error, login: "invalid login" })
                }
            })
            .catch(err => console.log(err))
        }    
    };    
    return (
        <Container id="signInContainer">           
            <Form>
                <Row>
                    <Col>
                        <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={handleChange} name="email" type="text" placeholder="name@email.com" />
                        {error.login && (<p className="text-danger">{error.login}</p>)}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={handleChange} name="password" type="password" />
                        </Form.Group>
                    </Col>
                    <Col className="align-self-center">
                        <Button variant="primary" type="submit" onClick={signIn}>Sign in</Button>
                    </Col>
                </Row>      
            </Form>          
            <Row id="forgot">
                <Col >
                    Forgot <Button className="noOutline"> Password</Button>?
                </Col>
                <Col className="text-right">
                    <Button onClick={show}>Sign up</Button>
                </Col>
            </Row>
        </Container>
    )
};

export default Signin;