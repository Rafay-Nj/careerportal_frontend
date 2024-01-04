//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//Imports
import React from "react"
import "./AdminLogin.css"
import logo from "../../../assets/logo.png";
import { AlertContainer, alert } from 'react-custom-alert';
import { useNavigate } from "react-router-dom";
import LoadingButton from '@mui/lab/LoadingButton';
import axios from "axios";

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//Exported Function
export default function AdminLogin({ setrefresh, refresh }) {
    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    //Variables
    const navigate = useNavigate();
    const [Email, setEmail] = React.useState("");
    const [Password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    //Main Login API Call
    function LoginAPI() {
        setLoading(true);
        const body = {
            "email": Email,
            "password": Password,
        }
        axios
            .post("" + process.env.REACT_APP_BACKEND_URL + "api/admin/loginAdmin", body)
            .then((res) => {
                setLoading(false);
                if (res.data.error) {
                    alert({ type: "warning", message: res.data.message })
                } else {
                    sessionStorage.setItem("userType", res.data.userType);
                    sessionStorage.setItem("token", res.data.token);
                    sessionStorage.setItem("adminName", res.data.admin.name);
                    setrefresh(!refresh);
                    navigate("/admin")
                }
            })
            .catch((err) => {
                setLoading(false);
                let text = (err.data && err.data.message) ? err.data.message : "An unexpected error occured. Please try again.";
                alert({ type: "warning", message: text });
            });
    }

    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    //Login Button Handler
    function handleLogin() {
        if (Email === "" || Password === "") {
            alert({ message: "Please enter all required details", type: "warning" })
        }
        else {
            LoginAPI();
        }
    }

    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    //Main Return Call
    return (
        <div className="Login">
            {/* Alert Absolute Box */}
            <AlertContainer floatingTime={8000} />
            {/* Login Container */}
            <div className="Login_Center">
                <div className="Login_Right_Side">
                    <div className="Login_Right_Side_Head_Container">
                        <div className="Login_Right_Side_Head">
                            <a onClick={() => { navigate("/") }}>
                                <img
                                    className={"header__logo"}
                                    src={logo}
                                    alt="logo"
                                />
                            </a>
                        </div>
                    </div>
                    <div className="Login_Right_Side_Green_Text">
                        Welcome Back!
                    </div>
                    <div className="Login_Right_Side_White_Text">
                        Please login to continue
                    </div>

                    <div className="Login_Right_Side_Input_Box">
                        <div className="Login_Right_Side_Input_OneBox_Text">
                            Email
                        </div>
                        <input
                            className="Login_Right_Side_Input_OneBox_Input"
                            type="email"
                            value={Email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <div className="Login_Right_Side_Input_OneBox_Text">
                            Password
                        </div>
                        <input
                            className="Login_Right_Side_Input_OneBox_Input"
                            type="password"
                            value={Password}
                            onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>
                    <div className="Login_Right_Side_Button_Container">
                        {
                            (loading)
                                ? <LoadingButton className="Login_Right_Side_Login_Button" loading loadingPosition="start" variant="contained">Login</LoadingButton>
                                : <LoadingButton onClick={() => { handleLogin(); }} className="Login_Right_Side_Login_Button" variant="contained">Login</LoadingButton>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}