import ExampleComponent from "../components/ExampleComponent";
import CandidateTable from "../components/HiredCandidate.js/CandidateTable";
import HomePage from "../components/Home/Home";
import ResetPassword from "../components/client/ResetPassword/ResetPassword";
import ConfirmPassword from "../components/client/forgetpassword/ConfirmPassword";
import ForgotPasswordView from "../components/client/forgetpassword/ForgetPassword";
import Otp from "../components/client/forgetpassword/Otp";

/*
This view page is only for demo purpose
*/

const ExampleView = () => {

  return (
    <>
    {/* <ExampleComponent /> */}
    <HomePage />
    <ForgotPasswordView />
    <Otp />
    <ConfirmPassword />
    <ResetPassword />
    <CandidateTable />




  </>

  );

};

export default ExampleView;
