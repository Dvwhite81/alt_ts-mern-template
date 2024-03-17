import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../hooks/useUserFunctions";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

let user: any
let setUser: any

export const UserContext = createContext({ user, setUser });

export const UserProvider = ({ children }) => {
    [user, setUser] = useState({
        isLoggedIn: false,
        token: "",
        user: {
            name: "",
            email: "",
            admin: false,
        }
    })

    let { fetchUser } = useUser()

    useEffect(() => {
        fetchUser(user,setUser)
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )

}