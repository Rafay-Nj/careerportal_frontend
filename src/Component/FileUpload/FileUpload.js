import React, { useEffect, useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import './FileUpload.css'
import { alert, AlertContainer } from "react-custom-alert"
import axios from 'axios'
import { Backdrop, CircularProgress } from '@mui/material';

const FileUpload = ({ setLink, removeFile }) => {
    var link;
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    function guardarArchivo(e) {
        setLoading(true);
        var file = e.target.files[0] //the file
        console.log(file);
        var reader = new FileReader() //this for convert to Base64 
        reader.readAsDataURL(e.target.files[0]) //start conversion...
        reader.onload = function (e) { //.. once finished..
            console.log(reader.result);
            // var rawLog = reader.result.split(',')[1]; //extract only thee file data part            
            // var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
            // fetch('https://script.google.com/macros/s/AKfycbyhScudEcnCm-ucQ4F92VOXrfrpRUL7vUcbzn0ZYqqTo8Kbo05bI0YEwF-d3hIVeejU1w/exec', //your AppsScript URL
            //     { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
            //     .then(res => res.json()).then((a) => {
            //         link = a.url.toString();
            //         setLink(link);//See response
            //         setFile(file)
            //         setLoading(false);
            //         alert({ message: "File Uploaded Successfully", type: "success" })
            //     }).catch((e) => { setLoading(false); console.log(e); alert({ message: "File Uploaded Failed. Please try again", type: "warning" }) }) // Or Error in console
            setLoading(false);
        }
    }

    return (
        <>
            <div className="file-card">
                <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} >
                    <CircularProgress color="inherit" />
                </Backdrop>
                {(file === null)
                    ? <div className="file-inputs">
                        <input type="file" accept="application/pdf" id="customFile" onChange={(e) => guardarArchivo(e)} />
                        <button>
                            <i>
                                <AiOutlinePlusCircle size='50px' />
                            </i>
                            Upload
                        </button>
                    </div>
                    : <div className="file_done_container">
                        <div className="file_done_text">{file.name}</div>
                        <div className="file_done_button" onClick={() => { setFile(null) }}>X</div>
                    </div>
                }
            </div>
        </>
    )
}

export default FileUpload