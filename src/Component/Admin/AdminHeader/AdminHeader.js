import React from "react"
import "./AdminHeader.css"
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import userimg from "../../../assets/user.png"
import logo_img from "../../../assets/mP-logo.png"


export default function Header({ refresh, setrefresh }) {
    const navigate = useNavigate();

    function handleButton() {
        sessionStorage.clear();
        setrefresh(!refresh);
        navigate("/admin")
    }

    return (
        <div className="admin__header">
            <img
                src={logo_img}
                className="admin__header__image"
                onClick={() => { navigate("/admin?tab=dashboard") }}
            />

            <div className="admin__header__admin">
                <div className="admin__header__admin__text">Hello, {(sessionStorage.getItem("adminName")) ? sessionStorage.getItem("adminName") : "Admin"}</div>
                <img className="admin__header__userimg" src={userimg} />
                <Button variant="contained" onClick={() => { handleButton() }}>Logout</Button>
            </div>

        </div >
    )
}