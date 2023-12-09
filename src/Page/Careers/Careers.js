//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
//Imports
import { React, useEffect, useState } from "react";
import "./Careers.css";
import about from '../../assets/about.jpg';
import { Modal } from "../../Component/Modal/Modal";
import { GlobalStyle } from "../../globalStyles";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import axios from "axios";
import Slider from "../../Component/Slider/Slider";
import Skeleton from "@mui/material/Skeleton";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import { AlertContainer, alert } from "react-custom-alert";
import validator from 'validator';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import cities from '../../assets/cities.json';

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
//Start of Function
export default function Careers() {
  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
  //Variables
  const [showModal, setShowModal] = useState(false);
  const [currDepartment, setCurrDepartment] = useState("All");
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const [jobPosts, setJobPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showItem, setShowItem] = useState(null);
  const [emp, setEmp] = useState();
  const [isEmployee, setIsEmployee] = useState({ empID: null })
  const [open, setOpen] = useState(false);
  const [FileDetails, setFileDetails] = useState(null);
  const [FileRaw, setFileRaw] = useState(null);
  const [dropbox, setDropbox] = useState({
    CNIC: "",
    fullname: "",
    email: "",
    phone: "",
    city: "",
    resume: "",
    areaOfInterest: "",
    designation: "",
  })

  const areaofinterest = [
    "Administration",
    "Consumer",
    "Finance & Accounts",
    "Health Care",
    "Human Resources",
    "Information Technology",
    "Internal Audit",
    "Logistics",
    "Mobile Financial Services",
    "Pharma Sales",
    "Telecom & Allied Business",
  ]

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
  //Functions And Constants
  const dropboxChange = (e) => {
    let { name, value } = e.target;
    setDropbox({ ...dropbox, [name]: value })
  }
  const dropboxSubmit = () => {
    if (!FileDetails || !FileRaw) {
      alert({ message: "Please upload your resume", type: "warning" });
      return;
    }
    else if (!dropbox.CNIC || !dropbox.fullname || !dropbox.email || !dropbox.phone || !dropbox.city || !dropbox.areaOfInterest || !dropbox.designation) {
      alert({ message: "Please fill all the required fields", type: "warning" });
      return;
    }
    else if (!validator.isEmail(dropbox.email)) {
      alert({ message: "Incorrect Email. Please enter a valid Email", type: "warning" });
    }
    else if (!validator.isMobilePhone(dropbox.phone)) {
      alert({ message: "Incorrect Phone Number. Please enter a valid Phone Number", type: "warning" });
    }
    else if (dropbox.city === "Select City") {
      alert({ message: "Please select a City from the list", type: "warning" });
    }
    else if (dropbox.areaOfInterest === "Select Division") {
      alert({ message: "Please select an area of interest you prefer from the Division list", type: "warning" });
    }
    else {
      setOpen(true)
      var rawLog = FileRaw
      var dataSend = { dataReq: { data: rawLog, name: FileDetails.name, type: FileDetails.type }, fname: "uploadFilesToGoogleDrive" };
      fetch('https://script.google.com/macros/s/AKfycbyhScudEcnCm-ucQ4F92VOXrfrpRUL7vUcbzn0ZYqqTo8Kbo05bI0YEwF-d3hIVeejU1w/exec',
        { method: "POST", body: JSON.stringify(dataSend) })
        .then(res => res.json())
        .then((a) => {
          var link = a.url.toString();
          axios.post(process.env.REACT_APP_BACKEND_URL + "api/dropbox/applyviadropbox", {
            "dropbox_app": {
              CNIC: dropbox.CNIC,
              fullname: dropbox.fullname,
              email: dropbox.email,
              phone: dropbox.phone,
              city: dropbox.city,
              resume: link,
              areaOfInterest: dropbox.areaOfInterest,
              designation: dropbox.designation,
            }
          }).then((res) => {
            if (res.data.error === true) {
              setOpen(false)
              alert({ message: res.data.message, type: "warning" });
            } else {
              setDropbox(
                {
                  CNIC: "",
                  fullname: "",
                  email: "",
                  phone: "",
                  city: "",
                  resume: "",
                  areaOfInterest: "",
                  designation: ""
                });
              setFileDetails(null);
              setFileRaw(null);
              setOpen(false)
              alert({ message: res.data.message, type: "success" });
            }
          })
            .catch((error) => {
              setOpen(false)
              alert({ message: "An unexpected error occurred. Please try again", type: "warning" });
              console.log(error);
            });

        }).catch((e) => {
          setOpen(false);
          console.log(e);
          alert({ message: "File Uploaded Failed. Please try again", type: "warning" })
        })
    }
  }

  const openModal = (item) => {
    setShowItem(item);
    setShowModal((prev) => !prev);
  };

  const checkEmployee = () => {
    if (isEmployee && isEmployee.empID) {
      setLoading(true);
      axios.post("" + process.env.REACT_APP_BACKEND_URL + "api/employees/isEmployee", isEmployee).then((res) => {
        if (res.data.error) {
          alert({ message: res.data.message, type: "warning" })
          setEmp(null);
        } else {
          alert({ message: res.data.message, type: "success" });
          setEmp(res.data.data);
        }
        setLoading(false);
      })
        .catch((err) => {
          alert({ message: "An unexpected error occured. Please try again", type: "error" });
          console.log(err);
          setLoading(false);
        });
    } else {
      alert({ message: "Please enter an Employee ID", type: "warning" });
    }
  }

  const handleChange = (e) => {
    let { name, value } = e.target;
    setIsEmployee({ ...isEmployee, [name]: value });
  }



  function sideToggle() {
    return (
      <>
        <div className="side__toggle">
          <div className="side__toggle__text">
            Are you an M{"&"}P Employee?
          </div>
          <input className="side__toggle__input" type="text" name="empID" value={isEmployee.empID} onChange={handleChange} placeholder="Enter Employee ID" />
          <div className="side__toggle__arrow" onClick={() => checkEmployee()}>→</div>
        </div>
      </>
    )
  }

  function handleFileButton(e) {
    setOpen(true);
    var file = e.target.files[0]
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      setFileRaw(reader.result.split(',')[1]);
      setFileDetails(file)
      setOpen(false);
    }
  }

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
  //Use Effects
  useEffect(() => {
    setLoading(true);
    axios.post("" + process.env.REACT_APP_BACKEND_URL + "api/listings/getActiveJobs").then((res) => {
      if (res.data.error) {
        alert({ message: res.data.message, type: "warning" });
      } else {
        setData(res.data.data);
      }
      setLoading(false);
    })
      .catch((err) => {
        alert({ message: "An unexpected error occured. Please try again", type: "error" });
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let temp = [];
    if (emp) {
      temp = data.filter((x) => x.forEmployees === true)
    }
    else {
      temp = data.filter((x) => x.forEmployees === false);
    }
    if (currDepartment) {
      if (currDepartment !== "All") {
        if (temp) {
          temp = temp.filter((x) => x.jobDepartment.toString() === currDepartment)
        }
      }
    }
    setList(temp);
  }, [data, currDepartment, emp]);


  useEffect(() => {
    let temp = () => {
      if (list) {
        if (list.length > 0) {
          return (
            <div className="careers__section">
              <div className="careers__listing">
                <div className="careers__section__heading">
                  <div className="section__heading">{emp ? "INTERNAL OPEN POSITIONS" : "OPEN POSITIONS"}</div>
                  <div className="section__heading__text">
                    {!currDepartment
                      ? `Showing ${list.length} available positions for All Departments`
                      : `Showing ${list.length} available positions for Department ${currDepartment}`}
                  </div>
                  <div className="divider" />
                </div>
              </div>
              <div className="job__posts">
                {list.map((item, ind) => {
                  return (
                    <div key={ind} className="job__post">
                      <div className="job__designation">
                        {item.jobTitle.length > 25
                          ? item.jobTitle.slice(0, 25) + "..."
                          : item.jobTitle}
                      </div>
                      <div className="job__responsibility">
                        <>{item.jobDepartment}</>
                        <br />
                        <br />
                        <span style={{ fontSize: "small" }}>{(item.jobCity.length === 1) ? item.jobCity[0] : item.jobCity.map((item) => { return item + " | " })}</span>
                      </div>
                      <div className="apply" onClick={() => openModal(item)} >
                        APPLY NOW
                      </div>
                      <div class="go-corner" href="#">
                        <div class="go-arrow">→</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        } else if (list.length === 0) {
          return (
            <div className="careers__section">
              <div className="careers__listing">
                <div className="careers__section__heading">
                  <div className="section__heading">
                    No available positions found
                  </div>
                  <div className="divider" />
                </div>
              </div>
            </div>
          );
        }
      }
    };
    setJobPosts(temp);
  }, [list]);

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
  //Return Page MAIN
  return (
    <div className="careers">
      <Header />
      <AlertContainer floatingTime={4000} />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="banner">
        <div className="banner__content">
          <div className="banner__title">CAREERS</div>
          <div className="banner__heading">WORK WITH US</div>
          <p className="banner__text">
            Minimizing Distances, Promising Happiness.
          </p>
        </div>
      </div>

      <Slider
        setCurrDepartment={(item) => {
          setCurrDepartment(item);
        }}
        currDepartment={currDepartment}
      />
      {loading ? (
        <div className="skeleton__section">
          <Skeleton variant="rectangular" width="32%" height="50vh" />
          <Skeleton variant="rectangular" width="32%" height="50vh" />
          <Skeleton variant="rectangular" width="32%" height="50vh" />
        </div>
      ) : (
        <>
          {jobPosts}
          {sideToggle()}
        </>

      )}
      <div className="about__section">
        <div className="about__us">
          <div className="careers__listing">
            <div className="about__us__heading">
              <div className="section__heading">ABOUT US</div>
              <div className="divider" />
            </div>
          </div>
        </div>
        <div className="about__us__container">
          <div className="about__us__left">
            <img className="about__us__img" alt="About US" src={about} />
          </div>
          <div className="about__us__right">
            <div className="about__us__content">
              Muller &amp; Phipps Pakistan is the largest multinational Logistics, Sales and Distribution
              company in Pakistan. M&amp;P Pvt. Ltd. has been in this part of the world since 1912 and we
              represent leading multinational and local companies in the Pharmaceutical, FMCG, and
              Health Care Sector. <br /><br />
              M&amp;P has become the first choice distribution house, with a large network of complete
              warehousing solutions (including cool-chains) spread across the country, direct access to
              950+ towns and a strong and dedicated team of 8000+ people.
            </div>
          </div>
        </div>
      </div>
      <div className="dropbox__section">
        <div className="career__dropbox">
          <div className="careers__listing">
            <div className="dropbox__section__heading">
              <div className="section__heading">DROPBOX</div>
              <div className="divider" />
              <div className="dropbox__text">
                Cannot find a role that suits you? Submit your resume and we
                will get in touch.
              </div>
            </div>
          </div>
          <div className="dropbox__form">
            <div className="dropbox__form__left">
              <div className="dropbox__form__left__heading">
                STEP <span className="span__num">1</span>
              </div>
              <div className="cf__field">
                <div className="cf__label">NAME</div>
                <input name="fullname" value={dropbox.fullname} onChange={dropboxChange}
                  onKeyPress={(event) => {
                    if (/[^A-z\s]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  type="text" placeholder="Name" className="cf__input" />
              </div>
              <div className="cf__field">
                <div className="cf__label">CNIC</div>
                <input
                  name="CNIC"
                  type="text"
                  minLength="13" maxlength="13"
                  value={dropbox.CNIC}
                  onChange={dropboxChange}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  placeholder="42XXXXXXXXXXX"
                  className="cf__input"
                />
              </div>
              <div className="cf__field">
                <div className="cf__label">MOBILE NUMBER</div>
                <input
                  name="phone"
                  type="tel"
                  minLength="11" maxlength="11"
                  value={dropbox.phone}
                  onChange={dropboxChange}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  placeholder="03XXXXXXXXX"
                  className="cf__input"
                />
              </div>
              <div className="cf__field">
                <div className="cf__label">EMAIL</div>
                <input
                  name="email"
                  type="email"
                  value={dropbox.email}
                  onChange={dropboxChange}
                  placeholder="name@example.com"
                  className="cf__input"
                />
              </div>
              <div className="cf__field">
                <div className="cf__label">City</div>
                <select
                  className="cf__input"
                  name="city"
                  value={dropbox.city}
                  onChange={dropboxChange}
                  label="City"
                  placeholder="City"
                >
                  <option value={"Select City"}>{"Select City"}</option>
                  {cities.sort().map((item) => {
                    return <option value={item}>{item}</option>
                  })}
                </select>
              </div>
            </div>
            <div className="dropbox__form__right">
              <div className="dropbox__form__left__heading">
                STEP <span className="span__num_2">2</span>
              </div>
              <div className="cf__field">
                <div className="cf__label">Current/Previous Designation</div>
                <input
                  name="designation"
                  type="text"
                  value={dropbox.designation}
                  onChange={dropboxChange}
                  placeholder="Enter 'none' if not Applicable"
                  className="cf__input"
                />
              </div>
              <div className="cf__field">
                <div className="cf__label">Area of Interest</div>
                <select
                  name="areaOfInterest"
                  type="text"
                  value={dropbox.areaOfInterest}
                  onChange={dropboxChange}
                  placeholder="Area of Interest"
                  className="cf__input"
                >
                  <option value={"Select Division"}>{"Select Division"}</option>
                  {areaofinterest.sort().map((item2) => {
                    return <option value={item2}>{item2}</option>
                  })}
                </select>
              </div>
              <div className="cf__resume__field">
                <div className="cf__label">UPLOAD RESUME</div>
                <div className="cf__resume">

                  <div className="cf__doc__support__text">
                    Please upload your resume in PDF, JPG or PNG format.
                  </div>
                  <div className="fileUploadDiv">
                    {(!FileDetails || !FileRaw)
                      ? <div className="fileUploadDiv__empty__container">
                        <input className="fileUploadDiv__empty__input" type="file" accept="application/pdf" onChange={(e) => handleFileButton(e)} />
                        <button className="fileUploadDiv__empty__button">
                          <i><AiOutlinePlusCircle size='50px' /></i>Upload
                        </button>
                      </div>
                      : <div className="fileUploadDiv__file__container">
                        <div className="fileUploadDiv__file__name">{FileDetails.name}</div>
                        <div className="fileUploadDiv__file__button" onClick={() => { setFileDetails(null); setFileRaw(null); }}>X</div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div onClick={dropboxSubmit} className="submit">SUBMIT</div>
        </div>
      </div>
      <Modal showModal={showModal} emp={emp} setShowModal={setShowModal} showItem={showItem} />
      <GlobalStyle />
      <Footer />
    </div>
  );
}
