import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import image1 from '../Assests/Images/Foodie Finds12.jpg';

function Navbar(props) {
    
    return (
        <div className="navbar">
            <div className='insideContainerNav'>
                <div className="nav1">
                    <img src={image1} className='navImage' alt=''/>
                    Foodie Finds
                </div>
                <div className="nav3">
                    <Link to={props.to} className="signUpButton">{props.content}</Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
