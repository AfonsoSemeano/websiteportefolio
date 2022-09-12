import { Container } from 'react-bootstrap';

function AboutMe() {
    return (
        <>
            <h1 id="aboutme" className='fw-semibold'>Sobre Mim</h1>
            <Container>
                <p>
                    Estou disposto a trabalhar como full-stack developer e também
                    em desenvolvimento de aplicações móveis/desktop.
                    Porém, também estou disposto a aprender línguas e frameworks novas.
                    Acredito que a faculdade não me ensinou línguas/frameworks novas,
                    mas ensinou-me como aprender essas ferramentas...
                    <br />
                    Ou seja, sou
                    muito capaz de aprender línguas e frameworks que desconheça,
                    e portanto sou muito adaptável a vários empregos pois aprendo
                    com rapidez o que é especificamente necessário para aquele trabalho.
                </p>
                <h3>Línguas que tenho conhecimentos:</h3>
                <ul>
                    <li>Python</li>
                    <li>Javascript</li>
                    <li>Java</li>
                    <li>SQL/NO-SQL</li>
                    <li>C</li>
                </ul>
                <br />
                <h3>Formações:</h3>
                <ul>
                    <li>Licenciatura em Engenharia Informática no Instituto Politécnico de Setúbal (IPS)</li>
                    <li>Curso de Python Udemy: The Python Mega Course: Build 10 Real World Applications</li>
                </ul>
                <br />

            </Container>
        </>
    );
}


export default AboutMe;