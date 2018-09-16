import React, {Component} from 'react';
import './Footer.css';
import FBLogo from '../images/icons/facebook.png';
import TwLogo from '../images/icons/twitter logo.png';
import InstaLogo from '../images/icons/instagram logo.jpg';

class Footer extends Component {
    toTop = (e) => {
        window.scrollTo(0,0)
    }
    render(){
        return(
            <footer className="footer">
                <div className="content">
                    <p>Stay connected</p>
                    <ul className="socialLinks">
                        <li className="link"><a href=""><img alt="facebook" src={FBLogo} height="32" width="32" /></a></li>
                        <li className="link"><a href=""><img alt="twitter" src={TwLogo} height="32" width="32" /></a></li>
                        <li className="link"><a href=""><img alt="instagram" src={InstaLogo} height="32" width="32" /></a></li>
                    </ul>
                    <p>&#169; Anti-Corruption Enforcement Agency</p>
                    <p onClick={this.toTop} className="topBTN">back to top</p>
                </div>
            </footer>
        );
    }
}

export default Footer;