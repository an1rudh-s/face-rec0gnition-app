import React from "react";
import Tilty from 'react-tilty';
import './Logo.css';
import sharingan from './sharingan.png'

const Logo = () => {
    return(
        <div className="ma4 mt0">
            <Tilty style={{ height: '150px', width: '150px' }} max='40' className="br2 shadow-2 tilt">
                <img src={sharingan} alt="logo" className="pa3 rotateMe"/>
            </Tilty>
        </div>
    );
}

export default Logo;