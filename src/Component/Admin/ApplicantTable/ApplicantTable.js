import React from "react";
import "./ApplicantTable.css";
import axios from "axios";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { AlertContainer, alert } from "react-custom-alert";

export default function ApplicantTable({ state, tableData, loading, refresh, setrefresh, setLoading }) {
    const navigate = useNavigate();
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const hasWindow = typeof window !== "undefined";
    const [windowDimensions, setWindowDimensions] = React.useState(
        getWindowDimensions()
    );

    function getWindowDimensions() {
        const width = hasWindow ? window.innerWidth : null;
        return {
            width,
        };
    }

    function APICall(id, link) {
        if (!loading) {
            setLoading(true);
            axios.post("" + process.env.REACT_APP_BACKEND_URL + "api/applications/" + link, {
                "token": sessionStorage.getItem("token"),
                applicationID: id
            }).then((res) => {
                //console.log(res);
                setrefresh(!refresh);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    let columns = (windowDimensions.width >= 750)
        ? [
            {
                field: "Name",
                headerName: "Name",
                minWidth: 150
            },
            {
                field: "Email",
                headerName: "Email",
                minWidth: 160
            },
            {
                field: "Phone",
                headerName: "Phone",
                minWidth: 120
            },
            {
                field: "CNIC",
                headerName: "CNIC",
                minWidth: 150
            },
            {
                field: "Location",
                headerName: "Location",
                minWidth: 100
            },
            {
                field: "Status",
                headerName: "Status",
                minWidth: 100
            },
            {
                field: "Action by",
                headerName: "Action by",
                minWidth: 100
            },
            {
                field: "Action",
                headerName: "Action",
                minWidth: 240,
                renderCell: (item) => {
                    if (item.value.status === "New") {
                        return (
                            <>
                                <Button variant="contained" size="small" sx={{ marginRight: 1 }} onClick={() => {
                                    navigate("/admin/jobApplicant", {
                                        state: {
                                            data: tableData.find((obj) => obj.applicantID === item.value.applicantID),
                                            backURL: state.backURL,
                                            jobData: state.data,
                                        },
                                    });
                                }}
                                >View</Button>
                                <Button variant="contained" size="small" color="success" onClick={() => { APICall(item.value.id, "shortlistApplication") }} >Shortlist</Button>
                            </>
                        )
                    } else if (item.value.status === "Shortlisted") {
                        return (
                            <>
                                <Button variant="contained" size="small" sx={{ marginRight: 1 }} onClick={() => {
                                    navigate("/admin/jobApplicant", {
                                        state: {
                                            data: tableData.find((obj) => obj.applicantID === item.value.applicantID),
                                            backURL: state.backURL,
                                            jobData: state.data,
                                        },
                                    });
                                }}
                                >View</Button>
                                <Button variant="contained" size="small" color="success" onClick={() => { APICall(item.value.id, "markContacted") }} >Mark Contacted</Button>
                            </>
                        )
                    } else if (item.value.status === "Contacted") {
                        return (
                            <>
                                <Button variant="contained" size="small" sx={{ marginRight: 1 }} onClick={() => {
                                    navigate("/admin/jobApplicant", {
                                        state: {
                                            data: tableData.find((obj) => obj.applicantID === item.value.applicantID),
                                            backURL: state.backURL,
                                            jobData: state.data,
                                        },
                                    });
                                }}
                                >View</Button>
                                <Button variant="contained" size="small" color="success" onClick={() => { APICall(item.value.id, "markhired") }} >Hire</Button>
                            </>
                        )
                    } else {
                        return (
                            <>
                                <Button variant="contained" size="small" sx={{ marginRight: 1 }} onClick={() => {
                                    navigate("/admin/jobApplicant", {
                                        state: {
                                            data: tableData.find((obj) => obj.applicantID === item.value.applicantID),
                                            backURL: state.backURL,
                                            jobData: state.data,
                                        },
                                    });
                                }}
                                >View</Button>
                            </>
                        )
                    }
                },
            },
        ]
        : [
            {
                field: "Name",
                headerName: "Name",
                minWidth: 140
            },
            {
                field: "Email",
                headerName: "Email",
                minWidth: 150
            },
            {
                field: "Phone",
                headerName: "Phone",
                minWidth: 140
            },
            {
                field: "CNIC",
                headerName: "CNIC",
                minWidth: 140
            },
            {
                field: "Location",
                headerName: "Location",
                minWidth: 80
            },
            {
                field: "Status",
                headerName: "Status",
                minWidth: 80
            },
            {
                field: "Action by",
                headerName: "Action by",
                minWidth: 80
            },
            {
                field: "Action",
                headerName: "Action",
                minWidth: 200,
                renderCell: (item) => {
                    if (item.value.status === "New") {
                        return (
                            <>
                                <Button variant="contained" size="small" sx={{ marginRight: 1 }} onClick={() => {
                                    navigate("/admin/jobApplicant", {
                                        state: {
                                            data: tableData.find((obj) => obj.applicantID === item.value.applicantID),
                                            backURL: state.backURL,
                                            jobData: state.data,
                                        },
                                    });
                                }}
                                >View</Button>
                                <Button variant="contained" size="small" color="success" onClick={() => { APICall(item.value.id, "shortlistApplication") }} >Shortlist</Button>
                            </>
                        )
                    } else if (item.value.status === "Shortlisted") {
                        return (
                            <>
                                <Button variant="contained" size="small" sx={{ marginRight: 1 }} onClick={() => {
                                    navigate("/admin/jobApplicant", {
                                        state: {
                                            data: tableData.find((obj) => obj.applicantID === item.value.applicantID),
                                            backURL: state.backURL,
                                            jobData: state.data,
                                        },
                                    });
                                }}
                                >View</Button>
                                <Button variant="contained" size="small" color="success" onClick={() => { APICall(item.value.id, "markContacted") }} >Mark Contacted</Button>
                            </>
                        )
                    } else if (item.value.status === "Contacted") {
                        return (
                            <>
                                <Button variant="contained" size="small" sx={{ marginRight: 1 }} onClick={() => {
                                    navigate("/admin/jobApplicant", {
                                        state: {
                                            data: tableData.find((obj) => obj.applicantID === item.value.applicantID),
                                            backURL: state.backURL,
                                            jobData: state.data,
                                        },
                                    });
                                }}
                                >View</Button>
                                <Button variant="contained" size="small" color="success" onClick={() => { APICall(item.value.id, "markhired") }} >Hire</Button>
                            </>
                        )
                    } else {
                        return (
                            <>
                                <Button variant="contained" size="small" sx={{ marginRight: 1 }} onClick={() => {
                                    navigate("/admin/jobApplicant", {
                                        state: {
                                            data: tableData.find((obj) => obj.applicantID === item.value.applicantID),
                                            backURL: state.backURL,
                                            jobData: state.data,
                                        },
                                    });
                                }}
                                >View</Button>
                            </>
                        )
                    }
                },
            },
        ]


    const rows = tableData?.map((cur, key) => {
        return {
            id: key,
            Name: cur.fullName,
            Email: cur.email,
            Phone: cur.phone,
            Location: cur.city,
            "Resume Link": cur.resume,
            CNIC: cur.CNIC,
            Status: cur.applicationStatus.status,
            "Action by": (cur.applicationStatus && cur.applicationStatus.by && cur.applicationStatus.by.name) ? cur.applicationStatus.by.name : "N/A",
            Action: { id: cur.applicationID, applicantID: cur.applicantID, status: cur.applicationStatus.status },
        };
    });
    return (
        <>
            <AlertContainer floatingTime={4000} />

            <div className="ApplicantTable">
                {(!tableData || loading)
                    ? <div className="ApplicantTable__Loading">
                        <CircularProgress color="inherit" />
                    </div>
                    : null
                }
                {(tableData)
                    ? (tableData.length > 0) ? (
                        <>
                            <div style={{ marginTop: "10px", height: "70vh", width: "75vw" }} >
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pagination
                                    pageSize={rowsPerPage}
                                    onPageSizeChange={(newSize) => setRowsPerPage(newSize)}
                                    rowsPerPageOptions={[10, 25, 50]}
                                    disableSelectionOnClick
                                />
                            </div>
                        </>
                    ) : (
                        <div className="ApplicantTable__NoData">No data to display</div>
                    )
                    : null
                }
            </div>
        </>
    );
}
