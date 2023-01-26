import React from 'react'
import './footer.css'

const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <footer>

            <div className='footer_container'>

                <div className='footer_details_one'>
                    <h3>Get to know us</h3>
                    <p>About us</p>
                    <p>Careers</p>
                    <p>Press releases</p>
                    <p>Amazon cares</p>
                </div>
                <div className='footer_details_one'>
                    <h3>Connect with us</h3>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>Instagram</p>
                </div>
                <div className='footer_details_one forres'>
                    <h3>Make Money with us</h3>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>Instagram</p>
                </div>
                <div className='footer_details_one forres'>
                    <h3>Connect with us</h3>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>Instagram</p>
                </div>

            </div>

            <div className='lastdetails'>

                <img src='./amazon_PNG25.png' alt='amazon logo' />
                <p>
                    Conditions of Use & Sale        &nbsp;&nbsp;&nbsp;&nbsp;
                    Privacy Notice                  &nbsp; &nbsp;&nbsp;&nbsp;
                    Interest-Based Ads              &nbsp;&nbsp;&nbsp;&nbsp;
                    &copy; 1996-{year}, Amazon.com, Inc. or its affiliates
                </p>

            </div>

        </footer>
    )
}

export default Footer