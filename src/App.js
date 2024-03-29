//import './App.css';
import './styles.scss';

import { Container } from 'react-bootstrap';
import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavbar from './navbar';
import AboutMe from './aboutme';
import MyProjects from './myprojects';
import Footer from './footer';
import { Routes, Route, Navigate, Outlet, useOutletContext } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getAllTranslations, translationState } from './translations';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import NoPage from './nopage';
import PortfolioWebsite from './portfoliowebsite';

const allLanguages = ["pt", "en"];


//TODO: Passar a chamada à BD para o início da App e passar a variável como uma prop?????
//Se a prop for um state, então pode funcionar pois ao obter a informaçao da BD, irá renderizar todos os elementos do site
//que têm a variável associada. O código ficará mais limpo, menos copypaste.

function Jumbotron(props) {
  let { lang } = useParams();
  
  function translate(text) {
    return props.fullTranslation[text][lang];
  }


  return (
    <div className='bg-secondary content'>
      <Container id="home" className="py-5">
        <h1 className="display-5 fw-bold">{translate("hello")}!</h1>
        <p className="fs-4">{translate("welcome")}</p>
        <p className="fs-4">{translate("meetmeone")}<a href={"/aboutme/" + lang} className='text-grey'>{translate("aboutme")}</a>{translate("meetmetwo")}<a href={"/myprojects/" + lang} className='text-grey'>{translate("myprojects")}</a>.</p>
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
  const [userWasFetched, setUserWasFetched] = useState("unknown");
  const [username, setUsername] = useState(undefined);

  const [translation, setTranslation] = useState(translationState);

  useEffect(() => {
    getAllTranslations(function(response) {
      setTranslation(response);
    });
  }, [lang]);

  function authenticateCookie() {
    setUserWasFetched("unknown");
    const userIdEnc = Cookies.get("userid");
    let req = new XMLHttpRequest();
    req.responseType = "text";
    req.onload = function() {
      if (req.status !== 200) {
        const expiredTime = new Date(new Date().getTime() - 1);
        Cookies.set("userid", "", {expires: expiredTime});
        setUserWasFetched("false");
      } else {
        setUserWasFetched("true");
        setUsername(req.response);
      }
    }
    req.open('POST', '/checkobjectid');
    req.send(userIdEnc);
  }

  return (
    <>
      <div id="top" />
      <TopNavbar authenticateCookie={authenticateCookie} username={username} userWasFetched={userWasFetched} fullTranslation={translation["navbar"]} loginRegisterTranslation={translation["login-registo"]}/>
      
      <Outlet context={[translation, setTranslation]}/>

      <Footer fullTranslation={translation["footer"]}/>
    </>
  );
}


function App() {
  
  return (
    <div style={{ backgroundColor: 'rgb(248, 249, 250)' }}>
      <Routes>
        <Route path="/" element={<MainApp />}>
          <Route index element={<Navigate to="/home/pt" replace/>} />
          <Route path="/:page/:lang" element={<ValidateFullRoute />} />
          <Route path="*" element={<Navigate to="/nopage/en" replace/>} />
        </Route>
      </Routes>
    </div>
  );
}

function ValidateFullRoute() {
  let {lang} = useParams();
  let {page} = useParams();

  let [translation, setTranslation] = useOutletContext();

  for (const language of allLanguages) {
    if (lang === language) {
      switch (page) {
        case "home":
          return <Jumbotron title="Olá!" fullTranslation={translation["jumbotron"]}/>;
        case "aboutme":
          return <AboutMe fullTranslation={translation["aboutme"]}/>;
        case "myprojects":
          return <MyProjects fullTranslation={translation["myprojects"]}/>;
        case "portfoliowebsite":
          return <PortfolioWebsite fullTranslation={translation["portfoliowebsite"]}/>;
        case "nopage":
          return <NoPage fullTranslation={translation["nopage"]}/>;
        default:
          break;
      }
      return <NoPage fullTranslation={translation["nopage"]}/>;
    }
  } 
  return <Navigate to="/nopage/en" replace/>;
}

export default App;
