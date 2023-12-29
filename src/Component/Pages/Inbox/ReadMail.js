import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useParams } from "react-router";

const ReadMail = () => {
  const [message, setMessage] = useState({});
  const param = useParams();
  const id = param.id;

  console.log(id);

  const email = localStorage.getItem("email");
  const receiveEmail = email.replace("@", "").replace(".", "");

  useEffect(() => {
    const fethMessage = async () => {
      try {
        const response = await fetch(
          `https://mail-bo-default-rtdb.firebaseio.com/receive/${receiveEmail}/${id}.json`
        );
        const data = await response.json();

        if(data.error){
          console.log(data.error);
        } else {
          setMessage(data);
        }
      } catch (error) {
        alert(error.message);
      }
    };

    fethMessage();
  }, [receiveEmail, id]);

  return (
    <Container>
      <Row>
        <Col>
          <Card style={{ padding: "40px", margin: "40px",border:'2px solid yellow' }}>
            <AccountCircleIcon />
            <Card.Title>To:- {email}</Card.Title>
            {message.subject && (
              <>
                <Card.Title>From :- {message.email}</Card.Title>
                <Card.Title>subject :- {message.subject}</Card.Title>
                <Card.Text>content :- {message.content}</Card.Text>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReadMail;
