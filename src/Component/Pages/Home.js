import React, { useState } from "react";
import "./Home.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { Button, Form } from "react-bootstrap";
import MailOutlineIcon from "@mui/icons-material/MailOutline";


const Home = () => {
  const [recemail, setRecEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const email = localStorage.getItem("email");
  //console.log(email);

  const submitSendHandler = (event) => {
    event.preventDefault();
    const currentTime = new Date().toLocaleString();
    const emailContent = editorState.getCurrentContent().getPlainText();
    //console.log(emailContent);
    //console.log(currentTime);
    const MailEmail = email.replace("@", "").replace(".", "");
    const visibility = true;

    fetch(
      `https://mail-bo-default-rtdb.firebaseio.com/Send Email/${MailEmail}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          email: recemail,
          subject: subject,
          content: emailContent,
          time: currentTime,
          visibility:visibility
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const ResiveEmail = recemail.replace("@", "").replace(".", "");

    fetch(
      `https://mail-bo-default-rtdb.firebaseio.com/Resive Email/${ResiveEmail}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          subject: subject,
          content: emailContent,
          time: currentTime,
          visibility:visibility
        }),

        headers: { "Content-Type": "application/json" },
      }
    );
    setRecEmail("");
    setSubject("");
    setEditorState(EditorState.createEmpty());
  };

  const onEmailStateChange = (event) => {
    setRecEmail(event.target.value);
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
                value={recemail}
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
              Send
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Home;
