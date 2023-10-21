import PropTypes from "prop-types";
import { useState } from "react";
import NavBarComponent from "../components/NavbarComponent";
import "../styles/webMinsaStyle.css";

const WebMinsaScreen = ({ onSignOut }) => {
    const [currentPdf, setCurrentPdf] = useState(null);

    const pdfList = [
        { title: "Normativa 011 – Tercera Edición", url: "/informenes/Manual11.pdf" },
        { title: "Normativa 106 - Segunda Edición", url: "/informenes/ManualHCP.pdf" },
    ];

    return (
        <div className="webMinsaScreenContainer">
            <div className="navContainer">
                <NavBarComponent onSignOut={onSignOut} />
            </div>
            <div className="contentContainer">
                <div className="pdfListContainer">
                    <ul>
                        {pdfList.map((pdf, index) => (
                            <li key={index} onClick={() => setCurrentPdf(pdf.url)}>
                                {pdf.title}
                            </li>
                        ))}
                    </ul>
                </div>
                {currentPdf && (
                    <div className="pdfIframeContainer">
                        <iframe
                            src={currentPdf}
                            width="100%"
                            height="600px"
                            style={{ border: "none" }}
                        ></iframe>
                    </div>
                )}
            </div>
        </div>
    );
};

WebMinsaScreen.propTypes = {
    onSignOut: PropTypes.func.isRequired,
};

export default WebMinsaScreen;
