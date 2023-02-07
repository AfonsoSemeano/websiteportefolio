import { useParams } from "react-router-dom";


function PortfolioWebsite(props) {
    let { lang } = useParams();
    function translate(text) {
        return props.fullTranslation[text][lang];
    }

    return (
        <div className="content ms-4 mt-3 pb-3">
            <h1>{translate("title")}</h1>
            <p className="fw-bold fs-4">{translate("reason")}</p> 
            <p>{translate("reasondesc")}</p>
            <p className="fw-bold fs-4">{translate("howcreated")}</p>
            <p>{translate("howcreateddesc")}</p>
            <p className="fw-bold fs-4">{translate("difficulties")}</p>
            <p>{translate("difficultiesdesc")}</p>
            <ul>
                <li>{translate("diffresponsiveness")}</li>
                <li>{translate("diffloading")}</li>
                <li>{translate("difflanguage")}</li>
                <li>{translate("difflogin")}</li>
                <li>{translate("diffbeautiful")}</li>
            </ul>
            <p className="fw-bold fs-4">{translate("seecode")}</p>
            <p>{translate("seecodedesc")} <a href="https://github.com/AfonsoSemeano/websiteportefolio">link</a></p>

        </div>
    );
}

export default PortfolioWebsite;