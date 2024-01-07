import React from "react";
import "./Admin.css";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AdminDashboard from "./AdminDashboard/AdminDashboard"
import AdminJob from "./AdminJob/AdminJob"
import AdminClosedJob from "./AdminClosedJob/AdminClosedJob";
import AdminOpenJob from "./AdminOpenJob/AdminOpenJob";
import { useLocation, useNavigate } from "react-router-dom";
import AdminAddEmployees from "./AdminAddEmployees/AdminAddEmployees";
import Dropbox from "./Dropbox/Dropbox";
function Admin() {

    const navigate = useNavigate();
    const search = useLocation().search;
    const [value, setValue] = React.useState("dashboard");

    React.useEffect(() => {
        let temptab = "dashboard"
        if (new URLSearchParams(search) && new URLSearchParams(search).get('tab')) {
            temptab = new URLSearchParams(search).get('tab').toLowerCase()
            if (temptab && (temptab === 'dashboard' || temptab === 'add' || temptab === 'open' || temptab === 'closed' || temptab === 'post' || temptab === 'dropbox')) {
                setValue(temptab)
            }
            else {
                setValue("dashboard")
            }
        }
    }, [new URLSearchParams(search).get('tab')])

    const handleChange = (event, newValue) => {
        navigate("/admin?tab=" + newValue)
    };

    return (
        <>
            <div className="Admin">
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box className="Admin__Tabs" sx={{ width: '80%', m: "auto", borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange}>
                                <Tab label="Dashboard" value="dashboard" />
                                <Tab label="Post Job" value="post" />
                                <Tab label="Open Jobs" value="open" />
                                <Tab label="Closed Jobs" value="closed" />
                                {/* <Tab label="Add Employees" value="add" /> */}
                                <Tab label="Dropbox" value="dropbox" />
                            </TabList>
                        </Box>
                        <TabPanel value="dashboard"><AdminDashboard /></TabPanel>
                        <TabPanel value="post"> <AdminJob /> </TabPanel>
                        <TabPanel value="open"> <AdminOpenJob /> </TabPanel>
                        <TabPanel value="closed"> <AdminClosedJob /> </TabPanel>
                        {/* <TabPanel value="add"> <AdminAddEmployees /> </TabPanel> */}
                        <TabPanel value="dropbox"> <Dropbox /> </TabPanel>
                    </TabContext>
                </Box>
            </div>
        </>
    );
}

export default Admin;
