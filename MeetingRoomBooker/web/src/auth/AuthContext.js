import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("token", token);
        if (token) {
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        } else {
            setUser(null);
        }
    }, []);

    const login = async (email, password) => {
        var response = await loginService(email, password);
        console.log("response", response);
        if (response.statusCode === 200) {
            const user = response.data.user;
            console.log("token", response.data.token);
            console.log(user);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            return response;
        }

        throw (response?.message);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);