import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            const decodedToken = jwtDecode(savedToken);
            setUser({
                username: decodedToken.sub,
                role: decodedToken.role,
            });
        }
    }, []);
    const login = (jwtToken) => {
        localStorage.setItem('token', jwtToken);
        setToken(jwtToken);
        const decodedToken = jwtDecode(jwtToken);
        console.log(decodedToken);
        console.log(decodedToken.sub);
        console.log(decodedToken.role);
        setUser({
            username: decodedToken.sub,
            role: decodedToken.role,
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, token, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };