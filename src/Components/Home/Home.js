import React, { useContext, useState } from 'react';
import { Context } from '../../App';
import Header from '../Header/Header';
import TravelSection from '../TravelSection/TravelSection';
import './Home.css';

const Home = () => {
    const [showPlace] = useContext(Context)

    return (
        <div>
            <div className="home-container" style={{
                    backgroundImage: `url(${showPlace.img})`,
                    height:"100vh",
                    backgroundSize:"cover",
                    backgroundPosition:"center",
                    width:"100vw"
                 }}>

            <Header color="black"></Header>
            <TravelSection></TravelSection>

            </div>
        </div>
    );
};

export default Home;