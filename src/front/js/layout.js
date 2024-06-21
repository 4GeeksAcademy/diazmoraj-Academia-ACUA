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

import { InfoAdmin } from "./pages/InfoAdmin";
import { InfoProfessor } from "./pages/InfoProfessor";
import { InfoStudent } from "./pages/InfoStudent";

import { ProfessorPayment } from "./pages/ProfessorPayment";
import { StudentPayment } from "./pages/StudentPayment";

import { Course } from "./pages/Course";
import { ElectronicInvoice } from "./pages/ElectronicInvoice";
import { Modality } from "./pages/Modality";
import { NewCourse } from "./pages/NewCourse";
import injectContext from "./store/appContext";

import { Footer } from "./component/Footer";

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
                    {/* <NavbarStudent />
                    <NavbarProfessor /> */}
                    <NavbarAdmin />
                    <Routes>

                        {/* <Route path="/" element={<HomeStudent />} />
                        <Route path="/" element={<HomeProfessor />} /> */}
                        <Route path="/" element={<HomeAdmin />} />
                        {/* <Route element={<Login />} path="/Login"/>
                        <Route path="*" element={<h1>Not found!</h1>} />
                        <Route path="/homeacua" element={<HomeACUA />} /> */}

                        {/* <Route element={<NavbarACUA />} path="/NavbarACUA"/>
                        <Route element={<NavbarAdmin />} path="/NavbarAdmin"/>
                        <Route element={<NavbarProfessor />} path="/NavbarProfessor"/>
                        <Route element={<NavbarStudent />} path="/NavbarStudent"/>

                        <Route element={<SignUp />} path="/SigUp"/>

                        <Route element={<HomeACUA />} path="/"/>
                        <Route element={<HomeAdmin />} path="/"/>
                        <Route element={<HomeProfessor />} path="/"/>
                        <Route element={<HomeStudent />} path="/"/>

                        <Route element={<InfoAdmin />} path="/InfoAdmin"/>
                        <Route element={<InfoProfessor />} path="/InfoProfessor"/>
                        <Route element={<InfoStudent />} path="/InfoStudent"/>

                        <Route element={<ProfessorPayment />} path="/ProfessorPayment"/>
                        <Route element={<StudentPayment />} path="/StudentPayment"/>

                        <Route element={<Course />} path="/Course" />
                        <Route element={<ElectronicInvoice />} path="/ElectronicInvoice" />
                        <Route element={<Modality />} path="/Modality" />
                        <Route element={<NewCourse />} path="/NewCourse" />

                        <Route element={<h1>Not found!</h1>} />
                         */}
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
