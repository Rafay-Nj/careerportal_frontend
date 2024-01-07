import React from "react";
import "./JobApplication.css";
import { Button } from "@mui/material";
import axios from "axios";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useLocation, useNavigate } from "react-router-dom";
import ApplicantTable from "../ApplicantTable/ApplicantTable";
import { AlertContainer, alert } from "react-custom-alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CsvDownload from "react-json-to-csv";
import CitySelect from "../../CitySelect/CitySelect";

export default function JobApplication() {
  const { state } = useLocation();
  const [AllApplicants, setAllApplicants] = React.useState(null);
  const [NewApplicants, setNewApplicants] = React.useState(null);
  const [ShortlistedApplicants, setShortlistedApplicants] =
    React.useState(null);
  const [ContactedApplicants, setContactedApplicants] = React.useState(null);
  const [RejectedApplicants, setRejectedApplicants] = React.useState(null);
  const [SelectedApplicants, setSelectedApplicants] = React.useState(null);
  const [ExportData, setExportData] = React.useState([]);

  // console.log(Date.toString())
  // const dateToday = getMonth(Date.now())
  const [editMode, seteditMode] = React.useState(false);
  const [jobObjectEdited, setjobObjectEdited] = React.useState(
    state && state.data ? state.data : null
  );
  const [loading, setLoading] = React.useState(true);
  const [pageLoading, setPageLoading] = React.useState(false);
  const [refresh, setrefresh] = React.useState(false);
  const navigate = useNavigate();
  const [value, setValue] = React.useState("2");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const closeJobApi = (id) => {
    setPageLoading(true);
    const body = {
      token: sessionStorage.getItem("token"),
      jobID: id,
    };

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "api/listings/closeJob", body)
      .then((res) => {
        if (res.data.error) {
          setPageLoading(false);
          alert({ type: "warning", message: res.data.message });
        } else {
          setPageLoading(false);
          alert({ type: "success", message: "Job closed successfully" });
          navigate("/admin/jobApplication", {
            state: { data: res.data.data, backURL: "/admin?tab=closed" },
          });
        }
      })
      .catch((err) => {
        setPageLoading(false);
        console.log(err);
      });
  };
  const openJobApi = (id) => {
    setPageLoading(true);
    const body = {
      token: sessionStorage.getItem("token"),
      jobID: id,
    };

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "api/listings/openJob", body)
      .then((res) => {
        if (res.data.error) {
          setPageLoading(false);
          alert({ type: "warning", message: res.data.message });
        } else {
          setPageLoading(false);
          alert({ type: "success", message: "Job open successfully" });
          navigate("/admin/jobApplication", {
            state: { data: res.data.data, backURL: "/admin?tab=open" },
          });
        }
      })
      .catch((err) => {
        setPageLoading(false);
        console.log(err);
      });
  };
  function getApplicantsAPI(data) {
    let ids = [];
    for (var i = 0; i < data.length; i++) {
      ids.push(data[i].applicantID);
    }
    axios
      .post(
        "" +
        process.env.REACT_APP_BACKEND_URL +
        "api/listings/getManyApplicants",
        {
          token: sessionStorage.getItem("token"),
          applicantIDs: ids,
        }
      )
      .then((res) => {
        let temp = res.data.data;
        let outArray = [];
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < temp.length; j++) {
            if (data[i].applicantID === temp[j]._id) {
              outArray.push({
                CNIC: temp[j].CNIC,
                fullName: temp[j].fullName,
                previousDesignation: temp[j].previousDesignation,
                email: temp[j].email,
                phone: temp[j].phone,
                city: temp[j].city,
                // isEmployee: temp[j].isEmployee,
                applicationID: data[i]._id,
                applicantID: temp[j]._id,
                // resume: data[i].resume,
                motivationStatement: data[i].motivationStatement,
                applicationStatus: data[i].applicationStatus,
                jobRef: data[i].jobRef,
              });
            }
          }
        }
        setAllApplicants(outArray);
        setNewApplicants(
          outArray.filter((item) => item.applicationStatus.status === "New")
        );
        setShortlistedApplicants(
          outArray.filter(
            (item) => item.applicationStatus.status === "Shortlisted"
          )
        );
        setContactedApplicants(
          outArray.filter(
            (item) => item.applicationStatus.status === "Contacted"
          )
        );
        setRejectedApplicants(
          outArray.filter(
            (item) => item.applicationStatus.status === "Rejected"
          )
        );
        setSelectedApplicants(
          outArray.filter((item) => item.applicationStatus.status === "Hired")
        );
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  function saveJobObject() {
    if (
      jobObjectEdited.jobTitle === "" ||
      jobObjectEdited.jobDepartment === "" ||
      jobObjectEdited.jobSalary === "" ||
      jobObjectEdited.jobCity === "" ||
      jobObjectEdited.jobType === "" ||
      jobObjectEdited.reqExperience === "" ||
      // jobObjectEdited.forEmployees === "" ||
      jobObjectEdited.jobDescription === "" ||
      jobObjectEdited.jobRequirements === "" ||
      jobObjectEdited.jobIncentives === ""
    ) {
      alert({ message: "Please fill all the required data", type: "warning" });
    }
    setPageLoading(true);
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "api/listings/editJobListing", {
        token: sessionStorage.getItem("token"),
        updatedListing: jobObjectEdited,
        jobID: jobObjectEdited._id,
      })
      .then((res) => {
        if (res.data.error === true) {
          setPageLoading(false);
          alert({
            message: "An unexpected error occurred. Please try again",
            type: "warning",
          });
        } else {
          setPageLoading(false);
          alert({
            message: "The Job application has been updated",
            type: "success",
          });
          navigate("/admin/jobApplication", {
            state: { data: res.data.data, backURL: state.backURL },
          });
        }
      })
      .catch((error) => {
        setPageLoading(false);
        alert({
          message: "An unexpected error occurred. Please try again",
          type: "warning",
        });
        console.log(error);
      });
  }
  function handleEditChange(e) {
    let { name, value } = e.target;
    setjobObjectEdited({ ...jobObjectEdited, [name]: value });
  }

  function handleEditCityChange(e) {
    setjobObjectEdited({ ...jobObjectEdited, jobCity: e });
  }



  React.useEffect(() => {
    axios
      .post(
        "" +
        process.env.REACT_APP_BACKEND_URL +
        "api/listings/getApplicationsByJobV2",
        {
          token: sessionStorage.getItem("token"),
          jobID: state.data._id,
        }
      )
      .then((res) => {
        if (!res.data.error && res.data.data) {
          getApplicantsAPI(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state.data._id, refresh]);
  React.useEffect(() => {
    if (AllApplicants && AllApplicants.length > 0) {
      let temp = AllApplicants.map((item, i) => {
        return {
          "Full Name": item.fullName,
          "Email Address": item.email,
          Phone:
            item.phone.slice(0, 4) +
            "-" +
            item.phone.slice(4, item.phone.length),
          CNIC:
            item.CNIC.slice(0, 5) +
            "-" +
            item.CNIC.slice(5, 12) +
            "-" +
            item.CNIC.slice(12, 13),
          City: item.city,
          "Previous Designation": item.previousDesignation,
          // "Resume Link": item.resume,
          About: item.motivationStatement,
          "Application Status": item.applicationStatus.status,
          // "Is Employee?": item.isEmployee.isTrue ? "Yes" : "No",
          // "Employee ID": item.isEmployee.isTrue
            // ? item.isEmployee.employeeID
            // : "Not an Employee",
        };
      });
      setExportData(temp);
    } else {
      setExportData([]);
    }
  }, [AllApplicants]);

  if (state && state.data)
    return (
      <div className="JobApplication">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={pageLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <AlertContainer floatingTime={4000} />
        <div className="JobApplication__header">
          <div>Job Post</div>
          <div>
            {editMode ? null : state.data.jobStatus === "Active" ? (
              <Button
                onClick={() => {
                  closeJobApi(state.data._id);
                }}
                variant="contained"
                sx={{ marginRight: "20px" }}
                style={{ padding: "5px 25px" }}
                color="error"
              >
                Close Job
              </Button>
            ) : (
              <Button
                onClick={() => {
                  openJobApi(state.data._id);
                }}
                variant="contained"
                sx={{ marginRight: "20px" }}
                color="success"
                style={{ padding: "5px 25px" }}
              >
                Open Job
              </Button>
            )}
            {editMode ? (
              <Button
                onClick={() => {
                  saveJobObject();
                  seteditMode(false);
                }}
                color="success"
                variant="contained"
                sx={{ marginRight: "20px" }}
                style={{ padding: "5px 25px" }}
              >
                Save Changes
              </Button>
            ) : (
              <Button
                onClick={() => {
                  seteditMode(true);
                }}
                variant="contained"
                style={{ padding: "5px 25px" }}
                sx={{ marginRight: "20px" }}
              >
                Edit Details
              </Button>
            )}
            {editMode ? (
              <Button
                onClick={() => {
                  setjobObjectEdited(state.data);
                  seteditMode(false);
                }}
                color="error"
                variant="contained"
                style={{ padding: "5px 25px" }}
              >
                Discard Changes
              </Button>
            ) : (
              <Button
                onClick={() => {
                  if (state.backURL) {
                    navigate(state.backURL);
                  } else {
                    navigate("/admin");
                  }
                }}
                variant="contained"
                style={{ padding: "5px 25px" }}
              >
                Back
              </Button>
            )}
          </div>
        </div>
        <div className="JobApplication__box">
          {editMode ? (
            <div className="JobApplication__edit__box">
              <div className="JobApplication__edit__container">
                <div className="JobApplication__edit__title">Title</div>
                <input
                  className="JobApplication__edit"
                  type="text"
                  value={jobObjectEdited.jobTitle}
                  name="jobTitle"
                  onChange={(e) => {
                    handleEditChange(e);
                  }}
                />
                <div className="JobApplication__edit__title">Department</div>
                <input
                  className="JobApplication__edit"
                  type="text"
                  value={jobObjectEdited.jobDepartment}
                  name="jobDepartment"
                  onChange={(e) => {
                    handleEditChange(e);
                  }}
                />
              </div>
              <div className="JobApplication__edit__container">
              <div className="JobApplication__edit__title">City</div>
                <div style={{
                  minWidth:"36.2%",
                  maxWidth:"36.2%",
                  backgroundColor:"rgba(173, 216, 230, 0.497)"
                }}>
                  <CitySelect personName={jobObjectEdited.jobCity} setPersonName={(item) => { handleEditCityChange(item) }} />
                </div>
                {/* <div className="JobApplication__edit__title">City</div>
                <input
                  className="JobApplication__edit"
                  type="text"
                  value={jobObjectEdited.jobCity}
                  name="jobCity"
                  onChange={(e) => {
                    handleEditChange(e);
                  }}
                /> */}
                <div className="JobApplication__edit__title">Experience</div>
                <input
                  className="JobApplication__edit"
                  type="text"
                  value={jobObjectEdited.reqExperience}
                  name="reqExperience"
                  onChange={(e) => {
                    handleEditChange(e);
                  }}
                />
              </div>
              <div className="JobApplication__edit__container">
                <div className="JobApplication__edit__title">Type</div>
                <input
                  className="JobApplication__edit"
                  type="text"
                  value={jobObjectEdited.jobType}
                  name="jobType"
                  onChange={(e) => {
                    handleEditChange(e);
                  }}
                />
                <div className="JobApplication__edit__title">Salary</div>
                <input
                  className="JobApplication__edit"
                  type="text"
                  value={jobObjectEdited.jobSalary}
                  name="jobSalary"
                  onChange={(e) => {
                    handleEditChange(e);
                  }}
                />
              </div>
              <div className="JobApplication__edit__container">
                <div className="JobApplication__edit__title">Date Created</div>
                <input
                  className="JobApplication__edit"
                  type="text"
                  value={jobObjectEdited.dateCreated.slice(0, 10)}
                  name="dateCreated"
                  disabled
                />
                <div className="JobApplication__edit__title">Status</div>
                <input
                  className="JobApplication__edit"
                  type="text"
                  value={jobObjectEdited.jobStatus}
                  name="jobStatus"
                  disabled
                />
              </div>
              {/* <div className="JobApplication__edit__container__3">
                <div className="JobApplication__edit__title">For Employee?</div>

                <select
                  name="forEmployees"
                  className="JobApplication__edit__3"
                  value={jobObjectEdited.forEmployees}
                  onChange={(e) => {
                    handleEditChange(e);
                  }}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div> */}
              <div className="JobApplication__edit__container__2">
                <div className="JobApplication__edit__title__2">
                  Description:
                </div>
                <textarea
                  className="JobApplication__edit__2"
                  type="text"
                  value={jobObjectEdited.jobDescription}
                  name="jobDescription"
                  onChange={(e) => {
                    handleEditChange(e);
                  }}
                />
              </div>
              <div className="JobApplication__edit__container__2">
                <div className="JobApplication__edit__title__2">
                  Requirements:
                </div>
                <textarea
                  className="JobApplication__edit__2"
                  type="text"
                  value={jobObjectEdited.jobRequirements}
                  name="jobRequirements"
                  onChange={(e) => {
                    handleEditChange(e);
                  }}
                />
              </div>
              <div className="JobApplication__edit__container__2">
                <div className="JobApplication__edit__title__2">Incentives</div>
                <textarea
                  className="JobApplication__edit__2"
                  type="text"
                  value={jobObjectEdited.jobIncentives}
                  name="jobIncentives"
                  onChange={(e) => {
                    handleEditChange(e);
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="JobApplication__text__box">
              <div className="JobApplication__text__container">
                <div className="JobApplication__text__title">Title</div>
                <div className="JobApplication__text">
                  {state.data.jobTitle ? state.data.jobTitle : "Missing"}
                </div>
                <div className="JobApplication__text__title">Department</div>
                <div className="JobApplication__text">
                  {state.data.jobDepartment
                    ? state.data.jobDepartment
                    : "Missing"}
                </div>
              </div>
              <div className="JobApplication__text__container">
                <div className="JobApplication__text__title">City</div>
                <div className="JobApplication__text">
                  {state.data.jobCity ? state.data.jobCity.map((item) => { return item + " | " }) : "Missing"}
                </div>
                <div className="JobApplication__text__title">Experience</div>
                <div className="JobApplication__text">
                  {state.data.reqExperience
                    ? state.data.reqExperience
                    : "Missing"}
                </div>
              </div>
              <div className="JobApplication__text__container">
                <div className="JobApplication__text__title">Type</div>
                <div className="JobApplication__text">
                  {state.data.jobType ? state.data.jobType : "Missing"}
                </div>
                <div className="JobApplication__text__title">Salary</div>
                <div className="JobApplication__text">
                  {state.data.jobSalary ? state.data.jobSalary : "Missing"}
                </div>
              </div>
              <div className="JobApplication__text__container">
                <div className="JobApplication__text__title">Date Created</div>
                <div className="JobApplication__text">
                  {state.data.dateCreated
                    ? state.data.dateCreated.slice(0, 10)
                    : "Missing"}
                </div>
                <div className="JobApplication__text__title">Status</div>
                <div className="JobApplication__text">
                  {state.data.jobStatus ? state.data.jobStatus : "Missing"}
                </div>
              </div>
              {/* <div className="JobApplication__text__container__3">
                <div className="JobApplication__text__title">For Employee?</div>
                <div className="JobApplication__text__3">
                  {state.data.forEmployees !== null
                    ? state.data.forEmployees === true
                      ? "Yes"
                      : "No"
                    : "Missing"}
                </div>
              </div> */}
              <div className="JobApplication__text__container__2">
                <div className="JobApplication__text__title__2">
                  Description:
                </div>
                <div className="JobApplication__text__2">
                  {state.data.jobDescription
                    ? state.data.jobDescription
                    : "Missing"}
                </div>
              </div>
              <div className="JobApplication__text__container__2">
                <div className="JobApplication__text__title__2">
                  Requirements:
                </div>
                <div className="JobApplication__text__2">
                  {state.data.jobRequirements
                    ? state.data.jobRequirements
                    : "Missing"}
                </div>
              </div>
              <div className="JobApplication__text__container__2">
                <div className="JobApplication__text__title__2">Incentives</div>
                <div className="JobApplication__text__2">
                  {state.data.jobIncentives
                    ? state.data.jobIncentives
                    : "Missing"}
                </div>
              </div>
            </div>
          )}
        </div>
        {editMode ? null : (
          <>
            {/* {AllApplicants ? (
              <>
                <div className="export__btn">
                  <CsvDownload
                    data={ExportData}
                    filename={`${state.data.jobTitle}.csv`}
                    style={{
                      //pass other props, like styles
                      boxShadow: "inset 0px 1px 0px 0px #1976D2",
                      background: "#1976D2",
                      backgroundColor: "#1976D2",
                      borderRadius: "6px",
                      border: "1px solid #1976D2",
                      display: "inline-block",
                      cursor: "pointer",
                      color: "#ffffff",
                      fontSize: "15px",
                      padding: "10px 25px",
                      textDecoration: "none",
                      textShadow: "0px 1px 0px #1976D2",
                    }}
                  >
                    Export All Applicant Data to CSV
                  </CsvDownload>
                </div>
              </>
            ) : (
              <div className="export__btn__loading">Waiting for Data</div>
            )} */}
            <Box
              sx={{ width: "80%", typography: "body1", padding: "15px 10%" }}
            >
              <TabContext value={value}>
                <Box
                  className="JobApplication__Tabs"
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                >
                  <TabList onChange={handleChange}>
                    <Tab label="All Candidates" value="1" />
                    <Tab label="New Candidates" value="2" />
                    <Tab label="Shortlisted Candidates" value="3" />
                    <Tab label="Contacted Candidates" value="4" />
                    <Tab label="Selected Candidates" value="5" />
                    <Tab label="Rejected Candidates" value="6" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  {" "}
                  <ApplicantTable
                    state={state}
                    tableData={AllApplicants}
                    loading={loading}
                    setrefresh={(item) => {
                      setrefresh(item);
                    }}
                    setLoading={(item) => {
                      setLoading(item);
                    }}
                    refresh={refresh}
                  />{" "}
                </TabPanel>
                <TabPanel value="2">
                  {" "}
                  <ApplicantTable
                    state={state}
                    tableData={NewApplicants}
                    loading={loading}
                    setrefresh={(item) => {
                      setrefresh(item);
                    }}
                    setLoading={(item) => {
                      setLoading(item);
                    }}
                    refresh={refresh}
                  />{" "}
                </TabPanel>
                <TabPanel value="3">
                  {" "}
                  <ApplicantTable
                    state={state}
                    tableData={ShortlistedApplicants}
                    loading={loading}
                    setrefresh={(item) => {
                      setrefresh(item);
                    }}
                    setLoading={(item) => {
                      setLoading(item);
                    }}
                    refresh={refresh}
                  />{" "}
                </TabPanel>
                <TabPanel value="4">
                  {" "}
                  <ApplicantTable
                    state={state}
                    tableData={ContactedApplicants}
                    loading={loading}
                    setrefresh={(item) => {
                      setrefresh(item);
                    }}
                    setLoading={(item) => {
                      setLoading(item);
                    }}
                    refresh={refresh}
                  />{" "}
                </TabPanel>
                <TabPanel value="5">
                  {" "}
                  <ApplicantTable
                    state={state}
                    tableData={SelectedApplicants}
                    loading={loading}
                    setrefresh={(item) => {
                      setrefresh(item);
                    }}
                    setLoading={(item) => {
                      setLoading(item);
                    }}
                    refresh={refresh}
                  />{" "}
                </TabPanel>
                <TabPanel value="6">
                  {" "}
                  <ApplicantTable
                    state={state}
                    tableData={RejectedApplicants}
                    loading={loading}
                    setrefresh={(item) => {
                      setrefresh(item);
                    }}
                    setLoading={(item) => {
                      setLoading(item);
                    }}
                    refresh={refresh}
                  />{" "}
                </TabPanel>
              </TabContext>
            </Box>
          </>
        )}
      </div>
    );
  else
    return (
      <div className="JobApplication">
        <div className="JobApplication__header"></div>
        <div className="JobApplication__box">
          <Button
            onClick={() => {
              navigate("/admin");
            }}
            variant="contained"
            style={{ padding: "5px 25px" }}
          >
            Back
          </Button>
          <h2>
            There seems to be a problem with the data. Please reload the page.
          </h2>
          <h2>
            You may want to contact Support if this problem occurs repeatedly
          </h2>
        </div>
      </div>
    );
}
