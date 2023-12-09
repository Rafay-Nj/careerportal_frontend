import React from 'react'
import "./JobDropbox.css"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "@mui/material";
import axios from "axios";
import { AlertContainer, alert } from "react-custom-alert";

const JobDropbox = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    function APICall(id, link, action) {

        axios.post("" + process.env.REACT_APP_BACKEND_URL + "api/dropbox/" + link, {
            "token": sessionStorage.getItem("token"),
            applicationID: id
        }).then((res) => {
            console.log(res);
            // setrefresh(!refresh);
            alert({ message: `Job Applicant ${action}`, type: "success" });
            setTimeout(() => {
                navigate(state.backURL)
            }, 2000)

        }).catch((err) => {
            console.log(err);
            alert({ message: `An unexpected error occured`, type: "warning" })
        })
    }


    if (state && state.data) return (
        <div className='JobDropbox'>
            <div className="JobDropbox__header">
                <div>Dropbox Applicant</div>
                <div>
                    <Button onClick={() => { if (state.backURL) { navigate(state.backURL) } else { navigate("/admin") } }} sx={{ marginRight: "20px" }} variant="contained" style={{ padding: "5px 25px" }}>
                        Back
                    </Button>
                    {(state.data.status === "Contacted")
                        ? <>
                            <Button
                                onClick={() => { APICall(state.data._id, "markdropboxapplicationhired", "Hired") }}
                                color="success" variant="contained" style={{ padding: "5px 25px" }} sx={{ marginRight: "20px" }}
                            >
                                Hire
                            </Button>
                            <Button
                                onClick={() => { APICall(state.data._id, "rejectdropboxapplication", "Rejected") }}
                                color="error" variant="contained" style={{ padding: "5px 25px" }} 
                            >
                                Reject
                            </Button>
                        </>
                        : (state.data.status === "New")
                            ? <>
                                <Button
                                    onClick={() => { APICall(state.data._id, "markdropboxapplicationcontacted", "Contacted") }}
                                    color="success" variant="contained" sx={{ marginRight: "20px" }} style={{ padding: "5px 25px" }}
                                >
                                    Mark as Contacted
                                </Button>
                                <Button
                                    onClick={() => { APICall(state.data._id, "rejectdropboxapplication", "Rejected") }}
                                    color="error" variant="contained" style={{ padding: "5px 25px" }}
                                >
                                    Reject
                                </Button>
                            </>
                            : null
                    }
                </div>
            </div>
            <div className="JobApplication__box">
                <AlertContainer floatingTime={4000} />
                <div className="JobDropbox__text__box">
                    <div className="JobDropbox__text__container">
                        <div className="JobDropbox__text__title">Full Name</div>
                        <div className="JobDropbox__text">{(state.data.fullname) ? state.data.fullname : "Missing"}</div>
                        <div className="JobDropbox__text__title">Resume</div>
                        <div className="JobDropbox__text"><a id="link" href={state.data.resume} rel="noreferrer" target="_blank">{(state.data.resume) ? state.data.resume : "Missing"}</a></div>
                    </div>
                    <div className="JobDropbox__text__container">
                        <div className="JobDropbox__text__title">City</div>
                        <div className="JobDropbox__text">{(state.data.city) ? state.data.city : "Missing"}</div>
                        <div className="JobDropbox__text__title">CNIC</div>
                        <div className="JobDropbox__text">{(state.data.CNIC) ? state.data.CNIC : "Missing"}</div>
                    </div>
                    <div className="JobDropbox__text__container">
                        <div className="JobDropbox__text__title">Email</div>
                        <div className="JobDropbox__text">{(state.data.email) ? state.data.email : "Missing"}</div>
                        <div className="JobDropbox__text__title">Phone No</div>
                        <div className="JobDropbox__text">{(state.data.phone) ? state.data.phone : "Missing"}</div>
                    </div>
                    <div className="JobDropbox__text__container">
                        <div className="JobDropbox__text__title">Area of Interest</div>
                        <div className="JobDropbox__text">{(state.data.areaOfInterest) ? state.data.areaOfInterest : "Missing"}</div>
                        <div className="JobDropbox__text__title">Current Designation</div>
                        <div className="JobDropbox__text">{(state.data.designation) ? state.data.designation : "Missing"}</div>
                    </div>
                </div>
            </div>
        </div>
    )
    else return (
        <div className="JobDropbox">
            <div className="JobDropbox__header">
            </div>
            <div className="JobDropbox__box">
                <Button onClick={() => { navigate("/admin") }} variant="contained" style={{ padding: "5px 25px" }}>
                    Back
                </Button>
                <h2>There seems to be a problem with the data. Please reload the page.</h2>
                <h2>You may want to contact Support if this problem occurs repeatedly</h2>
            </div>
        </div>
    )
}

export default JobDropbox