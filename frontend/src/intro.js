import React from 'react';
import { useNavigate } from 'react-router-dom';
import './intro.css'; 

const Intro = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/login');
    };

    return (
        <div className="homepage-container">
            <div className="content">
                <h1>Platformă web de e-learning pentru electronică</h1>
                <p>Pășește în viitorul tehnologiei: începe aventura ta în lumea electronicii cu platforma noastră de e-learning, unde fiecare click deschide noi orizonturi ale cunoașterii!</p>
                <div className="homepage-button-wrapper">
                    <button className="homepage-button" onClick={handleButtonClick}>Descoperă Lumea Electronicii</button>
                </div>
            </div>
        </div>
    );
};

export default Intro;
