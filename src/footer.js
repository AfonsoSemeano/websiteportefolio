import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Footer(props) {
    let { lang } = useParams();
  
    function translate(text) {
        return props.fullTranslation[text][lang];
    }

    return (
        <div className='bg-primary shadow-sm footer'>
            <Container>
                <Row>
                    <Col className="d-flex align-items-center navbar-text-color fw-semibold">
                        <p>{translate("madeby")}: Afonso Semeano</p>
                    </Col>
                    <Col></Col>
                    <Col>
                        <h5 className='fw-semibold navbar-text-color'>{translate("getintouch")}:</h5>
                        <p className='navbar-text-color'>Email: afonsosemeano@gmail.com</p>
                        <p className='navbar-text-color'>Linkedin: none</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Footer;