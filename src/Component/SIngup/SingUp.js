import React, { useState } from "react";
import "./SIngUp.css";

import { Container, Button, Form } from "react-bootstrap";

const singupData = (singdata) => {
  fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBryqUWKnwugdGDCAlYbo_fdEvZTV0CxlY",
    {
      method: "POST",
      body: JSON.stringify(singdata),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((reponse) => {
      console.log(reponse);
    })
    .catch((error) => {
      alert(error);
    });
};

const SingUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

  const submitSinguupHandler = (event) => {
    event.preventDefault();
    console.log(email, password, conformPassword);

    if (password === conformPassword) {
      singupData({
        email: email,
        password: password,
        returnSecureToken: true,
      });
      setEmail("");
      setPassword("");
      setConformPassword("");
      console.log(" User has successfully signed up");
    } else {
      alert("password mismatch");
    }
   
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
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
        <h3>SingUp</h3>
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
          <Form.Group controlId="FormBasicConfomPassword">
            <Form.Label>Conform Possword</Form.Label>
            <Form.Control
              type="conformPassword"
              value={conformPassword}
              onChange={changeConformPass}
              required
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            SingUp
          </Button>
        </Form>

        <p>
          Have an account?
          <Button variant="outline-primary">Login</Button>
        </p>
      </div>
    </Container>
  );
};
export default SingUp;
