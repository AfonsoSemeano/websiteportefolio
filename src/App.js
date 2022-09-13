import './App.css';
import { Container } from 'react-bootstrap';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavbar from './navbar';
import AboutMe from './aboutme';
import MyProjects from './myprojects';
import Footer from './footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getAllTranslations, getComponentTranslation, translationState } from './translations';
import { useEffect, useState } from 'react';

//TODO: Passar a chamada à BD para o início da App e passar a variável como uma prop?????
//Se a prop for um state, então pode funcionar pois ao obter a informaçao da BD, irá renderizar todos os elementos do site
//que têm a variável associada. O código ficará mais limpo, menos copypaste.

function Jumbotron(props) {
  let { lang } = useParams();
  
  function translate(text) {
    return props.fullTranslation[text][lang];
  }


  return (
    <Container id="home" className="py-5">
      <h1 className="display-5 fw-bold">{props.title}</h1>
      <p className="fs-4">{translate("welcome")}</p>
      <p className="fs-4">{translate("meetmeone")}<a href="#aboutme">{translate("aboutme")}</a>{translate("meetmetwo")}<a href="#myprojects">{translate("myprojects")}</a>.</p>
      <p className='fs-4'>{translate("createaccount")}</p>
    </Container>
  );
}

function Divider() {
  return (
    <div className="border-top"></div>
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

  return (
    <>
      <TopNavbar fullTranslation={translation["navbar"]}/>
      <Jumbotron title="Olá!" fullTranslation={translation["jumbotron"]}/>
      <Divider />
      <AboutMe fullTranslation={translation["aboutme"]}/>
      <Divider />
      <MyProjects />
      <Divider />
      <Footer />
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
