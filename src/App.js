//import './App.css';
import './styles.scss';

import { Container } from 'react-bootstrap';
import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavbar from './navbar';
import AboutMe from './aboutme';
import MyProjects from './myprojects';
import Footer from './footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getAllTranslations, translationState } from './translations';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';


//TODO: Passar a chamada à BD para o início da App e passar a variável como uma prop?????
//Se a prop for um state, então pode funcionar pois ao obter a informaçao da BD, irá renderizar todos os elementos do site
//que têm a variável associada. O código ficará mais limpo, menos copypaste.

function Jumbotron(props) {
  let { lang } = useParams();
  
  function translate(text) {
    return props.fullTranslation[text][lang];
  }


  return (
    <div className='bg-secondary'>
      <Container id="home" className="py-5">
        <h1 className="display-5 fw-bold">{translate("hello")}!</h1>
        <p className="fs-4">{translate("welcome")}</p>
        <p className="fs-4">{translate("meetmeone")}<a href="#aboutme" className='text-grey'>{translate("aboutme")}</a>{translate("meetmetwo")}<a href="#myprojects" className='text-grey'>{translate("myprojects")}</a>.</p>
        <p className='fs-4'>{translate("createaccount")}</p>
      </Container>
    </div>
  );
}

function Divider() {
  return (
    <div className="border-top border-2 border-grey "></div>
  );
}

function MainApp() {
  let { lang } = useParams();

  const [translation, setTranslation] = useState(translationState);

  useEffect(() => {
    getAllTranslations(function(response) {
      setTranslation(response);
    });
  }, [lang]);

  useEffect(() => {
    const userIdEnc = Cookies.get("userid");
    let req = new XMLHttpRequest();
    req.responseType = "text";
    req.onload = function() {
      if (req.status !== 200) {
        const expiredTime = new Date(new Date().getTime() - 1);
        Cookies.set("userid", "", {expires: expiredTime});
      } else {
        
      }
    }
  }, []);

  function authenticateCookie(toggleDivs) {
    const userIdEnc = Cookies.get("userid");
    let req = new XMLHttpRequest();
    req.responseType = "text";
    req.onload = function() {
      if (req.status !== 200) {
        const expiredTime = new Date(new Date().getTime() - 1);
        Cookies.set("userid", "", {expires: expiredTime});
      } else {
        toggleDivs();
      }
    }
    req.open('POST', '/checkobjectid');
    req.send(userIdEnc);
  }

  return (
    <>
      <div id="top" />
      <TopNavbar authenticateCookie={authenticateCookie} fullTranslation={translation["navbar"]} loginRegisterTranslation={translation["login-registo"]}/>
      <Jumbotron title="Olá!" fullTranslation={translation["jumbotron"]}/>
      <Divider />
      <AboutMe fullTranslation={translation["aboutme"]}/>
      <Divider />
      <MyProjects fullTranslation={translation["myprojects"]}/>
      <Divider />
      <Footer fullTranslation={translation["footer"]}/>
    </>
  );
}


/*TODO: 
Passar a prop 'lang' no MainApp que trata da tradução de línguas.

OU

Buscar a lang ao URL e usá-la como string.
*/

function App() {
  return (
    <div style={{ backgroundColor: 'rgb(248, 249, 250)' }}>
      <Routes>
        <Route path="/:lang" element={<MainApp />} />
        <Route
          path="*" element={<Navigate to="/pt" replace/>} />
      </Routes>
    </div>
  );
}

export default App;
