import React, { useEffect, useState } from "react";
import {  ListGroup, ListGroupItem } from "react-bootstrap";
import PersonIcon from "@mui/icons-material/Person";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";

const SentMail = () => {
  const [mail, setMail] = useState([]);
  const navigate = useNavigate();
  const sendMail = localStorage.getItem("email");
  const senderEmail = sendMail.replace("@", "").replace(".", "");

  const sentDataFetch = () => {
    fetch(
      `https://mail-bo-default-rtdb.firebaseio.com/send/${senderEmail}.json`
    )
      .then((response) => response.json())
      .then((data) => {
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

  useEffect(() => {
    sentDataFetch();
  }, [senderEmail]);

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
            sentDataFetch();
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

  const openSentMail = async (itemId) => {
    try {
      const updatedDetails = mail.map((item) =>
        item.id === itemId ? { ...item, visibility: false } : item
      );
      setMail(updatedDetails);

      // Update visibility in the Firebase database
      await fetch(
        `https://mail-bo-default-rtdb.firebaseio.com/send/${senderEmail}/${itemId}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            visibility: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate(`/SentRead/${itemId}`);
    } catch (error) {
      console.error("Error updating visibility data in the database:", error);
    }
  };

  return (
    <div>
      <h5
        className="mt-3"
        style={{
          textAlign: "center",
          textDecoration: "transperant",
          fontWeight:'bold',
          color: "white",
        }}
      >
        SENT BOX
      </h5>

      {mail.map((data) => (
        <ListGroup style={{ margin: " 5px 2rem", border: "1px solid black" , backgroundColor:'gray' }}>
          <ListGroupItem
            onClick={() => openSentMail(data.id)}
            key={data.id}
            style={{
              cursor: "pointer",
            }}
          >
            <PersonIcon />
            <strong style={{ margin: "1rem" }}>To: {data.email}</strong>
            <span>{data.time}</span>
          </ListGroupItem>

          <DeleteOutlineIcon
             
            onClick={() => deleteMessage(data.id)}
            style={{ cursor: "pointer", color: "red",margin:'15px' }}
          /> 
        </ListGroup>
      ))}
    </div>
  );
};

export default SentMail;