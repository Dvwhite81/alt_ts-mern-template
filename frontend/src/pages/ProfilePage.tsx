
import React, { useEffect } from "react";
import { useTitle } from "../hooks/useChangeTitle";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
    const navigate = useNavigate()
    const { user } = React.useContext(UserContext)
    useEffect(() => {
        if (user.isLoggedIn === false) return navigate("/login")
    }, [])
    useTitle(user.user.name)
    return (
        <div className="flex justify-center h-screen w-screen pt-32">
            <div>
                <h1 className="font-bold text-2xl mb-2">User Details</h1>
                <p>Id: {user.user.id}</p>
                <p>Name: {user.user.name}</p>
                <p>Email: {user.user.email}</p>
            </div>
        </div>
    )
}