import React from "react";
import "./DropboxTable.css";
import axios from "axios";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { alert, AlertContainer } from "react-custom-alert";
import CsvDownload from "react-json-to-csv";


export default function DropboxTable({ state, tableData, loading, refresh, setrefresh, setLoading }) {
    const navigate = useNavigate();
    const [ExportData, setExportData] = React.useState([]);
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

    function APICall(id, link, task) {
        if (!loading) {
            setLoading(true);
            console.log(id);
            // setLoading(false);
            axios.post("" + process.env.REACT_APP_BACKEND_URL + "api/dropbox/" + link, {
                "token": sessionStorage.getItem("token"),
                applicationID: id
            }).then((res) => {
                setLoading(false);
                if (res.data.error) alert({ message: res.data.message, type: "warning" })
                else alert({ message: res.data.message, type: "success" })
                setrefresh(!refresh);
            }).catch((err) => {
                setLoading(false);
                console.log(err);
                alert({ message: "An unexpected error occured. Please try again", type: "warning" })
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
                minWidth: 180
            },
            {
                field: "Phone",
                headerName: "Phone",
                minWidth: 120
            },
            {
                field: "Designation",
                headerName: "Designation",
                minWidth: 150
            },
            {
                field: "City",
                headerName: "City",
                minWidth: 120
            },
            {
                field: "Preferred Division",
                headerName: "Preferred Division",
                minWidth: 150
            },
            {
                field: "Action",
                headerName: "Action",
                minWidth: 240,
                renderCell: (item) => {
                    if (item.value.status === "New") {
                        return (
                            <>
                                <Button variant="contained" size="small" sx={{ marginRight: 1 }}
                                    onClick={() => {
                                        navigate("/admin/jobDropbox", {
                                            state: {
                                                data: tableData.find((obj) => obj._id === item.id),
                                                backURL: "/admin?tab=dropbox",
                                            },
                                        });
                                    }}
                                >View</Button>
                                <Button variant="contained" color="success" size="small" sx={{ minWidth: 160 }}
                                    onClick={() => { APICall(item.value.id, "markdropboxapplicationcontacted", "Mark as Contacted") }}
                                >Mark as Contacted</Button>
                            </>
                        )
                    } if (item.value.status === "Contacted") {
                        return (
                            <>
                                <Button variant="contained" size="small" sx={{ marginRight: 1 }}
                                    onClick={() => {
                                        navigate("/admin/jobDropbox", {
                                            state: {
                                                data: tableData.find((obj) => obj._id === item.id),
                                                backURL: "/admin?tab=dropbox",
                                            },
                                        });
                                    }}
                                >View</Button>
                                <Button variant="contained" color="success" size="small" sx={{ minWidth: 160 }}
                                    onClick={() => { APICall(item.value.id, "markdropboxapplicationhired", "Mark as Selected") }}
                                >Mark as selected</Button>
                            </>
                        )
                    }
                    else {
                        return (
                            <>
                                <Button variant="contained" size="small" sx={{ marginRight: 1 }} onClick={() => {
                                    navigate("/admin/jobDropbox", {
                                        state: {
                                            data: tableData.find((obj) => obj._id === item.id),
                                            backURL: "/admin?tab=dropbox",
                                        },
                                    });
                                }}
                                >View</Button>
                            </>
                        )
                    }
                },
            },
            {
                field: "Status",
                headerName: "Status",
                minWidth: 100
            },
        ]
        : [
            {
                field: "Name",
                headerName: "Name",
                minWidth: 100
            },
            {
                field: "Email",
                headerName: "Email",
                minWidth: 150
            },
            {
                field: "Phone",
                headerName: "Phone",
                minWidth: 110
            },
            {
                field: "Designation",
                headerName: "Designation",
                minWidth: 125
            },
            {
                field: "City",
                headerName: "City",
                minWidth: 80
            },
            {
                field: "Preferred Division",
                headerName: "Preferred Division",
                minWidth: 125
            },
            {
                field: "Action",
                headerName: "Action",
                minWidth: 80,
                renderCell: (item) => {
                    if (item.value.status === "New") {
                        return (
                            <>
                                <Button variant="contained" size="small" sx={{ marginRight: 1 }} onClick={() => {
                                    navigate("/admin/jobDropbox", {
                                        state: {
                                            data: tableData.find((obj) => obj._id === item.id),
                                            backURL: "/admin?tab=dropbox",
                                        },
                                    });
                                }}
                                >View</Button>
                            </>
                        )
                    } else if (item.value.status === "Shortlisted") {
                        return (
                            <>
                                <Button variant="contained" size="small" sx={{ marginRight: 1 }} onClick={() => {
                                    navigate("/admin/jobDropbox", {
                                        state: {
                                            data: tableData.find((obj) => obj._id === item.id),
                                            backURL: "/admin?tab=dropbox",
                                        },
                                    });
                                }}
                                >View</Button>
                            </>
                        )
                    } else {
                        return (
                            <>
                                <Button variant="contained" size="small" sx={{ marginRight: 1 }} onClick={() => {
                                    navigate("/admin/jobDropbox", {
                                        state: {
                                            data: tableData.find((obj) => obj._id === item.id),
                                            backURL: "/admin?tab=dropbox",
                                        },
                                    });
                                }}
                                >View</Button>
                            </>
                        )
                    }
                },
            },
            {
                field: "Status",
                headerName: "Status",
                minWidth: 80
            },
        ]
    const rows = tableData?.map((cur, key) => {
        return {
            id: cur._id,
            Name: cur.fullname,
            Email: cur.email,
            Phone: cur.phone,
            City: cur.city,
            Statement: cur.motivationStatement,
            "Resume Link": cur.resume,
            Designation: cur.designation,
            "Preferred Division": cur.areaOfInterest,
            Action: { id: cur._id, status: cur.status },
            Status: cur.status,
        };
    });

    React.useEffect(() => {
        if (tableData && tableData.length > 0) {
            let temp = tableData.map((item, i) => {
                return {
                    "Full Name": item.fullname,
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
                    "Preferred Division": item.areaOfInterest,
                    "Previous Designation": item.designation,
                    "Resume Link": item.resume,
                    "Applicant Status": item.status,
                    "Date Submitted": item.dateCreated.slice(0, 10),
                };
            });
            setExportData(temp);
        } else {
            setExportData([]);
        }
    }, [tableData]);

    return (
        <>
            <AlertContainer floatingTime={4000} />
            <div className="DropboxTable">
                {(!tableData || loading)
                    ? <div className="DropboxTable__Loading">
                        <CircularProgress color="inherit" />
                    </div>
                    : null
                }
                {(tableData)
                    ? (tableData.length > 0) ? (
                        <>
                            <div style={{ marginTop: "10px", height: "70vh", width: "80vw" }} >
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
                            <CsvDownload
                                data={ExportData}
                                filename={`Dropbox Applications.csv`}
                                style={{
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
                                    margin: "20px",
                                    float: "right"
                                }}
                            >Export Dropbox Data to CSV</CsvDownload>
                        </>
                    ) : (
                        <div className="DropboxTable__NoData">No data to display</div>
                    )
                    : null
                }
            </div>
        </>
    );
}
