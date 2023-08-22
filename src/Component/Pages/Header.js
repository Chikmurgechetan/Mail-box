import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router";
import { AuthoContext } from "../store/AuthoContext";


const Header  = () =>{
   const navigate = useNavigate();
   const ctx = useContext(AuthoContext);

   const LogoutHandler =() =>{
        ctx.logOut(false);
         navigate('/');
   }

    return(
        <Button style={{marginLeft:'90%',borderBottom:'1px solid black'}} variant="black" onClick={LogoutHandler} >Delete<DeleteIcon/></Button>
    )
};

export default Header;