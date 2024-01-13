import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { Navigate } from "react-router-dom";
import Pageloading from "./Pageloading";
function ProtectedRoutes({ children }) {
  const [user, isloading, error] = useAuthState(auth);
  if(isloading){
    return <Pageloading/>
  }
  if(!user){
    return <Navigate to={"/login"}/>
  }
  return children;
  
}

export default ProtectedRoutes;
