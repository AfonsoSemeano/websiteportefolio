import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

function NoPage(props) {
    let { lang } = useParams();

    function translate(text) {
        return props.fullTranslation[text][lang];
    }

    return <Container className="content">
        <h1>{translate("error404")}</h1>
        <p>{translate("pagenotfound")}</p>
    </Container>
}

export default NoPage;