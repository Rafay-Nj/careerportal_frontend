import React from "react";
import "./AddEmployees.css";
import axios from "axios"
import { useCSVReader } from "react-papaparse";
import Button from "@mui/material/Button";
import LoadingButton from '@mui/lab/LoadingButton';
import { alert, AlertContainer } from "react-custom-alert";

const AddEmployees = () => {
  const { CSVReader } = useCSVReader();
  const [MessageText, setMessageText] = React.useState(null);
  const [Data, setData] = React.useState(null);
  const [Loading, setLoading] = React.useState(null);

  function APICall() {
    setLoading(true)
    const body = {
      "empArray": Data,
      "token": sessionStorage.getItem("token"),
    }
    axios.post("" + process.env.REACT_APP_BACKEND_URL + "api/employees/bulkRewriteEmployees", body).then((res) => {
      if (res.data.error) {
        alert({ type: "warning", message: "An unexpected error occured. Please try again" })
        setLoading(false);
      }
      else {
        alert({ type: "success", message: res.data.message })
        setData(null);
        setMessageText(null);
        setLoading(false);
      }
    }).catch((err) => {
      console.log(err)
      alert({ type: "warning", message: "An unexpected error occured. Please try again" })
      setLoading(false);
    })
  }

  function manipulateData(data) {
    let arrayOfObjects = [];
    for (var i = 0; i < data.length; i++) {
      let myObj = {
        "empid": (data[i][0]) ? data[i][0] : "Not Available",
        "empname": (data[i][1]) ? data[i][1] : "Not Available",
        "empdesignation": (data[i][2]) ? data[i][2] : "Not Available",
        "empgrade": (data[i][3]) ? data[i][3] : "Not Available",
        "empdivision": (data[i][4]) ? data[i][4] : "Not Available",
        "emplinemanagerid": (data[i][5]) ? data[i][5] : "Not Available",
        "emplinemanagername": (data[i][6]) ? data[i][6] : "Not Available",
      }
      arrayOfObjects.push(myObj);
    }
    return arrayOfObjects
  }

  return (
    <div className="AddEmployees">
      <AlertContainer floatingTime={5000} />
      <CSVReader
        accept={".csv"}
        onUploadRejected={(results) => {
          if (results[0].errors[0].message) {
            alert({ type: "warning", message: results[0].errors[0].message });
          }
          else {
            alert({ type: "warning", message: "An unexpected error occured. Please try again" });
          }
        }}
        onUploadAccepted={(results) => {
          setData(null);
          setMessageText(null);
          setData(manipulateData(results.data))
          setMessageText("File uploaded and processed. Ready to submit!");
        }}
      >
        {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
          <>
            <div className="AddEmployees__file"> {(acceptedFile && acceptedFile.name)
              ? acceptedFile && acceptedFile.name
              : <span style={{ color: "gray" }}>No file uploaded</span>
            } </div>
            <ProgressBar className="AddEmployees__progressBar" />
            <div className="AddEmployees__btn__box">
              {(acceptedFile)
                ? <Button variant="contained" color="error" {...getRemoveFileProps()} className="AddEmployees__btn">Remove File</Button>
                : <Button variant="contained" {...getRootProps()} className="AddEmployees__btn" >Browse file</Button>
              }
            </div>
            {(acceptedFile && Data && Data.length > 0)
              ? <div className="FileContentSection">
                <div className="FileContentSection__Message">{(MessageText) ? MessageText : "Loading..."}</div>
                <div className="FileContentSection__Info__One"> Number of Employees fetched from file : {(Data && Data.length) ? Data.length : 'Processing..'}</div>
                {
                  (Loading)
                    ? <LoadingButton className="AddEmployees__btn" variant="contained" loading loadingPosition="start">Submit</LoadingButton>
                    : <LoadingButton className="AddEmployees__btn" color="success" variant="contained" onClick={() => { APICall(); }}>Submit</LoadingButton>
                }
              </div>
              : null
            }
          </>
        )}
      </CSVReader>
    </div>
  );
};

export default AddEmployees;
