import React, { useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthoContext } from "../store/AuthoContext";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import ForwardRoundedIcon from "@mui/icons-material/ForwardRounded"
import MailIcon from '@mui/icons-material/Mail';

const Header = () => {
  const ctx = useContext(AuthoContext);
  const Navigate = useNavigate();

  const logOutHandler = () => {
    ctx.logOut(false);
    Navigate("/");
  };

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        style={{
          marginBottom: "1rem",
          padding: "2rem ",
          boxShadow: "1px 1px 1px 1px red",
        }}
      >
        <Navbar.Brand style={{textDecoration:'underline red'}}><MailIcon/> Mail Box Client <MailIcon/> </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto" >
            <Link
              to="/home"
              style={{
                textDecoration: "none",
                fontSize: "1.4rem",
                color: "yellow",
                marginRight:'25px'
              }}
            >
              Compose
            </Link>

            <Link
              to="/Inbox"
              style={{
                textDecoration: "none",
                fontSize: "1.4rem",
                color: "white",
                marginRight:'20px'
              }}
            >
              <AllInboxIcon/>
              Inbox
            </Link>

            <Link
              to="Sent"
              style={{
                textDecoration: "none",
                fontSize: "1.4rem",
                color: "yellow",
              }}
            >
              <ForwardRoundedIcon/>
              Sent
            </Link>
          </Nav>
        </Navbar.Collapse>
        {ctx.isLogine && (
          <Button variant="outline-warning" onClick={logOutHandler}>
            logOut
          </Button>
        )}
      </Navbar>
    </>
  );
};

export default Header;
