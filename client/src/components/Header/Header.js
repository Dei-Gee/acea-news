import React from 'react';
import BannerImage from '../images/banner2.jpg';
import './Header.css';

const Header = () => {
    return(
        <header className="header-img-container">
            <img alt="pix" src={BannerImage} height="200" width="300" className="header-img" />
        </header>
    );
}

export default Header;