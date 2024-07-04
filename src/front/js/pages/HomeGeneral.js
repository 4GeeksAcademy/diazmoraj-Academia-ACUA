import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomeGeneral = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem("user_type");
    if (userType === "student") {
      navigate("/HomeStudent");
    } else if (userType === "professor") {
      navigate("/HomeProfessor");
    } else if (userType === "admin") {
      navigate("/homeadmin");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Redirigiendo...</h1>
    </div>
  );
};

export default HomeGeneral;
