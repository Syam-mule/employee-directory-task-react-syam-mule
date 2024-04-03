import React from 'react';
import saketa from '../../resources/images/saketa.jpg'
import profile from '../../resources/images/profile.jpg'
import './Header.css'

class Header extends React.Component{
  render() {
    return (
       <div className="container">
        <header>
          <nav className="navbar navbar-expand-lg navbar-light mt-3">
            <div className="container-fluid">
              <a className="navbar-brand">
                <img className="brandicon" src={saketa} alt="seketa" />
              </a>
              <button className="navbar-toggler" type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-lg-0 ">
                  <li className="navbar-brand">
                    <p className="empdir">Employee Directory</p>
                    <p className="text-secondary ultimate">The Ultimate People Directory Experience</p>
                  </li>
                </ul>
                <form className="d-flex">
                  <p className="welcome">
                    Welcome,<span className="text-secondary me-3">Syam Prasanna Kumar</span>
                  </p>
                  <img className="userimage"  src={profile} alt="profile" />
                </form>
              </div>
            </div>
          </nav>
        </header>
        <hr className="mt-2 hr"/>
      </div>
    );
  }
}

export default Header;
