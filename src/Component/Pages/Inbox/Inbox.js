import { InboxOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import BlueDot from "./BlueDot";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

// ... (imports and other code)

const Inbox = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const receiveEmail = email.replace("@", "").replace(".", "");

  console.log(receiveEmail);
  // Add a state variable to keep track of unread message count
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchItems = async () => {
    console.log(receiveEmail);
    try {
      const response = await fetch(
        `https://mail-bo-default-rtdb.firebaseio.com/receive/${receiveEmail}.json`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const fetchedData = [];
        for (const key in data) {
          fetchedData.push({
            id: key,
            time: data[key].time,
            subject: data[key].subject,
            email: data[key].email,
            visibility: data[key].visibility,
          });
        }
        const unreadMessages = fetchedData.filter((item) => item.visibility);
        setUnreadCount(unreadMessages.length);
        setData(fetchedData);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [receiveEmail]);

  // Full read Messaga Function

  const openReadPage = async (itemId) => {
    try {
      const updatedDetails = data.map((item) =>
        item.id === itemId ? { ...item, visibility: false } : item
      );
      setData(updatedDetails);

      // Update visibility in the Firebase database
      await fetch(
        `https://mail-bo-default-rtdb.firebaseio.com/receive/${receiveEmail}/${itemId}.json`,
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
      navigate(`/read/${itemId}`);
    } catch (error) {
      console.error("Error updating visibility data in the database:", error);
    }
  };

  //deleting the mails
  const deleteMessage = (itemId) => {
    fetch(
      `https://mail-bo-default-rtdb.firebaseio.com/receive/${receiveEmail}/${itemId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Data Delete Successfully!");
          fetchItems();
          // You can call FeatchItems() here to fetch updated data after deletion
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div>
      <h2
        style={{
          margin: "0 20rem",
          color: "white",
          textDecoration: " transparent",
        }}
      >
        <InboxOutlined style={{margin:'10px'}}  />
          Welcome to Inbox
         <InboxOutlined style={{margin:'10px'}}/>
         
      </h2>
      <div style={{ border: "1px solid black", padding: "10px 200px" }}>
        <p style={{ textDecoration: "underline red", color: "white" }}>
          Unread Messages: ({unreadCount})
        </p>
        {data.map((item, index) => (
          <ListGroup
            key={index}
            style={{
              margin: "4px",
              border: "1px solid black",
              backgroundColor: "gray",
            }}
          >
            <ListGroupItem
              onClick={() => openReadPage(item.id)}
              style={{ cursor: "pointer", fontWeight: "bold" }}>

              {item.visibility && <BlueDot />}
              BY: {item.email}----{item.subject}------
              {item.time}


              <DeleteIcon
              onClick={() => deleteMessage(item.id)}
              style={{ cursor: "pointer", color: "black", marginLeft:'1rem' }}

            />

            </ListGroupItem>
            
          </ListGroup>
        ))}
      </div>
    </div>
  );
};

export default Inbox;
