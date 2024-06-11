import React from 'react';
import './Footer.css';
import { logoLight } from '../../../assets'
import { Language } from '@mui/icons-material'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__row">
        <button onClick={() => console.log(window.scrollTo(0, 0))}>Back to top</button>
      </div>

      <div className="footer__row">
        <div className="footer__column">
          <h3 className="footer__title">Get to Know Us</h3>
          <ul>
            <li>
              <a className="footer__link" href="#a">About Us</a>
            </li>
            <li>
              <a className="footer__link" href="#a">Careers</a>
            </li>
            <li>
              <a className="footer__link" href="#a">Press Releases</a>
            </li>
            <li>
              <a className="footer__link" href="#a">Amazone Science</a>
            </li>
          </ul>
        </div>

        <div className="footer__column">
          <h3 className="footer__title">Connect with Us</h3>
          <ul>
            <li>
              <a className="footer__link" href="#a">Facebook</a>
            </li>
            <li>
              <a className="footer__link" href="#a">Twitter</a>
            </li>
            <li>
              <a className="footer__link" href="#a">Instagram</a>
            </li>
          </ul>
        </div>

        <div className="footer__column">
          <h3 className="footer__title">Make Money with Us</h3>
          <ul>
            <li>
              <a className="footer__link" href="#a">Sell on Amazone</a>
            </li>
            <li>
              <a className="footer__link" href="#a">Sell under Amazone Accelerator</a>
            </li>
            <li>
              <a className="footer__link" href="#a">Protect and Build Your Brand</a>
            </li>
            <li>
              <a className="footer__link" href="#a">Amazone Global Selling</a>
            </li>
            <li>
              <a className="footer__link" href="#a">Become an Affiliate</a>
            </li>
            <li>
              <a className="footer__link" href="#a">Fulfilment by Amazone</a>
            </li>
            <li>
              <a className="footer__link" href="#a">Advertise Your Products</a>
            </li>
            <li>
              <a className="footer__link" href="#a">Amazone Pay on Merchants</a>
            </li>
          </ul>
        </div>

        <div className="footer__column">
          <h3 className="footer__title">Let Us Help You</h3>
          <ul>
            <li>
              <a className="footer__link" href="#a">COVID-19 and Amazon</a>
            </li>
            <li>
              <a className="footer__link" href="#a">Your Account</a>
            </li>
            <li>
              <a className="footer__link" href="#a">Returns Centre</a>
            </li>
            <li>
              <a className="footer__link" href="#a">100% Purchase Protection</a>
            </li>
            <li>
              <a className="footer__link" href="#a">Amazone App Download</a>
            </li>
            <li>
              <a className="footer__link" href="#a">Help</a>
            </li>
          </ul>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #3a4553' }}></div>

      <div className="footer__row">
        <div className="footer__sub-row">
          <div className="footer__column">
            <img className="footer__logo" src={logoLight} alt="Amazone Logo" />
          </div>
          <div className="footer__column flex__center">
            <Language />
            <div className='footer__language-select'>
              <p>English</p>
              <ul>
                <li><input defaultChecked type='radio' /> English - EN</li>
                <li><input type='radio' /> हिन्दी - HI</li>
                <li><input type='radio' /> मराठी - MR</li>
                <li><input type='radio' /> தமிழ் - TA</li>
                <li><input type='radio' /> తెలుగు - TE</li>
                <li><input type='radio' /> ಕನ್ನಡ - KN</li>
                <li><input type='radio' /> മലയാളം - ML</li>
                <li><input type='radio' /> বাংলা - BN</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__sub-row" style={{ padding: '0 17rem' }}>
          <a className="footer__country-link" href="#a">Australia</a>
          <a className="footer__country-link" href="#a">Brazil</a>
          <a className="footer__country-link" href="#a">Canada</a>
          <a className="footer__country-link" href="#a">China</a>
          <a className="footer__country-link" href="#a">France</a>
          <a className="footer__country-link" href="#a">Germany</a>
          <a className="footer__country-link" href="#a">Italy</a>
          <a className="footer__country-link" href="#a">Japan</a>
          <a className="footer__country-link" href="#a">Mexico</a>
          <a className="footer__country-link" href="#a">Neitherlands</a>
          <a className="footer__country-link" href="#a">Poland</a>
          <a className="footer__country-link" href="#a">Singapore</a>
          <a className="footer__country-link" href="#a">Spain</a>
          <a className="footer__country-link" href="#a">Turkey</a>
          <a className="footer__country-link" href="#a">United Arab Emirates</a>
          <a className="footer__country-link" href="#a">United Kingdoms</a>
          <a className="footer__country-link" href="#a">United States</a>
        </div>
      </div>

      <div className="footer__row">
        <div className="footer__sub-row">
          <table>
            <tbody>
              <tr>

                <td>
                  <a href="#a">
                    AbeBooks
                    <br />
                    <span>
                      Books, arts
                      <br />
                      & collectibles
                    </span>
                  </a>
                </td>
                <td>
                  <a href="#a">
                    Amazone Web Services
                    <br />
                    <span>
                      Scalable Cloud
                      <br />
                      Computing Services
                    </span>
                  </a>
                </td>
                <td>
                  <a href="#a">
                    Audible
                    <br />
                    <span>
                      Download
                      <br />
                      Audible Books
                    </span>
                  </a>
                </td>
                <td>
                  <a href="#a">
                    DPReview
                    <br />
                    <span>
                      Digital
                      <br />
                      Photography
                    </span>
                  </a>
                </td>
                <td>
                  <a href="#a">
                    IMDb
                    <br />
                    <span>
                      Movies, TV
                      <br />
                      & Celebrities
                    </span>
                  </a>
                </td>

                {/* <td></td> */}
              </tr>

              <tr>
                <td>&nbsp;</td>
              </tr>

              <tr>
                <td>
                  <a href="#a">
                    Shopbop
                    <br />
                    <span>
                      Designer
                      <br />
                      Fashion Brands
                    </span>
                  </a>
                </td>
                <td>
                  <a href="#a">
                    Amazone Business
                    <br />
                    <span>
                      Everything For
                      <br />
                      Your Business
                    </span>
                  </a>
                </td>
                <td>
                  <a href="#a">
                    Prime Now
                    <br />
                    <span>
                      2-Hour Delivery
                      <br />
                      on Everyday Items
                    </span>
                  </a>
                </td>
                <td>
                  <a href="#a">
                    Amazone Prime Music 
                    <br />
                    <span>
                      100 milion songs, ad-free
                      <br />
                      Over 15 million podcast episodes
                    </span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="footer__sub-row">
          <div className="footer__column">
            <a className="footer__link" href="#a">Conditions of Use & Sale</a>
            <a className="footer__link" href="#a">Privacy Notice</a>
            <a className="footer__link" href="#a">Interest-Based Ads</a>
          </div>
          <p>&copy; 1996-2024, Amazone.in, Inc. or its affiliates</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
