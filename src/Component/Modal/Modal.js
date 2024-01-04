import React, { useRef, useEffect, useCallback, useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import logo from "../../assets/logo.png";
import "./Modal.css";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Button from "../Button/Button";
import { alert } from "react-custom-alert";
import axios from "axios";
import validator from 'validator';
import Backdrop from '@mui/material/Backdrop';
import cities from "../../assets/cities.json"
import CircularProgress from '@mui/material/CircularProgress';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  z-index: 2;
`;

const ModalWrapper = styled.div`
  max-width: 80vw;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  width: auto;
  height: 30px;
  padding: 0;
`;

export const Modal = ({ showModal, setShowModal, showItem }) => {
  const modalRef = useRef();

  const [applying, setApplying] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [FileDetails, setFileDetails] = useState(null);
  const [FileRaw, setFileRaw] = useState(null);

  // function handleFileButton(e) {
  //   setOpen(true);
  //   var file = e.target.files[0]
  //   var reader = new FileReader()
  //   reader.readAsDataURL(file)
  //   reader.onload = function (e) {
  //     setFileRaw(reader.result.split(',')[1]);
  //     setFileDetails(file)
  //     setOpen(false);
  //   }
  // }

  const [jobApply, setJobApply] = useState({ CNIC: "", fullName: "", previousDesignation: "", email: "", phone: "", city: "", motivationStatement: "", jobRef: null, })
  const handleChange = (e) => {
    let { name, value } = e.target;
    setJobApply({ ...jobApply, [name]: value })
  }
  const handleSubmit = () => {
    // if (emp && emp.empname) {
    //   jobApply.fullName = emp.empname
    // }
    // if (emp && emp.empdesignation) {
    //   jobApply.previousDesignation = emp.empdesignation
    // }
    // if (!FileDetails || !FileRaw) {
    //   alert({ message: "Please upload your resume", type: "warning" });
    //   return;
    // }
    if (jobApply && jobApply.city && jobApply.city === "Select City") {
      alert({ message: "Please select a city", type: "warning" });
      return;
    }
    if (
      !jobApply.CNIC ||
      !jobApply.fullName ||
      !jobApply.previousDesignation ||
      !jobApply.email ||
      !jobApply.phone ||
      !jobApply.city ||
      !jobApply.motivationStatement
    ) {
      alert({ message: "Please fill the data", type: "warning" });
      return;
    }
    else if (!validator.isEmail(jobApply.email)) {
      alert({ message: "Incorrect Email!", type: "warning" });
    }

    else if (!validator.isMobilePhone(jobApply.phone)) {
      alert({ message: "Incorrect Phone!", type: "warning" });
    }
    else if (jobApply.phone.length < 11) {
      alert({ message: "Incorrect Phone!", type: "warning" });
    }
    else if (jobApply.CNIC.length < 13) {
      alert({ message: "Incorrect CNIC!", type: "warning" });
    }
    else {
      setOpen(true)
      // var rawLog = FileRaw
      // var dataSend = { dataReq: { data: rawLog, name: FileDetails.name, type: FileDetails.type }, fname: "uploadFilesToGoogleDrive" };
      // fetch('https://script.google.com/macros/s/AKfycbyhScudEcnCm-ucQ4F92VOXrfrpRUL7vUcbzn0ZYqqTo8Kbo05bI0YEwF-d3hIVeejU1w/exec',
        // { method: "POST", body: JSON.stringify(dataSend) })
        // .then(res => res.json())
        // .then((a) => {
          // var link = a.url.toString();
          axios
            .post(process.env.REACT_APP_BACKEND_URL + "api/applications/apply", {
              "CNIC": jobApply.CNIC,
              "fullName": jobApply.fullName,
              "previousDesignation": jobApply.previousDesignation,
              "email": jobApply.email,
              "phone": jobApply.phone,
              "city": jobApply.city,
              // "resume": link,
              "motivationStatement": jobApply.motivationStatement,
              "jobRef": jobApply.jobRef
            })
            .then((res) => {
              if (res.data.error === true) {
                setOpen(false)
                alert({ message: res.data.message, type: "warning", });
                console.log(res);
              } else {
                setJobApply({ CNIC: "", fullName: "", previousDesignation: "", email: "", phone: "", city: "", motivationStatement: "", jobRef: jobApply.jobRef });
                setOpen(false)
                alert({ message: res.data.message, type: "success", });
                setShowModal(false);
              }
            })
            .catch((error) => {
              setOpen(false)
              alert({ message: "An unexpected error occurred. Please try again", type: "warning", });
              console.log(error);
            });
        // }).catch((e) => {
        //   setOpen(false);
        //   console.log(e);
        //   alert({ message: "File Uploaded Failed. Please try again", type: "warning" })
        // })
    }
  };

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
      setApplying(false);
    }
  };
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        setApplying(false);
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    if (applying) {
      setJobApply({ ...jobApply, ["jobRef"]: showItem._id })
    }
  }, [applying]);

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  useEffect(() => {
    showModal
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [showModal]);
  const details = () => {
    return (
      <div style={{ display: `${details}` }}>
        <div className="responsibilities">
          <div className="head">WHAT YOU WILL BE DOING</div>
          <div className="listing">
            <div className="list">
              {showItem.jobDescription}
            </div>

          </div>
        </div>
        <div className="requirements">
          <div className="head">WHAT YOU NEED TO HAVE</div>
          <div className="listing">
            <div className="list">
              {showItem.jobRequirements}
            </div>

          </div>
        </div>
        <div className="incentives">
          <div className="head">WHATS IN IT FOR YOU</div>
          <div className="listing">
            <div className="list">
              {showItem.jobIncentives}
            </div>

          </div>
        </div>
        <div className="incentives">
          <div className="head">Tentative Salary for this Role</div>
          <div className="listing">
            <div className="list">
              {showItem.jobSalary}
            </div>

          </div>
        </div>
        <div className="incentives">
          <div className="head">CITIES FROM WHERE YOU CAN APPLY</div>
          <div className="listing">
            <div className="list">
              {showItem.jobCity.map((item,index) => { return <div>{index+1}) {item}</div> })}
            </div>

          </div>
        </div>
      </div>
    );
  };

  const form = () => {
    return (
      <div style={{ display: `${form}` }}>
        <div className="apply__form">
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
        <div className="personal__info">
          <div className="req">
            <span className="asterisk">*</span>Required fields
          </div>
          <div className="personal__info__heading">{"Personal Information"}</div>
          <hr className="dash__divider" />
          <div class="input-box">
            <div>
              <label>
                Full Name:
                <input
                  value={jobApply.fullName}
                  onChange={handleChange}
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  required
                  disabled={false}
                />

              </label>
            </div>
            <div>
              <label>
                Previous Designation:
                <input type="text" name="previousDesignation"
                  value={jobApply.previousDesignation}
                  onChange={handleChange}
                  disabled={false}
                  placeholder="Enter 'none' if not applicable"
                />
              </label>
            </div>
            <div>
              <label>
                CNIC:
                <input type="text" name="CNIC"
                  minLength="13" maxlength="13"
                  value={jobApply.CNIC}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onChange={handleChange}
                  placeholder="42XXXXXXXXXXX" />
              </label>
            </div>
          </div>
          <div className="input-box">
            <div>
              <label>
                City:
                <select
                  name="city"
                  value={jobApply.city}
                  onChange={handleChange}
                  label="City"
                  placeholder="City"
                >
                  <option value={"Select City"}>{"Select City"}</option>
                  {cities.sort().map((item) => {
                    return <option value={item}>{item}</option>
                  })}
                </select>
              </label>
            </div>
            <div>
              <label>
                Email:
                <input type="text" name="email"
                  value={jobApply.email}
                  onChange={handleChange}
                  placeholder="name@example.com" />
              </label>
            </div>
            <div>
              <label>
                Phone:
                <input type="text" name="phone"
                  minLength="11" maxlength="11"
                  value={jobApply.phone}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onChange={handleChange}
                  placeholder="03XXXXXXXXX" />
              </label>
            </div>
          </div>

          <hr className="dash__divider" />
          <div class="input-box">
            <div className="motivation__statement">
              <label>
                Tell us about your current job experience:
                <textarea
                  type="text"
                  name="motivationStatement"
                  value={jobApply.motivationStatement}
                  onChange={handleChange}
                  placeholder="Statement"
                  required
                />
              </label>
            </div>
            {/* <div className="apply__resume">
              <label>
                Resume:
                <div className="apply__doc__support__text2">
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
              </label>
            </div> */}
          </div>
        </div>
        <div className="apply__doc__support__text">
          Note : Please follow the exact format when filling the fields as shown
        </div>

      </div>
    );
  };

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper className="modal__wrapper" showModal={showModal}>
              <div className="modal">
                <div className="modal__top">
                  <img className="modal__logo" src={logo} alt="logo" />
                  {applying ? <div className="heading">JOP APPLICATION: {showItem.jobTitle.toUpperCase()}</div>
                    : <div className="designation">{showItem.jobTitle.toUpperCase()}</div>}

                  <div className="close">
                    <CloseModalButton
                      aria-label="Close modal"
                      onClick={() => {
                        setShowModal(false);
                        setApplying(false);
                      }}
                    />
                  </div>
                </div>
                <div className="modal__content">
                  {applying ? form() : details()}
                </div>

                <div className="modal__bottom">
                  {applying ? <div className="buttons">
                    <Button onClick={() => handleSubmit()} name="SUBMIT APPLICATION"></Button>
                  </div> : <div className="buttons">
                    <Button
                      name="CLOSE"
                      onClick={() => {
                        setShowModal((prev) => !prev);
                        setApplying(false);
                      }}
                    ></Button>
                    <Button
                      name="APPLY"
                      onClick={() => setApplying(true)}
                    ></Button>

                  </div>}


                </div>
              </div>
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};
