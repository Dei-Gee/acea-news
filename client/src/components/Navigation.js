import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
    return(
        <div className="navbar">
            <div className="navlinks">
                <NavLink className="links" to="/">Home</NavLink>
                <NavLink className="links" to="/about">About</NavLink>
                <NavLink className="links" to="/contact">Contact</NavLink>
                <NavLink className="links" to="/faq">FAQs</NavLink>
                <NavLink className="links" to="/stories/page/:page_number">Stories</NavLink>
            </div>
        </div>
    );

}

export default Navigation;