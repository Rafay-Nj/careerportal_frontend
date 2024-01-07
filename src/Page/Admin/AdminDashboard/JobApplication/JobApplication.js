import React from 'react'
// import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import WifiCallingIcon from '@mui/icons-material/WifiCalling';
import ReportOffIcon from '@mui/icons-material/ReportOff';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

const JobApplication = ({ data }) => {
  //console.log(data)
  const theme = useTheme();
  const options = {
    animation: true,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };
  const devices = [
    { title: 'New', icon: FiberNewIcon, color: '#191970', },
    { title: 'Shortlisted', icon: FormatListNumberedIcon, color: '#89CFF0', },
    { title: 'Contacted', icon: WifiCallingIcon, color: 'lightgreen' },
    { title: 'Hired', icon: DoneAllIcon, color: '#008080' },
    { title: 'Rejected', icon: ReportOffIcon, color: '#7d7e80' },
  ];

  function calculateValues(data) {
    let temp = []
    let Total = data.numTotalJobApps;
    let New = data.numNewJobApps;
    let Short = data.numShortJobApps;
    let Contacted = data.numContactedJobApps;
    let Hired = data.numHiredJobApps;
    let Rejected = data.numRejectedJobApps;
    temp.push(parseInt((New / Total) * 100))
    temp.push(parseInt((Short / Total) * 100))
    temp.push(parseInt((Contacted / Total) * 100))
    temp.push(parseInt((Hired / Total) * 100))
    temp.push(parseInt((Rejected / Total) * 100))
    return temp;
  }

  function getValues() {
    if (data) {
      let temp = [
        data.numNewJobApps, data.numShortJobApps,
        data.numContactedJobApps, data.numHiredJobApps,
        data.numRejectedJobApps,]
      return temp;
    }
    else return [100]
  }

  function getBackground() {
    if (data) {
      let temp = devices.map((item) => {
        return item.color;
      })
      return temp;
    }
    else return ["#BBB"]
  }
  function getLabels() {
    let temp = devices.map((item) => {
      return item.title;
    })
    return temp;
  }

  function getKey() {
    if (data) {
      let arr = calculateValues(data);
      let count = -1;
      return devices.map(({ color, icon: Icon, title }) => {
        count++;
        return (
          <Box key={title} sx={{ p: 1, textAlign: 'center' }}>
            <Icon sx={{ color }} />
            <Typography color={color} variant="body1">{title}</Typography>
            <Typography style={{ color }} variant="h4">{arr[count]}%</Typography>
          </Box>
        )
      })
    } else {
      {
        devices.map(({ color, icon: Icon, title }) => (
          <Box key={title} sx={{ p: 1, textAlign: 'center' }}>
            <Icon sx={{ color: "#BBB" }} />
            <Typography color={"#BBB"} variant="body1">{title}</Typography>
            <Typography style={{ color: "#BBB" }} variant="h4">---</Typography>
          </Box>
        ))
      }
    }
  }

  const pieData = {
    datasets: [
      {
        data: getValues(),
        backgroundColor: getBackground(),
        borderWidth: 2,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: getLabels()
  };
  return (
    <Card >
      <CardHeader title="Job Application" />
      <Divider />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }} >
          {getKey()}
        </Box>
      </CardContent>
    </Card>
  );
}

export default JobApplication