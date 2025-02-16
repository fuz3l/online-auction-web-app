import React from "react";
import { useAuth } from "../context/AuthContext";

function LogoutButton() {
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        alert("Logged out successfully!");
    };

    return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
