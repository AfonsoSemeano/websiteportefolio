import { Container, Button, Card } from 'react-bootstrap';

function MyProjects() {
    return (
        <Container fluid>
            <h1 id="myprojects" className='fw-semibold'>Os meus projetos</h1>
            <p className='fs-5 ms-5'>Selecione um projeto que deseja visualizar e depois deixe a sua opinião. Se encontrar bugs, por favor reporte-os!</p>
            <Container>
                <ProjectCard id="portefoliowebsite" title="Website de Portefólio" imgSrc="website_portefolio.jpg">
                    <span>
                        Um website que expõe o meu currículo.
                        Clique para mais detalhes sobre o processo
                        de criação do website. (PS: É este website)
                    </span>
                    <span>Línguas: Python, Javascript, MQL (MongoDB)</span>
                    <span>Frameworks: React-Bootstrap (JS), Flask (Python)</span>
                </ProjectCard>
            </Container>
        </Container>
    );
}

function ProjectCard(props) {
    return (
        <Card id={props.id} style={{ width: '24rem' }}>
            <Card.Img variant="top" src={props.imgSrc} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.children}
                </Card.Text>
                <div className="d-flex justify-content-center flex-wrap">
                    <Button variant="primary me-3">Abrir projeto</Button>
                    <Button variant="primary">Reportar bugs</Button>
                    <Button variant="primary mt-2">Dar opinião</Button>
                </div>
            </Card.Body>
        </Card>
    );
}


export default MyProjects;