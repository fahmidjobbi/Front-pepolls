import React from 'react';
import './Rights.css';
import { Link } from 'react-router-dom';

const Rights = (props) => {
  const { image, link } = props;

  return (
    <nav className="rights">
        
            <div class="footer-links">
                <ul>
                    <li><a href="https://about.pepolls.com/cookie-policy/">Cookies</a></li>
                    <li><a href="https://about.pepolls.com/privacy-policy/">Privacy</a></li>
                    <li><a href="https://about.pepolls.com/terms-and-conditions/">Terms</a></li>
                    <li><a href="https://about.pepolls.com/">More</a></li>
                </ul>
            </div>
            <div class="vc-column-inner wpb-wrraper"></div>
            <div className="image-container">
                <span>Copyright © 2023 PepollsTM. All rights reserved</span>
            </div>
            
        
        
    </nav>
    
    

  );
};

export default Rights;
