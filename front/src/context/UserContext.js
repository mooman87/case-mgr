import Axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import domain from "../util/domain";

const UserContext = createContext();

function UserContextProvider(props) {
  const [user, setUser] = useState(undefined); 

  async function getUser() {
    try {
      const userRes = await Axios.get(`${domain}/auth/loggedIn`);
      setUser(userRes.data ?? null);
    } catch (err) {
      console.error("Error checking logged-in status:", err);
      setUser(null);
    }
  }

  useEffect(() => {
    Axios.defaults.withCredentials = true; 
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };
