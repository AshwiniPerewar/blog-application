import React from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = ({ children }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    if (!token) {
        navigate("/login");
        return null; // or you can render a loading spinner or message
    } else {
        return children;
    }
}

export default Protected;
