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

import { Footer } from "./component/Footer";
import AdminProfReg from "./component/Card/AdminProfReg";

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

                        <Route path="/homestudent" element={<HomeStudent />} />
                        <Route path="/homeprofessor" element={<HomeProfessor />} />
                        <Route path="/homeadmin" element={<HomeAdmin />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="*" element={<h1>Not found!</h1>} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<HomeACUA />} />
                        <Route path="/formstudent" element={<FormStudent />} />
                        <Route path="/infoprofessor" element={<InfoProfessor />} />
                        <Route path="/newcourse" element={<NewCourse />} />
                        <Route path="/newmodality" element={<NewModality />} />
                        <Route path="/electronicinvoice" element={<ElectronicInvoice />} />
                        <Route path="/formprofessor" element={<FormProfessor />} />
                        <Route path="/adminprofreg" element={<AdminProfReg />} />

                    </Routes>

                    <Footer />

                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
