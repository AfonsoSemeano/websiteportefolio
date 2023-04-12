import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Footer(props) {
    let { lang } = useParams();
  
    function translate(text) {
        return props.fullTranslation[text][lang];
    }

    return (
        <div className='bg-primary shadow-sm'>
            <Container>
                <Row>
                    <Col className="d-none d-md-flex align-items-center navbar-text-color fw-semibold">
                        <p>{translate("madeby")}: Afonso Semeano</p>
                    </Col>
                    <Col className='d-none d-lg-block'></Col>
                    <Col className='d-flex align-items-center flex-column d-md-block'>
                        <h5 className='fw-semibold navbar-text-color'>{translate("getintouch")}:</h5>
                        <p className='navbar-text-color'>Email: afonsosemeano@gmail.com</p>
                        <p className='navbar-text-color'>Linkedin: <a className='text-white' href='https://www.linkedin.com/in/afonso-semeano-a6699a268/'>Afonso Semeano</a></p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Footer;