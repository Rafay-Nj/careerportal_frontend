import React from "react"
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from './Component/Footer/Footer';
import Header from './Component/Header/Header';
import Careers from './Page/Careers/Careers';
import Error from './Page/Error/Error';
import Admin from './Page/Admin/Admin';
import AdminLogin from './Page/Admin/AdminLogin/AdminLogin';
import JobApplication from './Component/Admin/JobApplication/JobApplication';
import AdminHeader from './Component/Admin/AdminHeader/AdminHeader';
import JobApplicant from "./Component/Admin/JobApplicant/JobApplicant";
import JobDropbox from "./Component/Admin/JobDropbox/JobDropbox";

function Career() {
  return (
    <div className="App">
      <Careers />
    </div>
  );
}

function AdminWhole() {
  const [refresh, setrefresh] = React.useState(true);
  return (
    <div className="App">
      {(sessionStorage.getItem("token"))
        ? <>
          <AdminHeader setrefresh={(item) => { setrefresh(item) }} refresh={refresh} />
          <Admin />
        </>
        : <AdminLogin setrefresh={(item) => { setrefresh(item) }} refresh={refresh} />
      }
    </div>
  );
}

// function JobApplicationWhole() {
//   const [refresh, setrefresh] = React.useState(true);
//   return (
//     <div className="App">
//       {(sessionStorage.getItem("token"))
//         ? <>
//           <AdminHeader setrefresh={(item) => { setrefresh(item) }} refresh={refresh} />
//           <JobApplication />
//         </>
//         : <AdminLogin setrefresh={(item) => { setrefresh(item) }} refresh={refresh} />
//       }
//     </div>
//   );
// }

// function JobApplicantWhole() {
//   const [refresh, setrefresh] = React.useState(true);
//   return (
//     <div className="App">
//       {(sessionStorage.getItem("token"))
//         ? <>
//           <AdminHeader setrefresh={(item) => { setrefresh(item) }} refresh={refresh} />
//           <JobApplicant />
//         </>
//         : <AdminLogin setrefresh={(item) => { setrefresh(item) }} refresh={refresh} />
//       }
//     </div>
//   );
// }
// function JobDropboxWhole() {
//   const [refresh, setrefresh] = React.useState(true);
//   return (
//     <div className="App">
//       {(sessionStorage.getItem("token"))
//         ? <>
//           <AdminHeader setrefresh={(item) => { setrefresh(item) }} refresh={refresh} />
//           <JobDropbox />
//         </>
//         : <AdminLogin setrefresh={(item) => { setrefresh(item) }} refresh={refresh} />
//       }
//     </div>
//   );
// }

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>

            {/* -------- "/" ---------- */}
            <Route exact path="/" element={Career()} />

            {/* -------- "/admin" ---------- */}
            <Route exact path="/admin" element={AdminWhole()} />

            {/* -------- "/admin/jobApplication" ---------- */}
            {/* <Route exact path="/admin/jobApplication" element={JobApplicationWhole()} /> */}

            {/* -------- "/admin/jobApplication" ---------- */}
            {/* <Route exact path="/admin/jobApplicant" element={JobApplicantWhole()} /> */}
            
            {/* -------- "/admin/jobDropbox" ----------*/}
            {/* <Route exact path="/admin/jobDropbox" element={JobDropboxWhole()} /> */}

            {/* -------- ELSE ---------- */}
            <Route path="*" element={<Error />} />

          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
