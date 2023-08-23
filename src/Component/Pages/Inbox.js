import { InboxOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const Inbox = () => {
  const [data, setData] = useState([]);

  const email = localStorage.getItem("email");
  // const RecEmail = email.toLocaleUpperCase("@", " ").replace(".", " ");
  const receiveEmail = email.replace("@", "").replace(".", "");
  //console.log(receiveEmail);

  const FeatchItems = () => {
    fetch(
      `https://mail-bo-default-rtdb.firebaseio.com/Send Email/${receiveEmail}.json`
    )
      .then((response) => {
        if (response.ok) {
          console.log("data is getting nicely");
          return response.json();
        } else {
          throw new Error("Failed to fetch expenses data");
        }
      })
      .then((data) => {
        console.log(data + "getting data");

        const FetchData = [];
        for (const key in data) {
          FetchData.push({
            id: key,
            time: data[key].time,
            subject: data[key].subject,
            email: data[key].email,
          });
        }

        setData(FetchData);
        console.log(FetchData[0].email + "here we are getting ");
      })
      .catch((error) => {
        console.log("Error not fetching correct data", error);
      });
  };
  useEffect(() => {
    FeatchItems();
  }, []);

  return (
    <div>
      <h2 style={{margin:'0 20rem'}}><InboxOutlined/>Wellcome to Inbox<InboxOutlined/></h2>
      <div style={{ border: "1px solid black", padding: "10px 200px" }}>
        {data.map((item, index) => (
          <ListGroup key={index} style={{margin:'4px',border: "1px solid black"}}>
            <ListGroupItem>
              BY : {item.email}----{item.subject}---------{item.time}
            </ListGroupItem>
          </ListGroup>
        ))}
      </div>
    </div>
  );
};
export default Inbox;
