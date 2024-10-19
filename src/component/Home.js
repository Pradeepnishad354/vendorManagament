import React from "react";
import image from "../Images/vendor.webp"; 




const HomePage = () => {
    return (
        <>
    
            <h1 style={{ display: "none" }}>Home Page</h1>
            <img src={image} alt="Full screen view" className="full-screen-image" />
        </>
    );
};

export default HomePage;
