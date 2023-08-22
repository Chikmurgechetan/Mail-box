import React, { useContext, useState } from "react";
import "./SIngUp.css";

import { Container, Button, Form } from "react-bootstrap";
import { AuthoContext } from "../store/AuthoContext";
import { useNavigate } from "react-router";

const SingUp = () => {
  const ctx = useContext(AuthoContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [isLogin, setIsLogine] = useState(true);
  const navigate = useNavigate();

  const switchHandler = () => {
    setIsLogine((prevState) => !prevState);
  };

  const submitSinguupHandler = async (event) => {
    event.preventDefault();
    console.log(email, password, conformPassword);

    localStorage.setItem('email',email);

    if (!isLogin && password !== conformPassword) {
      alert("Confirmation password does not match");
      return;
    }

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBryqUWKnwugdGDCAlYbo_fdEvZTV0CxlY";

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBryqUWKnwugdGDCAlYbo_fdEvZTV0CxlY";
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.error) {
        alert(data.error.message);
      } else {
        if (isLogin) {
          ctx.setIdToken(data.idToken);
          navigate("/home");
        }
        setIsLogine(true);
      }
      console.log(data);
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
    localStorage.setItem('email',email);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const changeConformPass = (event) => {
    setConformPassword(event.target.value);
  };

  return (
    <Container className="container">
      <div className="style">
        <h3>{isLogin ? "Login" : "SingUp"}</h3>
        <Form onSubmit={submitSinguupHandler}>
          <Form.Group controlId="FormBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={changeEmail}
              required
            />
          </Form.Group>
          <Form.Group controlId="FormBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={changePassword}
              required
            />
          </Form.Group>
          {!isLogin && (
            <Form.Group controlId="FormBasicConfomPassword">
              <Form.Label>Conform Possword</Form.Label>
              <Form.Control
                type="password"
                value={conformPassword}
                onChange={changeConformPass}
                required
              />
            </Form.Group>
          )}
          <Button variant="dark" type="submit">
            {isLogin ? "Login" : "SingUp"}
          </Button>
        </Form>
        {isLogin && (
          <a href="/forgot-password" className="link">
            Forgot Password
          </a>
        )}
        <Button
          variant="outline-primary"
          className="singBtn"
          onClick={switchHandler}
        >
          {isLogin ? "Don't Have an Account? Sign Up" : "Login"}
        </Button>
      </div>
    </Container>
  );
};
export default SingUp;
