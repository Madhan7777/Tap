import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ExampleView from "../views/ExampleView";
import ForgotPasswordView from "../components/client/forgetpassword/ForgetPassword";
import Otp from "../components/client/forgetpassword/Otp";
import ConfirmPassword from "../components/client/forgetpassword/ConfirmPassword";
import ResetPassword from "../components/client/ResetPassword/ResetPassword";
import HomePage from "../components/Home/Home";
import CandidateTable from "../components/HiredCandidate.js/CandidateTable";

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<ExampleView />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/forgetpassword" element={<ForgotPasswordView />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/confirmpassword" element={<ConfirmPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/candidatetable" element={<CandidateTable />} />





      </Routes>
    </Router>
  );
};

export default MainRouter;
