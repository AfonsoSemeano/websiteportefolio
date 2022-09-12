import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
    return (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            <Container>
                <Row>
                    <Col className="d-flex align-items-center">
                        <p>Website criado por: Afonso Semeano</p>
                    </Col>
                    <Col></Col>
                    <Col>
                        <h5 className='fw-semibold'>Contactos:</h5>
                        <p>Email: afonsosemeano@gmail.com</p>
                        <p>Linkedin: none</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Footer;