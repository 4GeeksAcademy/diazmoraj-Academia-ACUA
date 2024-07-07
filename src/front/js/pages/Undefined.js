import React from "react";
import { MultiButton } from "../component/MultiButton";

const Undefined = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <img 
                src="https://i.postimg.cc/4yPFrm5v/Section-SVG.png"
                alt="error image" 
                style={{ maxWidth: '100%', marginBottom: '3rem' }}
            />
             <div className="mb-4">
            <h1>¡Disculpa! Esta página no está disponible</h1></div>
            <MultiButton color="purple" text="Vuelve al inicio →" width="400" link="/" />

        </div>
    );
};

export default Undefined;
