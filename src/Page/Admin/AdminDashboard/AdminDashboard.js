import React from "react";
import "./AdminDashboard.css"
import NewJobApplication from "./NewJobApplications/NewJobApplication";
import NoOfOpenJobs from "./NoOfOpenJobs/NoOfOpenJobs";
import NewDropBoxApplication from "./NewDropBoxApplications/NewDropBoxApplication";
import NoOfEmployees from "./NoOfEmployees/NoOfEmployees";
import JobApplicationsOverTime from "./JobApplicationsOverTime/JobApplicationsOverTime";
import DropboxApplication from "./DropboxApplications/DropboxApplication";
import JobApplication from "./JobApplication/JobApplication";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { alert } from "react-custom-alert";

export default function AdminDashboard() {

    const [loading, setLoading] = React.useState(true);
    const [allData, setAllData] = React.useState(null);

    React.useEffect(() => {
        setLoading(true);
        axios.post("" + process.env.REACT_APP_BACKEND_URL + "api/stats/getstats", {
            "token": sessionStorage.getItem("token")
        }).then((res) => {
            setLoading(false);
            if (res.data.error) {
                alert({ message: "There was a problem loading the data. Please try again later", type: "warning" })
            } else {
                setAllData(res.data.data);
            }
        }).catch((err) => {
            setLoading(false);
            alert({ message: "An unexpected error occured. Please try again later", type: "warning" })
            console.log(err)
        })
    }, [])

    return (
        <div className="AdminDashboard">
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="AdminDashboard__box_1">
                <div className="AdminDashboard__box_1_content">
                    <NewJobApplication data={(allData && allData.numNewJobApps !== null) ? allData.numNewJobApps : null} />
                </div>
                <div className="AdminDashboard__box_1_content">
                    <NewDropBoxApplication data={(allData && allData.numNewDropboxApps !== null) ? allData.numNewDropboxApps : null} />
                </div>
                <div className="AdminDashboard__box_1_content">
                    <NoOfOpenJobs data={(allData && allData.numOpenJobs !== null) ? allData.numOpenJobs : null} />
                </div>
                <div className="AdminDashboard__box_1_content">
                    <NoOfEmployees data={(allData && allData.numTotalJobApps !== null && allData.numTotalDropboxApps !== null) ? allData : null} />
                </div>
            </div>
            {/* <div className="AdminDashboard__box_2">
                <JobApplicationsOverTime data={(allData && allData.appArray && allData.dropboxAppArray) ? { "jobapps": allData.appArray, "dropboxapps": allData.dropboxAppArray } : null} />
            </div> */}
            <div className="AdminDashboard__box_3">
                <div className="AdminDashboard__box_3__content">
                    <JobApplication
                        data={(allData && allData.numTotalJobApps !== null &&
                            allData.numNewJobApps !== null && allData.numContactedJobApps !== null &&
                            allData.numRejectedJobApps !== null && allData.numShortJobApps !== null &&
                            allData.numHiredJobApps !== null)
                            ? {
                                "numTotalJobApps": allData.numTotalJobApps,
                                "numNewJobApps": allData.numNewJobApps,
                                "numContactedJobApps": allData.numContactedJobApps,
                                "numRejectedJobApps": allData.numRejectedJobApps,
                                "numShortJobApps": allData.numShortJobApps,
                                "numHiredJobApps": allData.numHiredJobApps,
                            }
                            : null
                        }
                    />
                </div>
                <div className="AdminDashboard__box_3__content">
                    <DropboxApplication
                        data={(allData && allData.numTotalJobApps !== null &&
                            allData.numNewJobApps !== null && allData.numContactedJobApps !== null &&
                            allData.numRejectedJobApps !== null && allData.numHiredJobApps !== null)
                            ? {
                                "numTotalDropboxApps": allData.numTotalDropboxApps,
                                "numNewDropboxApps": allData.numNewDropboxApps,
                                "numContactedDropboxApps": allData.numContactedDropboxApps,
                                "numRejectedDropboxApps": allData.numRejectedDropboxApps,
                                "numHiredDropboxApps": allData.numHiredDropboxApps,
                            }
                            : null
                        }
                    />
                </div>
            </div>
        </div>
    )
}