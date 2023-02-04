import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function AboutMe(props) {
    let { lang } = useParams();
  
    function translate(text) {
        return props.fullTranslation[text][lang];
    }

    return (
        <div className='bg-secondary'>
            <h1 id="aboutme" className='fw-semibold ms-2'>{translate("aboutme")}</h1>
            <Container >
                <p>
                    {translate("pone")}
                    <br />
                    {translate("ptwo")}
                </p>
                <h3>{translate("languages")}</h3>
                <ul>
                    <li>Python</li>
                    <li>Javascript</li>
                    <li>Java</li>
                    <li>SQL/NO-SQL</li>
                    <li>C</li>
                    <li>C#</li>
                </ul>
                <br />
                <h3>{translate("courses")}</h3>
                <ul>
                    <li>{translate("courseone")}</li>
                    <li>{translate("coursetwo")}</li>
                </ul>
                <br />

            </Container>
        </div>
    );
}


export default AboutMe;