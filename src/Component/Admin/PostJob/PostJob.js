import React, { useState } from "react";
import "./PostJob.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from '@mui/lab/LoadingButton';
import Select from "@mui/material/Select";
import { AlertContainer, alert } from "react-custom-alert";
import "react-custom-alert/dist/index.css";
import axios from "axios";
import CitySelect from "../../CitySelect/CitySelect"

const PostJob = () => {
  const [loading, setLoading] = useState(false);

  const [jobForm, setJobForm] = useState({
    jobTitle: "",
    jobDepartment: "",
    jobSalary: "",
    jobCity: [],
    jobType: "",
    reqExperience: "",
    forEmployees: false,
    jobDescription: "",
    jobRequirements: "",
    jobIncentives: "",
    jobStatus: "Active",
  });
  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //Main Return Call
  const handleChange = (e) => {
    let { name, value } = e.target;
    setJobForm({ ...jobForm, [name]: value });
  };
  const handleChangeCity = (e) => {
    setJobForm({ ...jobForm, "jobCity": e });
  };
  const handleSubmit = () => {
    if (
      !jobForm.jobTitle ||
      !jobForm.jobDepartment ||
      !jobForm.jobSalary ||
      !jobForm.jobType ||
      !jobForm.reqExperience ||
      !jobForm.jobDescription ||
      !jobForm.jobRequirements ||
      !jobForm.jobIncentives
    ) {
      alert({ message: "Please fill in all the data", type: "warning" });
      return;
    } else if (jobForm.jobCity.length <= 0) {
      alert({ message: "Please fill in at least one city", type: "warning" });
      return;
    } else {
      setLoading(true)
      axios
        .post(process.env.REACT_APP_BACKEND_URL + "api/listings/addNewJob", {
          token: sessionStorage.getItem("token"),
          jobListing: jobForm,
        })
        .then((res) => {
          if (res.data.error === true) {
            setLoading(false)
            alert({
              message: "An unexpected error occurred. Please try again",
              type: "warning",
            });
          } else {
            setLoading(false)
            alert({
              message: "The Job application has been posted",
              type: "success",
            });
            setJobForm({
              jobTitle: "",
              jobDepartment: "",
              jobSalary: "",
              jobCity: [],
              jobType: "",
              reqExperience: "",
              forEmployees: false,
              jobDescription: "",
              jobRequirements: "",
              jobIncentives: "",
              jobStatus: "Active",
            });
          }
        })
        .catch((error) => {
          alert({
            message: "An unexpected error occurred. Please try again",
            type: "error",
          });
          console.log(error);
        });
    }
  };
  return (
    <div className="postJob">
      <AlertContainer floatingTime={4000} />
      <div className="postJob__form">
        <>
          <div className="textField__container">
            <div className="textField">
              <TextField
                fullWidth
                name="jobTitle"
                value={jobForm.jobTitle}
                onChange={handleChange}
                id="outlined-basic"
                label="Job Title"
                variant="outlined"
                size="small"
                required
              />
            </div>
            {/* <div className="textField">
              <FormControl fullWidth>
                <InputLabel size="small" id="demo-simple-select-label">
                  For Employees? *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  style={{ textAlign: "left" }}
                  id="demo-simple-select"
                  name="forEmployees"
                  value={jobForm.forEmployees}
                  onChange={handleChange}
                  label="Job Type"
                  variant="outlined"
                  size="small"
                  required
                >
                  <MenuItem value={true}>For Employees</MenuItem>
                  <MenuItem value={false}>Not for Employees</MenuItem>
                </Select>
              </FormControl>
            </div> */}
            <div className="textField">
              <FormControl fullWidth>
                <InputLabel size="small" id="demo-simple-select-label">
                  Job Department *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  style={{ textAlign: "left" }}
                  id="demo-simple-select"
                  name="jobDepartment"
                  value={jobForm.jobDepartment}
                  onChange={handleChange}
                  label="Job Department"
                  variant="outlined"
                  size="small"
                  required
                >
                  <MenuItem value="Finance & Accounts">
                    Finance & Accounts
                  </MenuItem>
                  <MenuItem value="Logistics">
                    Logistics
                  </MenuItem>
                  <MenuItem value="Information Technology">
                    Information Technology
                  </MenuItem>
                  <MenuItem value="Pharma Sales">
                    Pharma Sales
                  </MenuItem>
                  <MenuItem value="Administration">Administration</MenuItem>
                  <MenuItem value="Health Care">
                    Health Care
                  </MenuItem>
                  <MenuItem value="Consumer">
                    Consumer
                  </MenuItem>
                  <MenuItem value="Mobile Financial Services">
                    Mobile Financial Services
                  </MenuItem>
                  {/* <MenuItem value="Management">Management</MenuItem> */}
                  <MenuItem value="Internal Audit">Internal Audit</MenuItem>
                  <MenuItem value="Human Resources">
                    Human Resources
                  </MenuItem>
                  <MenuItem value="Telecommunication & Allied Business">
                    Telecommunication & Allied Business
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="textField__container">
            <div className="textField">
              <FormControl fullWidth size="small">
                <InputLabel
                  id="demo-select-small"
                  style={{ width: "fit-content", backgroundColor: "white" }}
                >
                  Salary *
                </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-select-small"
                  id="demo-select-small"
                  name="jobSalary"
                  value={jobForm.jobSalary}
                  onChange={handleChange}
                  label="SALARY"
                  variant="outlined"
                  required
                  style={{ textAlign: "left" }}
                >
                  <MenuItem value="Market competitive">Market Competitive</MenuItem>
                  <MenuItem value="25,000">25,000</MenuItem>
                  <MenuItem value="25,000 to 50,000 ">
                    25,000 to 50,000{" "}
                  </MenuItem>
                  <MenuItem value="50,000 to 75,000">50,000 to 75,000</MenuItem>
                  <MenuItem value="75,000 to 100,000">
                    75,000 to 100,000
                  </MenuItem>
                  <MenuItem value="100,000 to 150,000">
                    100,000 to 150,000
                  </MenuItem>
                  <MenuItem value="150,000 to 200,000">
                    150,000 to 200,000
                  </MenuItem>
                  <MenuItem value="200,000 to 250,000">
                    200,000 to 250,000
                  </MenuItem>
                  <MenuItem value="300,000 to 350,000">
                    300,000 to 350,000
                  </MenuItem>
                  <MenuItem value="350,000 to 400,000">
                    350,000 to 400,000
                  </MenuItem>
                  <MenuItem value="400,000 to 500,000">
                    400,000 to 500,000
                  </MenuItem>
                  <MenuItem value="Above 500,000">Above 500,000</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="textField">
              <FormControl fullWidth>
                <InputLabel size="small" id="demo-simple-select-label">
                  Required Experience *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  style={{ textAlign: "left" }}
                  id="demo-simple-select"
                  name="reqExperience"
                  value={jobForm.reqExperience}
                  onChange={handleChange}
                  label="Required Experience"
                  variant="outlined"
                  size="small"
                  required
                >
                  <MenuItem value="Less than 1 year">Less than 1 year</MenuItem>
                  <MenuItem value="1-2 years">1-2 years</MenuItem>
                  <MenuItem value="2-3 years">2-3 years</MenuItem>
                  <MenuItem value="4-5 years">4-5 years</MenuItem>
                  <MenuItem value="5-10 years">5-10 years</MenuItem>
                  <MenuItem value="10+ years">10+ years</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="textField__container">
            <div className="textField">
              <FormControl fullWidth>
                <InputLabel size="small" id="demo-simple-select-label">
                  Job Type *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  style={{ textAlign: "left" }}
                  id="demo-simple-select"
                  name="jobType"
                  value={jobForm.jobType}
                  onChange={handleChange}
                  label="Job Type"
                  variant="outlined"
                  size="small"
                  required
                >
                  <MenuItem value="Permanent">Permanent</MenuItem>
                  <MenuItem value="Contractual">Contractual</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="textField">
              <CitySelect personName={jobForm.jobCity} setPersonName={(item) => { handleChangeCity(item) }} />
            </div>
          </div>
          {/* <div className="textField__container">
            
          </div> */}
          <div className="textField__big">
            <TextField
              fullWidth
              name="jobDescription"
              value={jobForm.jobDescription}
              onChange={handleChange}
              id="outlined-basic"
              label="Job Description"
              variant="outlined"
              multiline
              rows={3}
              required
            />
          </div>
          <div className="textField__big">
            <TextField
              fullWidth
              name="jobRequirements"
              value={jobForm.jobRequirements}
              onChange={handleChange}
              id="outlined-basic"
              label="Job Requirements"
              variant="outlined"
              multiline
              rows={3}
              required
            />
          </div>
          <div className="textField__big">
            <TextField
              fullWidth
              name="jobIncentives"
              value={jobForm.jobIncentives}
              onChange={handleChange}
              id="outlined-basic"
              label="Job Incentives"
              variant="outlined"
              multiline
              rows={3}
              required
            />
          </div>
        </>
      </div>
      <div className="postJob__StartButtons">
        <LoadingButton
          variant="contained"
          color="success"
          style={{ padding: "5px 25px", margin: "0px 5px 0px 5px" }}
          onClick={() => {
            handleSubmit();
          }}
          loading={loading}
          loadingIndicator="Submiting…"
        >
          Submit
        </LoadingButton>
        <Button
          variant="contained"
          color="error"
          style={{ padding: "5px 25px", margin: "0px 5px 0px 5px" }}
          onClick={() => {
            setJobForm({
              jobTitle: "",
              jobDepartment: "",
              jobSalary: "",
              jobCity: "",
              jobType: "",
              reqExperience: "",
              forEmployees: "",
              jobDescription: "",
              jobRequirements: "",
              jobIncentives: "",
              jobStatus: "Active",
            });
          }}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default PostJob;
