import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { getComponentTranslation } from './translations';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function TopNavbar(props) {
  let { lang } = useParams();
  
  function translate(text) {
    return props.fullTranslation[text][lang];
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
                <Nav.Link href="#login" className='navbar-text'>{translate("login")}</Nav.Link>
                <div className="mx-1">/</div>
                <Nav.Link href="#register" className='navbar-text'>{translate("register")}</Nav.Link>
                <NavDropdown title={<span className='navbar-text'>{translate("language")}</span>} id="basic-nav-dropdown" className="ms-4 me-2">
                  <FlagItem flagSrc='portugal-icon-flag.png' flagChars='PT' />
                  <FlagItem flagSrc='england-icon-flag.png' flagChars='EN' />
                </NavDropdown>
              </Navbar.Collapse>
            </Navbar.Collapse>
          </Container>
        </Navbar>
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

export default TopNavbar;