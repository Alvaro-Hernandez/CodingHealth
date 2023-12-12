import { useState } from "react";
import { useLocation } from "wouter";
import PropTypes from "prop-types";
import ErrorModal from "./MessageErrorModal";
import '../styles/navStyle.css';
import logo from "../assets/logo.png";

const NavBarComponent = ({ onSignOut, showCloseExpedienteButton = false }) => {

    const [isErrorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [, setLocation] = useLocation();

    const handleSignOunt = () => {
        try {
            //Limpia todo el localStorage
            localStorage.clear();

            onSignOut();
        } catch (error) {
            setErrorMsg("Error al cerrar sesión.");
            setErrorModalOpen(true);
        }
    };

    const handleCloseExpediente = () => {
        localStorage.clear();
        setLocation("/search");
    }

    const navigateToHome = () => {
        localStorage.clear();
        setLocation("/home");
    }

    return (
        <nav>
            <div className="nav-bar">
                <div className="logo" onClick={navigateToHome}> {/* Añadido evento onClick */}
                    <img src={logo} alt="CartiLife" />
                </div>
                {showCloseExpedienteButton && (
                    <button onClick={handleCloseExpediente} className="closeExpedienteButton">
                        Cerrar el expediente
                    </button>
                )}
                <button onClick={handleSignOunt} className="signout-btn">Cerrar Sesion</button>
            </div>
            <ErrorModal
                isOpen={isErrorModalOpen}
                onRequestClose={() => setErrorModalOpen(false)}
                errorMessage={errorMsg}
                title="Error"
            />
        </nav>
    )
}

NavBarComponent.propTypes = {
    onSignOut: PropTypes.func.isRequired,
    showCloseExpedienteButton: PropTypes.bool,
};

export default NavBarComponent;
