//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//Imports
import React from "react";
import "./Dropbox.css";
import axios from "axios"
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useLocation } from "react-router-dom"
import DropboxTable from "../../../Component/Admin/DropboxTable/DropboxTable";
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//Exported Function
export default function Dropbox() {

    const [AllApplicants, setAllApplicants] = React.useState(null);
    const [NewApplicants, setNewApplicants] = React.useState(null);
    const [ContactedApplicants, setContactedApplicants] = React.useState(null);
    const [SelectedApplicants, setSelectedApplicants] = React.useState(null);
    const [RejectedApplicants, setRejectedApplicants] = React.useState(null);

    const [loading, setLoading] = React.useState(true);
    const [refresh, setrefresh] = React.useState(false);
    const { state } = useLocation();
    // const navigate = useNavigate();
    const [value, setValue] = React.useState("2");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        axios.post("" + process.env.REACT_APP_BACKEND_URL + "api/dropbox/getdropboxapplications",
            {
                token: sessionStorage.getItem("token"),
            }
        ).then((res) => {
            if (!res.data.error && res.data.data) {
                // setNewApplicants(res.data.data);
                setAllApplicants(res.data.data);
                setNewApplicants(res.data.data.filter((item) => item.status === "New"));
                setContactedApplicants(res.data.data.filter((item) => item.status === "Contacted"));
                setSelectedApplicants(res.data.data.filter((item) => item.status === "Hired"));
                setRejectedApplicants(res.data.data.filter((item) => item.status === "Rejected"));
                setLoading(false);
            }
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }, [refresh])

    return (
        <div className="Dropbox">
            <Box className="Dropbox__tabs"sx={{ width: "85%", typography: "body1", padding: "15px 7.5%" }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList onChange={handleChange}>
                            <Tab label="All Candidates" value="1" />
                            <Tab label="New Candidates" value="2" />
                            <Tab label="Contacted Candidates" value="3" />
                            <Tab label="Selected Candidates" value="4" />
                            <Tab label="Rejected Candidates" value="5" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"> <DropboxTable state={state} tableData={AllApplicants} loading={loading} setrefresh={(item) => { setrefresh(item) }} setLoading={(item) => { setLoading(item) }} refresh={refresh} /> </TabPanel>
                    <TabPanel value="2"> <DropboxTable state={state} tableData={NewApplicants} loading={loading} setrefresh={(item) => { setrefresh(item) }} setLoading={(item) => { setLoading(item) }} refresh={refresh} /> </TabPanel>
                    <TabPanel value="3"> <DropboxTable state={state} tableData={ContactedApplicants} loading={loading} setrefresh={(item) => { setrefresh(item) }} setLoading={(item) => { setLoading(item) }} refresh={refresh} /> </TabPanel>
                    <TabPanel value="4"> <DropboxTable state={state} tableData={SelectedApplicants} loading={loading} setrefresh={(item) => { setrefresh(item) }} setLoading={(item) => { setLoading(item) }} refresh={refresh} /> </TabPanel>
                    <TabPanel value="5"> <DropboxTable state={state} tableData={RejectedApplicants} loading={loading} setrefresh={(item) => { setrefresh(item) }} setLoading={(item) => { setLoading(item) }} refresh={refresh} /> </TabPanel>
                </TabContext>
            </Box>
        </div>
    );
}