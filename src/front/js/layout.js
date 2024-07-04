import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { NavbarACUA } from "./component/NavbarACUA";
import { NavbarAdmin } from "./pages/NavbarAdmin";
import { NavbarProfessor } from "./pages/NavbarProfessor";
import { NavbarStudent } from "./pages/NavbarStudent";

import Login from "./pages/Login"
import { SignUp } from "./pages/SignUp";

import HomeACUA from "./pages/HomeACUA";
import { HomeAdmin } from "./pages/HomeAdmin";
import { HomeProfessor } from "./pages/HomeProfessor";
import { HomeStudent } from "./pages/HomeStudent";
import HomeGeneral from "./pages/HomeGeneral";

import InfoAdmin from "./pages/InfoAdmin";
import InfoProfessor from "./pages/InfoProfessor";
import InfoStudent from "./pages/InfoStudent";

import { ProfessorPayment } from "./pages/ProfessorPayment";
import { StudentPayment } from "./pages/StudentPayment";

import { Course } from "./pages/Course";
import { ElectronicInvoice } from "./pages/ElectronicInvoice";
import { NewCourse } from "./pages/NewCourse";
import { NewModality } from "./pages/NewModality";
import injectContext from "./store/appContext";
import FormProfessor from "./pages/FormProfessor";
import FormStudent from "./pages/FormStudent";

import Undefined from "./pages/Undefined";

import { Footer } from "./component/Footer";

import AdminProfReg from "./pages/AdminProfReg";
import { Toaster } from "react-hot-toast";
import AdminStudReg from "./pages/AdminStudReg";
import ProtectedRoute from "./component/frontAuth/ProtectedRoute";
import Private from "./component/frontAuth/Private";




//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        {/* <ProtectedRoute path="/homestudent" requiredRole='student' element={<HomeStudent />} />
                        <ProtectedRoute path="/homeprofessor" requiredRole='professor' element={<HomeProfessor />} />
                        <ProtectedRoute path="/homeadmin" requiredRole='admin' element={<HomeAdmin />} /> */}
                        {/* <Route path="/homestudent" element={<ProtectedRoute requiredRole='student' children={<HomeStudent />} />} /> */}

                        {/* <Route path="/homestudent" requiredRole='student' element={<ProtectedRoute requiredRole='student' children={<HomeStudent />} />} />
                        <Route path="/homeprofessor" requiredRole='professor' element={<ProtectedRoute requiredRole='professor' children={<HomeProfessor />} />} />
                        <Route path="/homeadmin" requiredRole='admin' element={<ProtectedRoute requiredRole='admin' children={<HomeAdmin />} />} /> */}
                        <Route path="/homeprofessor" requiredRole='professor' element={<HomeProfessor />} />
                        <Route element={<Private role='admin' />} >
                            <Route path="/homeadmin" element={<HomeAdmin />} />
                            <Route path="/adminprofreg" element={<AdminProfReg />} />
                            <Route path="/adminstudreg" element={<AdminStudReg />} />
                            <Route path="/newcourse" element={<NewCourse />} />
                        </Route>
                        <Route element={<Private role='student' />} >
                            <Route path="/homestudent" element={<HomeStudent />} />
                            <Route path="/newcourse" element={<NewCourse />} />
                        </Route>
                        <Route element={<Private role='professor' />} >
                            <Route path="/homeprofessor" element={<HomeProfessor />} />
                        </Route>

                        <Route path="/homegeneral" element={<HomeGeneral />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<HomeACUA />} />
                        <Route path="/formstudent" element={<FormStudent />} />
                        <Route path="/infoprofessor" element={<InfoProfessor />} />
                        <Route path="/infoadmin" element={<InfoAdmin />} />
                        <Route path="/infostudent" element={<InfoStudent />} />
                        <Route path="/newmodality" element={<NewModality />} />
                        <Route path="/electronicinvoice" element={<ElectronicInvoice />} />
                        <Route path="/formprofessor" element={<FormProfessor />} />

                        <Route path="/undefined" element={<Undefined />} />
                        <Route path="*" element={<Undefined />} />
                    </Routes>
                    <Footer />

                </ScrollToTop>
            </BrowserRouter>
            <Toaster />
        </div >
    );
};

export default injectContext(Layout);
