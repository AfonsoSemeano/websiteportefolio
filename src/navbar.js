import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { LoginBox, RegisterBox } from './forms';


function TopNavbar(props) {
  let { lang } = useParams();

  const [showLoginBox, setShowLoginBox] = useState(false);
  const [showRegisterBox, setShowRegisterBox] = useState(false);
  const [showUserDiv, setShowUserDiv] = useState(false);

  useEffect(() => {
    props.authenticateCookie(toggleUserDiv);
  }, []);
  
  function translate(text) {
    return props.fullTranslation[text][lang];
  }

  function toggleLoginBox() {
    setShowRegisterBox(false);
    setShowLoginBox(showLoginBox => !showLoginBox);
  }

  function toggleRegisterBox() {
    setShowLoginBox(false);
    setShowRegisterBox(showRegisterBox => !showRegisterBox);
  }

  function toggleUserDiv() {
    setShowUserDiv(showUserDiv => !showUserDiv);
    setShowLoginBox(false);
    setShowRegisterBox(false);
  }

    return (
      <>
        <Navbar bg="primary" expand="lg" sticky="top" className="border-bottom border-primary navbar-text-color shadow-sm">
          <Container fluid>
            <Navbar.Brand href="#home" className='navbar-text-color fw-semibold'>Afonso Semeano</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className='text-white'/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto ">
                <div className='d-flex flex-row'>
                  <Nav.Link href="#home" className='navbar-text-color fw-semibold'>{translate("home")}</Nav.Link>
                  <Nav.Link href="#aboutme" className='mx-2 navbar-text-color fw-semibold'>{translate("aboutme")}</Nav.Link>
                  <div className='d-flex flex-row'>
                    <Nav.Link href="#myprojects" className='navbar-text-color fw-semibold'>{translate("myprojects")}</Nav.Link>
                    <Dropdown className='closer-arrow'>
                      <Dropdown.Toggle variant='' className='transparent-bg border-0 hover-background-dropdown mt-1'></Dropdown.Toggle>
                      <Dropdown.Menu id="nav-dropdown" className='bg-primary'>
                        <NavDropdown.Item href="#portefoliowebsite" className='fw-semibold'>{translate("portefoliowebsite")}</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2" className='fw-semibold'>2nd Project</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3" className='fw-semibold'>3rd Project</NavDropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </Nav>
              <Navbar.Collapse className='justify-content-end'>
                <div className={'d-flex flex-row align-items-center ' + (showUserDiv ? 'd-none': '')}>
                  <Nav.Link href="#" className='navbar-text navbar-text-color fw-semibold ' onClick={() => {toggleLoginBox()}}>{translate("login")}</Nav.Link>
                  <div className="mx-1">/</div>
                  <Nav.Link href="#" className='navbar-text navbar-text-color fw-semibold ' onClick={() => {toggleRegisterBox()}}>{translate("register")}</Nav.Link>
                </div>
                <div className={'d-flex flex-row align-items-center ' + (showUserDiv ? '': 'd-none')}>
                  <Nav.Link href="#" className='me-3'>Hello, UserLogged!</Nav.Link>
                  <Nav.Link href="#" className='navbar-text' onClick={() => { Cookies.remove('userid'); toggleUserDiv();}}>Log out</Nav.Link>
                </div>
                <LanguageDropdown languageText={translate("language")}>
                  <FlagItem flagSrc='portugal-icon-flag.png' flagChars='PT' className='mt-2'/>
                  <FlagItem flagSrc='england-icon-flag.png' flagChars='EN' className='mb-2'/>
                </LanguageDropdown>
              </Navbar.Collapse>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <LoginBox id="login-register" toggleUserDiv={toggleUserDiv} show={showLoginBox} fullTranslation={props.loginRegisterTranslation}/>
        <RegisterBox show={showRegisterBox} toggleUserDiv={toggleUserDiv} fullTranslation={props.loginRegisterTranslation}/>
      </>
    );
  }
  
  function FlagItem(props) {
    return (
      <NavDropdown.Item href={props.flagChars.toLowerCase()} className={`d-flex flex-row align-items-center ${props.className}`}>
        <img src={props.flagSrc} alt="img" width="30" height="30" />
        <div className='ms-1 text-white fw-bold'>{props.flagChars}</div>
      </NavDropdown.Item>
    );
  }

  function LanguageDropdown(props) {
    const [dropdownOn, setDropdownOn] = useState(false);

    function toggleDropdown() {
      console.log("Toggled: " + dropdownOn);
      setDropdownOn(dropdownOn => !dropdownOn);
    }

    return (
      <div class="dropdown">
        <div class="dropbtn navbar-text navbar-text-color fw-semibold" onClick={() => toggleDropdown()}>{props.languageText}</div>
        <div class={"dropdown-content bg-primary rounded border border-grey " + (dropdownOn ? "d-block" : "d-none")}>
          {props.children}
        </div>
      </div>
    );
  }

  function scrollToId(id) {
    document.getElementById(id).scrollIntoView(true);
  }

export default TopNavbar;