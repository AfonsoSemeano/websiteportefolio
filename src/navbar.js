import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
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
        <Navbar bg="light" expand="lg" sticky="top" className="border-bottom">
          <Container fluid>
            <Navbar.Brand href="#home">Afonso Semeano</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto ">
                <div className='d-flex flex-row'>
                  <Nav.Link href="#home" className='border'>{translate("home")}</Nav.Link>
                  <Nav.Link href="#aboutme" className='border mx-2'>{translate("aboutme")}</Nav.Link>
                  <div className='d-flex flex-row border'>
                    <Nav.Link href="#myprojects">{translate("myprojects")}</Nav.Link>
                    <NavDropdown id="basic-nav-dropdown">
                      <NavDropdown.Item href="#portefoliowebsite">{translate("portefoliowebsite")}</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">2nd Project</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">3rd Project</NavDropdown.Item>
                    </NavDropdown>
                  </div>
                </div>
              </Nav>
              <Navbar.Collapse className='justify-content-end'>
                <div className={'d-flex flex-row align-items-center ' + (showUserDiv ? 'd-none': '')}>
                  <Nav.Link href="#" className='navbar-text' onClick={() => {scrollToId('top'); toggleLoginBox()}}>{translate("login")}</Nav.Link>
                  <div className="mx-1">/</div>
                  <Nav.Link href="#" className='navbar-text' onClick={() => {scrollToId('top'); toggleRegisterBox()}}>{translate("register")}</Nav.Link>
                </div>
                <div className={'d-flex flex-row align-items-center ' + (showUserDiv ? '': 'd-none')}>
                  <Nav.Link href="#" className='me-3'>Hello, UserLogged!</Nav.Link>
                  <Nav.Link href="#" className='navbar-text' onClick={() => { Cookies.remove('userid'); toggleUserDiv();}}>Log out</Nav.Link>
                </div>
                <NavDropdown title={<span className='navbar-text'>{translate("language")}</span>} id="basic-nav-dropdown" className="ms-4 me-2">
                  <FlagItem flagSrc='portugal-icon-flag.png' flagChars='PT' />
                  <FlagItem flagSrc='england-icon-flag.png' flagChars='EN' />
                </NavDropdown>
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
      <NavDropdown.Item href={props.flagChars.toLowerCase()} className="d-flex flex-row align-items-center">
        <img src={props.flagSrc} alt="img" width="30" height="30" />
        <div className='ms-1'>{props.flagChars}</div>
      </NavDropdown.Item>
    );
  }

  function scrollToId(id) {
    document.getElementById(id).scrollIntoView(true);
  }

export default TopNavbar;