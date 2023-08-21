import React, { useState } from "react";

export const AuthoContext = React.createContext({
    idToken:'',
    isLogine: false,
    setIdToken: () =>{},
    logOut : () =>{}
})

const ContextProvider = (props) =>{
 
const initialToken = localStorage.getItem("idToken");

  const [idToken,setIdToken] = useState(initialToken);
  
  const userIsLoggedIn = !!idToken;
   
    const loginHandler = (idToken)=>{
        setIdToken(idToken);
        localStorage.setItem("idToken", idToken);
    }

    const logOutHandler = () =>{
        setIdToken(null);
       localStorage.getItem("idToken");
    }

    const ctxValue = {
        idToken:idToken,
        isLogine: userIsLoggedIn,
        setIdToken:loginHandler ,
        logOut : logOutHandler
    }

    return(
        <AuthoContext.Provider value={ ctxValue }>
            {props.children}
        </AuthoContext.Provider>
    )
};

export default ContextProvider;