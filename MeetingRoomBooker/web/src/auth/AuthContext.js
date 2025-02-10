import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/authService";
import { decodeJwt, isValidToken, setSession } from "../utils/jwt";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const isValid = isValidToken(accessToken || '');
        if (isValid) {
            setSession(accessToken);
            setLoginUser(accessToken);
        }
    }, []);

    const login = async (email, password) => {
        var response = await loginService(email, password);
        if (response.data.statusCode === 200) {
            const token = response.data.data.token;
            setSession(token);
            setLoginUser(token);
        }

        throw (response?.message);
    };

    const setLoginUser = (token) => {
        const jwtPayload = decodeJwt(token);
        console.log('jwtPayload', jwtPayload);
        const user = {
            id: jwtPayload.id,
            email: jwtPayload.email,
            username: jwtPayload.unique_name,
            role: jwtPayload.role,
        };
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
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