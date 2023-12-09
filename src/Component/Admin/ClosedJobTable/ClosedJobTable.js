import React from "react";
import "./ClosedJobTable.css";
import axios from "axios";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AlertContainer, alert } from "react-custom-alert";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

export default function ClosedJobTable() {
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableData, setTableData] = React.useState(null);

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

  React.useEffect(() => {
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "api/listings/getClosedJobs")
      .then((res) => {
        setTableData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const closeJobApi = (id) => {
    const body = {
      token: sessionStorage.getItem("token"),
      jobID: id,
    };
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "api/listings/openJob", body)
      .then((res) => {
        if (res.data.error) {
          alert({ type: "warning", message: res.data.message });
        } else {
          let temp = tableData.filter((curVal) => curVal._id !== id);
          setTableData(temp);
          alert({ type: "success", message: "Job Open successfully" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let columns = [];
  {
    windowDimensions.width >= 750
      ? (columns = [
          {
            field: "Title",
            headerName: "Title",
            flex: 1,
          },
          {
            field: "Department",
            headerName: "Department",
            flex: 1,
          },
          {
            field: "Type",
            headerName: "Type",
            flex: 1,
          },
          {
            field: "Salary",
            headerName: "Salary",
            flex: 1,
          },
          {
            field: "Location",
            headerName: "Location",
            flex: 1,
          },
          {
            field: "Experience",
            headerName: "Experience",
            flex: 1,
          },
          {
            field: "Employee",
            headerName: "For Employees?",
            flex: 1,
            renderCell: (employee) =>
              employee.row.Employee === true ? (
                <div className="employee__icon__green">
                  <DoneIcon sx={{ color: "white" }} />
                </div>
              ) : (
                <div className="employee__icon__red">
                  <CloseIcon sx={{ color: "white" }} />
                </div>
              ),
          },
          {
            field: "Status",
            headerName: "Status",
            flex: 1,
          },
          {
            field: "Action",
            headerName: "Action",
            minWidth: 180,
            renderCell: (item) => (
              <>
                <Button
                  onClick={() => {
                    closeJobApi(item.id);
                  }}
                  variant="contained"
                  color="success"
                  size="small"
                  sx={{ m: 1 }}
                >
                  Open
                </Button>
                <Button
                  onClick={() => {
                    navigate("/admin/jobApplication", {
                      state: {
                        data: tableData.find((obj) => obj._id === item.id),
                        backURL: "/admin?tab=closed",
                      },
                    });
                  }}
                  variant="contained"
                  size="small"
                >
                  View
                </Button>
              </>
            ),
            sortable: false,
            filterable: false,
          },
        ])
      : (columns = [
          {
            field: "Title",
            headerName: "Title",
            flex: 1,
            minWidth: 140,
          },
          {
            field: "Department",
            headerName: "Department",
            flex: 1,
            minWidth: 150,
          },
          {
            field: "Type",
            headerName: "Type",
            flex: 1,
            minWidth: 100,
          },
          {
            field: "Salary",
            headerName: "Salary",
            flex: 1,
            minWidth: 140,
          },
          {
            field: "Location",
            headerName: "Location",
            flex: 1,
            minWidth: 90,
          },
          {
            field: "Experience",
            headerName: "Experience",
            flex: 1,
            minWidth: 100,
          },
          {
            field: "Employee",
            headerName: "For Employees?",
            flex: 1,
            minWidth: 90,
            renderCell: (employee) =>
              employee.row.Employee === true ? (
                <div className="employee__icon__green">
                  <DoneIcon sx={{ color: "white" }} />
                </div>
              ) : (
                <div className="employee__icon__red">
                  <CloseIcon sx={{ color: "white" }} />
                </div>
              ),
          },
          {
            field: "Status",
            headerName: "Status",
            flex: 1,
            minWidth: 90,
          },
          {
            field: "Action",
            headerName: "Action",
            minWidth: 180,
            renderCell: (item) => (
              <>
                <Button
                  onClick={() => {
                    closeJobApi(item.id);
                  }}
                  variant="contained"
                  color="success"
                  size="small"
                  sx={{ m: 1 }}
                >
                  Open
                </Button>
                <Button
                  onClick={() => {
                    navigate("/admin/jobApplication", {
                      state: {
                        data: tableData.find((obj) => obj._id === item.id),
                        backURL: "/admin?tab=closed",
                      },
                    });
                  }}
                  variant="contained"
                  size="small"
                >
                  View
                </Button>
              </>
            ),
            sortable: false,
            filterable: false,
          },
        ]);
  }
  const rows = tableData?.map((cur, key) => {
    return {
      id: cur._id,
      Location: cur.jobCity,
      Title: cur.jobTitle,
      Department: cur.jobDepartment,
      Type: cur.jobType,
      Salary: cur.jobSalary,
      Experience: cur.reqExperience,
      Employee: cur.forEmployees,
      Incentives: cur.jobIncentives,
      Description: cur.jobDescription,
      Status: cur.jobStatus,
      Action: cur._id,
    };
  });
  return (
    <>
      <AlertContainer floatingTime={8000} />

      <div className="ClosedJobTable">
        {tableData ? (
          <>
            {tableData.length > 0 ? (
              <>
                <div
                  style={{ marginTop: "10px", height: "70vh", width: "100%" }}
                >
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
              <div>No data to display</div>
            )}
          </>
        ) : (
          <div>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
        )}
      </div>
    </>
  );
}
