import React from 'react'
import "./JobApplicant.css"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "@mui/material";
import axios from "axios";
import { AlertContainer, alert } from "react-custom-alert";

const JobApplicant = () => {
  const { state } = useLocation();
  const navigate = useNavigate();


  function APICall(id, link, action) {
    // if (!loading) {
    // setLoading(true);
    axios.post("" + process.env.REACT_APP_BACKEND_URL + "api/applications/" + link, {
      "token": sessionStorage.getItem("token"),
      applicationID: id
    }).then((res) => {
      console.log(res);
      // setrefresh(!refresh);
      alert({ message: `Job Applicant ${action}`, type: "success" });
      setTimeout(() => {
        navigate("/admin/jobApplication", {
          state: {
            data: state.jobData,
            backURL: state.backURL,
          }
        })
      }, 2000)

    }).catch((err) => {
      console.log(err);
    })
    // }
  }
  if (state && state.data) return (
    <div className='JobApplicant'>
      <div className="JobApplicant__header">
        <div>Job Applicant</div>
        <div>
          <Button onClick={() => {
            navigate("/admin/jobApplication", {
              state: {
                data: state.jobData,
                backURL: state.backURL,
              }
            })
          }} variant="contained" sx={{ marginRight: "20px" }} style={{ padding: "5px 25px" }}>
            Back
          </Button>
          {(state.data.applicationStatus.status === "Contacted")
            ? <>
            <Button onClick={() => { APICall(state.data.applicationID, "markhired", "Hired") }} sx={{ marginRight: "20px" }} color="success" variant="contained" style={{ padding: "5px 25px" }}>
              Hire
            </Button>
            <Button onClick={() => { APICall(state.data.applicationID, "rejectApplication", "Rejected") }} color="error" variant="contained" style={{ padding: "5px 25px" }}>
              Reject
            </Button>
            </>
            : (state.data.applicationStatus.status === "New")
              ? <>
                <Button onClick={() => { APICall(state.data.applicationID, "shortlistApplication", "Shortlisted") }} color="success" variant="contained" sx={{ marginRight: "20px" }} style={{ padding: "5px 25px" }}>
                  Shortlist
                </Button>
                <Button onClick={() => { APICall(state.data.applicationID, "rejectApplication", "Rejected") }} color="error" variant="contained" style={{ padding: "5px 25px" }}>
                  Reject
                </Button>
              </>
              : (state.data.applicationStatus.status === "Shortlisted")
                ?
                <>
                  <Button onClick={() => { APICall(state.data.applicationID, "markContacted", "Contacted") }} color="success" variant="contained" sx={{ marginRight: "20px" }} style={{ padding: "5px 25px" }}>
                    Mark as Contacted
                  </Button>
                  <Button onClick={() => { APICall(state.data.applicationID, "rejectApplication", "Rejected") }} color="error" variant="contained" style={{ padding: "5px 25px" }}>
                    Reject
                  </Button>
                </>
                : null
          }
        </div>
      </div>
      <div className="JobApplication__box">
        <AlertContainer floatingTime={4000} />
        <div className="JobApplicant__text__box">
          <div className="JobApplicant__text__container">
            <div className="JobApplicant__text__title">Full Name</div>
            <div className="JobApplicant__text">{(state.data.fullName) ? state.data.fullName : "Missing"}</div>
            <div className="JobApplicant__text__title">Resume</div>
            <div className="JobApplicant__text"><a id="link" rel="noreferrer" target="_blank" href={state.data.resume}>{(state.data.resume) ? state.data.resume : "Missing"}</a></div>
          </div>
          <div className="JobApplicant__text__container">
            <div className="JobApplicant__text__title">City</div>
            <div className="JobApplicant__text">{(state.data.city) ? state.data.city : "Missing"}</div>
            <div className="JobApplicant__text__title">CNIC</div>
            <div className="JobApplicant__text">{(state.data.CNIC) ? state.data.CNIC : "Missing"}</div>
          </div>
          <div className="JobApplicant__text__container">
            <div className="JobApplicant__text__title">Email</div>
            <div className="JobApplicant__text">{(state.data.email) ? state.data.email : "Missing"}</div>
            <div className="JobApplicant__text__title">Phone No</div>
            <div className="JobApplicant__text">{(state.data.phone) ? state.data.phone : "Missing"}</div>
          </div>
          <div className="JobApplicant__text__container">
            <div className="JobApplicant__text__title">Is Employee?</div>
            <div className="JobApplicant__text">{(state.data.isEmployee.isTrue) === true ? "Yes" : "No"}</div>
            <div className="JobApplicant__text__title">Employee Id</div>
            <div className="JobApplicant__text">{(state.data.isEmployee.isTrue) === true ? state.data.isEmployee.employeeID : "Not an Employee"}</div>
          </div>
          <div className="JobApplicant__text__container">
            <div className="JobApplicant__text__title">Previous Designation</div>
            <div className="JobApplicant__text">{(state.data.previousDesignation) ? state.data.previousDesignation : "Missing"}</div>
            <div className="JobApplicant__text__title">Status</div>
            <div className="JobApplicant__text">{(state.data.applicationStatus.status) ? state.data.applicationStatus.status : "Missing"}</div>
          </div>
          <div className="JobApplicant__text__container__2">
            <div className="JobApplicant__text__title__2">Motivation Statement:</div>
            <div className="JobApplicant__text__2">
              {(state.data.motivationStatement) ? state.data.motivationStatement : "Missing"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  else return (
    <div className="JobApplicant">
      <div className="JobApplicant__header">
      </div>
      <div className="JobApplicant__box">
        <Button onClick={() => { navigate("/admin") }} variant="contained" style={{ padding: "5px 25px" }}>
          Back
        </Button>
        <h2>There seems to be a problem with the data. Please reload the page.</h2>
        <h2>You may want to contact Support if this problem occurs repeatedly</h2>
      </div>
    </div>
  )
}

export default JobApplicant