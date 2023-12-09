import React from "react";
import { Line } from "react-chartjs-2";
const months = [
  "Jan", "Feb", "Mar",
  "Apr", "May", "Jun",
  "Jul", "Aug", "Sep",
  "Oct", "Nov", "Dec",
];

export default function Chart({ data }) {

  const [jobData, setjobData] = React.useState(null)
  const [dropboxData, setdropboxData] = React.useState(null)
  const [timeData, settimeData] = React.useState(null)

  React.useEffect(() => {
    if (data) {
      //Extract date
      let inJobData = [];
      let inDropData = [];
      for (var i = 0; i < data.jobapps.length; i++) {
        inJobData.push(
          months[parseInt(data.jobapps[i].dateApplied.slice(0, 10).split("-")[1]) - 1] + " " +
          data.jobapps[i].dateApplied.slice(0, 10).split("-")[0].slice(2, 4)
        );
      }
      for (var j = 0; j < data.dropboxapps.length; j++) {
        inDropData.push(
          months[parseInt(data.dropboxapps[j].dateCreated.slice(0, 10).split("-")[1]) - 1] + " " +
          data.dropboxapps[j].dateCreated.slice(0, 10).split("-")[0].slice(2, 4)
        );
      }
      let monthArr = [...new Set(inJobData.concat(inDropData))];
      let jobArr = [];
      let dropArr = [];
      for (var k = 0; k < monthArr.length; k++) {
        let jobSum = 0;
        let dropSum = 0;
        for (var l = 0; l < inJobData.length; l++) {
          if (inJobData[l] === monthArr[k]) jobSum++;
        }
        for (var m = 0; m < inDropData.length; m++) {
          if (inDropData[m] === monthArr[k]) dropSum++;
        }
        jobArr.push(jobSum);
        dropArr.push(dropSum);
      }
      settimeData(monthArr);
      setjobData(jobArr);
      setdropboxData(dropArr);
    }
  }, [data])

  const ChartData = {
    labels: timeData,
    datasets: [
      {
        label: "Job Applications",
        data: jobData,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Dropbox Applications",
        data: dropboxData,
        fill: true,
        borderColor: "#742774"
      }
    ]
  };

  if (timeData && jobData && dropboxData) {
    return (
      <Line data={ChartData} />
    )
  } else {
    return (<div style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "xx-large",
      minHeight: "50vh",
      backgroundColor: "#BBB",
      borderRadius: "5px",
      color: "#666"
    }}>Fetching Data...</div>)
  }
}
