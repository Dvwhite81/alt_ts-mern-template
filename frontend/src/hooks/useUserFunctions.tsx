import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from "../context/userContext"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';


export const useUser = () => {
    let { user, setUser } = useContext(UserContext)

    const fetchUser = async (u: any, s: any) => {
        if (u.isLoggedIn === true) return
        let token = localStorage.getItem("token")
        if (!token) return
        if (true) {
            try {
                axios.defaults.headers.common["x-auth-token"] = token;
                await axios.get("/auth/getuserdata").then((data: any) => {
                    s({
                        isLoggedIn: true,
                        token: token,
                        user: data.data.user
                    })
                    console.log(data);
                    console.log(data.data);

                }, (err) => {
                    console.log(err);
                    toast.error(err)
                })
            } catch (err) {
                console.log(err);
                toast.error(err)
            }
        }
    }

    const logOut = async () => {

    }

    const logIn = async (email: string, password: string) => {
        try {
            await axios.post("/auth/login/", { email, password }).then((data: any) => {
                localStorage.setItem("token", data.data.token)
                setUser({
                    isLoggedIn: true,
                    token: data.data.token,
                    user: data.data.user
                })
                axios.defaults.headers.common["x-auth-token"] = data.data.token
            }, (err) => {
                console.log(err);
                throw new Error(err.response.data.error)
            })
        } catch (err) {
            console.log(err)
            throw new Error("please try again later.")
        }
    }

    const register = async (email: string, password: string, name: string) => {
        try {
            await axios.post("/auth/register/", { email, password, name }).then((data: any) => {
                localStorage.setItem("token", data.data.token)
                setUser({
                    isLoggedIn: true,
                    token: data.data.token,
                    user: data.data.user
                })
                axios.defaults.headers.common["x-auth-token"] = data.data.token
            }, (err) => {
                console.log(err);
                throw new Error(err.response.data.error)
            })
        } catch (err) {
            console.log(err)
            throw new Error("please try again later.")
        }
    }

    return { fetchUser, logOut, logIn, register };
};