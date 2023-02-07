import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { LoginBox, RegisterBox } from './forms';


function TopNavbar(props) {
  let { lang } = useParams();

  const [showLoginBox, setShowLoginBox] = useState(false);
  const [showRegisterBox, setShowRegisterBox] = useState(false);

  useEffect(() => {
    props.authenticateCookie();
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

  function closeBoxes() {
    setShowLoginBox(false);
    setShowRegisterBox(false);
  }

    return (
      <>
        <Navbar bg="primary" expand="lg" sticky="top" className="border-bottom border-primary navbar-text-color shadow-sm">
          <Container fluid>
            <Navbar.Brand href={"/home/" + lang} className='navbar-text-color fw-semibold'>Afonso Semeano</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className='text-white'/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto ">
                <div className='d-flex flex-row'>
                  <Nav.Link href={"/home/" + lang} className='navbar-text-color fw-semibold'>{translate("home")}</Nav.Link>
                  <Nav.Link href={"/aboutme/" + lang} className='mx-2 navbar-text-color fw-semibold'>{translate("aboutme")}</Nav.Link>
                  <div className='d-flex flex-row'>
                    <Nav.Link href={"/myprojects/" + lang} className='navbar-text-color fw-semibold'>{translate("myprojects")}</Nav.Link>
                    <Dropdown className='closer-arrow'>
                      <Dropdown.Toggle variant='dark' className='transparent-bg border-0 hover-background-dropdown mt-1'></Dropdown.Toggle>
                      <Dropdown.Menu id="nav-dropdown" className='bg-primary'>
                        <NavDropdown.Item href={`/myprojects/${lang}#portefoliowebsite`} className='navbar-text-color fw-semibold'>{translate("portefoliowebsite")}</NavDropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </Nav>
              <Navbar.Collapse className='justify-content-end'>
                <img src="../loading-gif.gif" alt="img" width="30" height="30" className={'me-3 ' + (props.userWasFetched === "unknown" ? '' : 'd-none')}/>
                <div className={'d-flex flex-row align-items-center ' + (props.userWasFetched === "unknown" ? 'd-none': (props.userWasFetched === "false" ? '' : 'd-none'))}>
                  <Nav.Link href="#" className='navbar-text navbar-text-color fw-semibold ' onClick={() => {toggleLoginBox()}}>{translate("login")}</Nav.Link>
                  <div className="mx-1">/</div>
                  <Nav.Link href="#" className='navbar-text navbar-text-color fw-semibold ' onClick={() => {toggleRegisterBox()}}>{translate("register")}</Nav.Link>
                </div>
                <div className={'d-flex flex-row align-items-center ' + (props.userWasFetched === "unknown" ? 'd-none': (props.userWasFetched === "true" ? '' : 'd-none'))}>
                  <div href="#" className='me-3'>{translate("hello")} {props.username}!</div>
                  <Nav.Link href="#" className='navbar-text navbar-text-color fw-semibold' onClick={() => { Cookies.remove('userid'); window.location.reload();}}>{translate("logout")}</Nav.Link>
                </div>
                <LanguageDropdown languageText={translate("language")}>
                  <FlagItem flagSrc='../portugal-icon-flag.png' flagChars='PT' className='mt-2'/>
                  <FlagItem flagSrc='../england-icon-flag.png' flagChars='EN' className='mb-2'/>
                </LanguageDropdown>
              </Navbar.Collapse>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <LoginBox id="login-register" authenticateCookie={props.authenticateCookie} closeBoxes={closeBoxes} show={showLoginBox} fullTranslation={props.loginRegisterTranslation}/>
        <RegisterBox show={showRegisterBox} authenticateCookie={props.authenticateCookie} closeBoxes={closeBoxes} fullTranslation={props.loginRegisterTranslation}/>
      </>
    );
  }
  
  function FlagItem(props) {
    return (
      <NavDropdown.Item href={props.flagChars.toLowerCase()} className={`d-flex flex-row align-items-center ${props.className}`}>
        <img src={props.flagSrc} alt="img" width="30" height="30" />
        <div className='ms-1 fw-bold'>{props.flagChars}</div>
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
      <div className="dropdown">
        <div className="dropbtn navbar-text navbar-text-color fw-semibold" onClick={() => toggleDropdown()}>{props.languageText}</div>
        <div className={"dropdown-content bg-primary rounded border border-grey " + (dropdownOn ? "d-block" : "d-none")}>
          {props.children}
        </div>
      </div>
    );
  }

  function scrollToId(id) {
    document.getElementById(id).scrollIntoView(true);
  }

export default TopNavbar;