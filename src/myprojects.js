import { Container, Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function MyProjects(props) {
    let { lang } = useParams();
  
    function translate(text) {
        return props.fullTranslation[text][lang];
    }

    return (
        <Container fluid>
            <h1 id="myprojects" className='fw-semibold'>{translate("myprojects")}</h1>
            <p className='fs-5 ms-5'>{translate("selectproject")}</p>
            <Container>
                <ProjectCard id="portefoliowebsite" projectKey="portefolio" fullTranslation={props.fullTranslation} />
            </Container>
        </Container>
    );
}

function ProjectCard(props) {
    let { lang } = useParams();

    function translate(text) {
        return props.fullTranslation[props.projectKey][text][lang];
    }

    function translateButton(text) {
        return props.fullTranslation[text][lang];
    }

    function getImageURL() {
        return props.fullTranslation[props.projectKey]["imgurl"];
    }

    return (
        <Card id={props.id} style={{ width: '24rem' }}>
            <Card.Img variant="top" src={getImageURL()} />
            <Card.Body>
                <Card.Title>{translate("title")}</Card.Title>
                <Card.Text>
                    {translate("desc")}
                </Card.Text>
                <div className="d-flex justify-content-center flex-wrap">
                    <Button variant="primary me-3">{translateButton("openproject")}</Button>
                    <Button variant="primary">{translateButton("reportbugs")}</Button>
                    <Button variant="primary mt-2">{translateButton("givefeedback")}</Button>
                </div>
            </Card.Body>
        </Card>
    );
}


export default MyProjects;