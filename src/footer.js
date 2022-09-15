import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Footer(props) {
    let { lang } = useParams();
  
    function translate(text) {
        return props.fullTranslation[text][lang];
    }

    return (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            <Container>
                <Row>
                    <Col className="d-flex align-items-center">
                        <p>{translate("madeby")}: Afonso Semeano</p>
                    </Col>
                    <Col></Col>
                    <Col>
                        <h5 className='fw-semibold'>{translate("getintouch")}:</h5>
                        <p>Email: afonsosemeano@gmail.com</p>
                        <p>Linkedin: none</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Footer;