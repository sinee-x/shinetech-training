import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

    const login = (email, password) => {
        const user = {"email": email};
        localStorage.setItem("token", "1234");
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        return user;
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