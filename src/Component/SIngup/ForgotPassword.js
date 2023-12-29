import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";

const ForgotPassword = () => {
  const navigat = useNavigate();
  const [email, setEmail] = useState("");

  const passwordRestHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBryqUWKnwugdGDCAlYbo_fdEvZTV0CxlY",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (data.error) {
        alert(data.error.message);
      } else {
        alert("A Password reset link has been sent to your email");
        navigat("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  return (
    <>
      <h3 style={{ margin: " 5px 30rem", textDecoration: "underline red" }}>
        Change Password
      </h3>
      <Container>
        <Form onSubmit={passwordRestHandler} style={{ maxWidth: "400px" }}>
          <Form.Group>
            <Form.Label htmlFor="email">Register Email</Form.Label>
            <Form.Control
              type="email"
              id="email"
              value={email}
              onChange={onChangeEmail}
              style={{ marginBottom: "10px" }}
            />
          </Form.Group>
          <Button type="submit">Reset Password</Button>
        </Form>
      </Container>
    </>
  );
};

export default ForgotPassword;
