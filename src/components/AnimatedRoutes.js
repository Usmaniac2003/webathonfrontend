import React from "react";
import Home from "../Pages/Home";
import About from "../Pages/About";
import SignIn from "../Pages/SignIn";
import StudentSignup from "../Pages/StudentSignup";
import TeacherSignup from "../Pages/TeacherSignup";
import Help from "../Pages/Help";
import { AnimatePresence } from "../../node_modules/framer-motion/dist/framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AddCoursePage from "../Pages/AddCoursePage";
import Courses from "../Pages/Course";
import EnrollPayment from "./Payment/EnrollPayment";
import CourseContent from "./CourseContent/CourseContent";
import CourseUploadPage from "../Pages/CourseUploadPage";
import ProfilePage from '../Pages/ProfilePage';
import AccountEditPage from "../Pages/AccountEditPage";
import AddQuizPage from '../Pages/AddQuizPage';
import StudentQuizPage from '../Pages/StudentQuizPage';
import EmailSendingFormPage from "../Pages/EmailSendingPage";
import ResultsPage from "../Pages/ResultPage";
import CourseDetailsPage from "../Pages/CourseDetailsPage";
import ForgotPasswordPage from "../Pages/ForgotPasswordPage";
import ResetPasswordPage from "../Pages/ResetPasswordPage";
import NotFoundPage from "../Pages/NotFound";
import EditCoursePage from "../Pages/EditCoursePage";
import GroupChat from "../Pages/GroupChat";
import BankingAI from "../Pages/AIChat";


const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route  path="/" element={<Home/>} />
        <Route path='/courses' element={<Courses/>}/>
        <Route  path="/about" element={<About />} />
        <Route  path='/help' element={<Help/>} />
        <Route  path="/signin" element={<SignIn />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
        <Route path='/reset-password/:token' element={<ResetPasswordPage/>}/>
        <Route  path="/signup" element={<StudentSignup />} />
        <Route  path="/gc" element={<GroupChat/>} />
        <Route  path="/tsignup" element={<TeacherSignup />} />
        <Route path ='/courseDetails/:id' element={<CourseDetailsPage/>}/>
        <Route path='/enroll/:cid' element={<EnrollPayment/>}/>
        <Route path='/results' element={<ResultsPage/>}/>
        <Route path='/ai' element={<BankingAI/>}/>
        <Route path='/AddCourse' element={<ProtectedRoute><AddCoursePage/></ProtectedRoute>} />
        <Route path='/courseContent/:id' element={<ProtectedRoute><CourseContent/></ProtectedRoute>}/>
        <Route path='/course/upload/:id' element={<ProtectedRoute><CourseUploadPage/></ProtectedRoute>} />
        <Route path='/course/edit/:id' element={<ProtectedRoute><EditCoursePage/></ProtectedRoute>} />
        <Route path='/course/addquiz/:id' element={<ProtectedRoute><AddQuizPage/></ProtectedRoute>}/>
        <Route path='/profile' element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
        <Route path='/student/quiz/:id' element={<ProtectedRoute><StudentQuizPage/></ProtectedRoute>} />
        <Route path='/profile/editaccount' element={<ProtectedRoute><AccountEditPage/></ProtectedRoute>}/>
        <Route path='/send-mail' element={<ProtectedRoute><EmailSendingFormPage/></ProtectedRoute>}/>
        <Route path='/admin/add-course' element={<ProtectedRoute><AddCoursePage/></ProtectedRoute>}/>
        <Route path="*" element={<NotFoundPage />} />  
      </Routes>
    </AnimatePresence>
  );
};
export default AnimatedRoutes;
