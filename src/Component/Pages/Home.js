import React, { useState } from "react";
import "./Home.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { Button, Form } from "react-bootstrap";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const submitSendHandler = async (event) => {
    event.preventDefault();

    const email = localStorage.getItem("email");
    console.log(email);

    const currentTime = new Date().toLocaleString();
    const emailContent = editorState.getCurrentContent().getPlainText();
    const sendEmail = email.replace("@", "").replace(".", "");
    console.log(sendEmail);
    const visibility = true;

    const sendData = {
      email: toEmail,
      subject: subject,
      content: emailContent,
      time: currentTime,
      visibility: visibility,
    };

    try {
      const response = await fetch(
        `https://mail-bo-default-rtdb.firebaseio.com/send/${sendEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify(sendData),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      if (data.error) {
        alert(data.error.message);
      } else {
        alert("Succesefully Send Mail");
      }
    } catch (error) {
      console.log(error);
    }

    const receiveEmail = toEmail.replace("@", "").replace(".", "");
    localStorage.setItem("toEmail", toEmail);

    const receiveData = {
      email: email,
      subject: subject,
      content: emailContent,
      time: currentTime,
      visibility: visibility,
    };

    try {
      const response = await fetch(
        `https://mail-bo-default-rtdb.firebaseio.com/receive/${receiveEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify(receiveData),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (data.error) {
        alert(data.error.message);
      } else {
        console.log("succesfull send mail");
      }
    } catch (error) {
      console.log(error);
    }

    localStorage.setItem("toEmail", toEmail);
    setToEmail("");
    setSubject("");
    setEditorState(EditorState.createEmpty());

    toast.success("Sent Successfully", {
      position: "bottom-right",
      closeOnClick: true,
      pauseOnHover: false,
      theme: "colored",
      autoClose: 2000,
    });
  };

  const onEmailStateChange = (event) => {
    setToEmail(event.target.value);
  };

  const onSubjectStateChange = (event) => {
    setSubject(event.target.value);
  };

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <>
      <div className="home-container">
        <h2 className="Hed">Welcome to Mail Box</h2>
        <div className="email-form">
          <Form onSubmit={submitSendHandler}>
            <Form.Group>
              <Form.Label htmlFor="to">
                To <MailOutlineIcon />
              </Form.Label>
              <Form.Control
                type="email"
                id="to"
                value={toEmail}
                onChange={onEmailStateChange}
                placeholder="charan@gmail.com"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="subject">Subject</Form.Label>
              <Form.Control
                type="text"
                id="subject"
                value={subject}
                onChange={onSubjectStateChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label> Write Mail</Form.Label>
              <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                placeholder="Type here..."
              />
            </Form.Group>
            <Button variant="dark" type="submit">
              Send <SendIcon />
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Home;
