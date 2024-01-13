import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
function useLoggedInUser() {
  const [ user ] = useAuthState(auth);
  //console.log(user)
  const email = user?.email;
  //console.log(email)
  const [loggedInUser, setloggedInUser] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/loggedInUser?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        setloggedInUser(data);
      });
  }, [email, loggedInUser]);
  return [loggedInUser, setloggedInUser];
}

export default useLoggedInUser;
