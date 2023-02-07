import Cookies from 'js-cookie';
import { useState } from 'react';
import { Container, Button, Card, InputGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function MyProjects(props) {
    let { lang } = useParams();
  
    function translate(text) {
        return props.fullTranslation[text][lang];
    }

    return (
        <Container fluid className='bg-secondary'>
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
    let [textAreaContent, setTextAreaContent] = useState("");
    let [opinionActive, setOpinionActive] = useState(false);

    function translate(text) {
        return props.fullTranslation[props.projectKey][text][lang];
    }

    function translateButton(text) {
        return props.fullTranslation[text][lang];
    }

    function getImageURL() {
        return props.fullTranslation[props.projectKey]["imgurl"];
    }

    const handleClickOpinion = () => {
        setOpinionActive(true);
    }

    return (
        <Card id={props.id} className='mb-5' style={{ width: '24rem' }}>
            <Card.Img variant="top" src={getImageURL()} />
            <Card.Body className='bg-terciary'>
                <Card.Title>{translate("title")}</Card.Title>
                <Card.Text>
                    {translate("desc")}
                </Card.Text>
                <div className="d-flex justify-content-center flex-wrap">
                    <Button variant="primary me-3 text-white fw-bold">{translateButton("openproject")}</Button>
                    <Button variant="primary text-white fw-bold" disabled={opinionActive} onClick={handleClickOpinion}>{translateButton("givefeedback")}</Button>
                </div>
            </Card.Body>
            <ProjectFeedbackArea setOpinionActive={setOpinionActive} hidden={!opinionActive} projectKey="portefolio"/>
        </Card>
    );
}

function ProjectFeedbackArea(props) {
    let [textAreaContent, setTextAreaContent] = useState("");
    let [isSubmitting, setIsSubmitting] = useState(false);
    let [contentFeedback, setContentFeedback] = useState("");

    const handleClickSubmit = () => {
        sendFeedback();
    }

    const handleClickCancel = () => {
        props.setOpinionActive(false);
        setTextAreaContent("");
        setContentFeedback("");
    }

    const handleChange = (event) => {
        setTextAreaContent(event.target.value);
    }

    function sendFeedback() {
        setIsSubmitting(true);
        if (textAreaContent === "") {
            setContentFeedback("Por favor, escreva algo para dar a sua opinião");
            setIsSubmitting(false);
            return;
        }
        let req = new XMLHttpRequest();
        setContentFeedback("");
        req.onload = function () {
            if (req.status === 200) {
                if (this.responseText === "success") {
                    console.log("Feedback enviado com sucesso");
                    props.setOpinionActive(false);
                    setTextAreaContent("");
                }
            } else {
                if (this.responseText === "invalid user") {
                    console.log("Inside invalid user");
                    setContentFeedback("Por favor, faça login para dar a sua opinião");
                }
            }
            setIsSubmitting(false);
        }
        req.open("POST", "/giveopinion", true);
        req.setRequestHeader("Content-Type", "application/json");
        let date = new Date();
        let formattedDate = `${date.getDate()}-${(date.getMonth() + 1)}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        req.send(JSON.stringify({"userId": (Cookies.get("userid") ? Cookies.get("userid") : ""), "project": props.projectKey, "content": textAreaContent, "date": formattedDate}));
    }

    return (
    <InputGroup className={'d-flex align-items-center flex-column bg-secondary ' + (props.hidden ? "d-none" : "")}>
        <textarea aria-label="With textarea" value={textAreaContent} disabled={isSubmitting} onChange={handleChange} className='feedback-text-area rounded ms-1 me-1 mb-2' />
        <span className='text-danger'>{contentFeedback}</span>
        <div>
            <Button variant="primary text-white fw-bold rounded mb-2 me-2" onClick={handleClickCancel} disabled={isSubmitting}>Cancelar</Button>
            <Button variant="primary text-white fw-bold rounded mb-2" disabled={isSubmitting} onClick={handleClickSubmit} >Submeter</Button>
            <img src="../loading-gif.gif" className="loading-gif ms-2 mt-1" hidden={!isSubmitting} alt="loading-gif" width="30" height="30" />
        </div>
    </InputGroup>);
}


export default MyProjects;