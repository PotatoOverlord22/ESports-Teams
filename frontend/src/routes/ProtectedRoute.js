import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ redirectPath="/login", children }) => {
    const { user } = useContext(UserContext);

    if (!user){
        return <Navigate to={redirectPath} replace />;
    }
    return (
        children
    );
};

export default ProtectedRoute;