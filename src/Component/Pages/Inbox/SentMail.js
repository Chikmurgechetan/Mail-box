import React, { useEffect, useState } from "react";
import { Button, Container, ListGroup, ListGroupItem } from "react-bootstrap";
//import { useNavigate } from "react-router";
import PersonIcon from "@mui/icons-material/Person";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const SentMail = () => {
  const [Mail, setMail] = useState([]);
  // const navigate = useNavigate();

  const sendMail = localStorage.getItem("email");
  const senderEmail = sendMail.replace("@", "").replace(".", "");

 
    const SentdataFetch = () => {
      fetch(
        `https://mail-bo-default-rtdb.firebaseio.com/send/${senderEmail}.json`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const fetchedData = [];
          for (const key in data) {
            fetchedData.push({
              id: key,
              time: data[key].time,
              subject: data[key].subject,
              email: data[key].email,
            });
          }
          setMail(fetchedData);
        });
    };
   useEffect(()=>{
    SentdataFetch()
   },[senderEmail]) 
  
  const deleteMessage = (itemId) => {
    try {
      fetch(
        `https://mail-bo-default-rtdb.firebaseio.com/send/${senderEmail}/${itemId}.json`,
        {
          method: "DELETE",
        }
      )
        .then((response) => {
          if (response.ok) {
            console.log("Data Delete Successfully!");
            SentdataFetch()
          } else {
            throw new Error("Delete operation failed");
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Container>
      <ListGroup >
        <h5
          className="mt-3"
          style={{ textAlign: "center", textDecoration: "underline red" }}
        >
          Sent Box
        </h5>
        {Mail.map((data) => (
          <ListGroupItem key={data.id} style={{ border: "1px solid black",margin:'10px'}}>
            <PersonIcon />
            <strong style={{marginRight:'1rem'}}>To: {data.email}</strong>
            <span>{data.time}</span>
            <Button variant="black" onClick={() => deleteMessage(data.id)}
               style={{ cursor: "pointer", color: "black", marginLeft:'2rem' }}
            >
              <DeleteOutlineIcon />
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};

export default SentMail;
