import { useState } from "react";
import PropTypes from "prop-types";
import NavBarComponent from "../components/NavbarComponent";
import CartiBabyImage from "../assets/CartiBabySpsh.png";
import Valor1Image from "../assets/Eficiencia.png";
import Valor2Image from "../assets/Accesiblidiad.png";
import Valor3Image from "../assets/Seguridad.png";
import Valor4Image from "../assets/Personalizacion.png";
import Ubicacion from "../assets/Ubicacion.png";
import telefono from "../assets/Telefono.png";
import correo from "../assets/Correo.png";
import InstagramIcon from "../assets/instagram.png";
import FacebookIcon from "../assets/facebook.png";
import "../styles/homeStyle.css";

const HomeScreen = ({ onSignOut }) => {
    const [showFullText, setShowFullText] = useState(false);

    const toggleTextVisibility = () => setShowFullText(!showFullText);
    const handleCitaClick = () => (window.location.href = "/function");

    return (
        <div className="homeScreenContainer">
            <div className="navContainer">
                <NavBarComponent onSignOut={onSignOut} showCloseExpedienteButton={false} />

            </div>
            <div className="mainContent">
                <div className="contentSection">
                    <h1 className="title">
                        La revolución tecnológica en el sector salud
                    </h1>

                    <p className="description">
                        {showFullText
                            ? "Simplifica y agiliza la gestión de la cartilla perinatal, permitiendo a los profesionales centrarse en brindar una atención de calidad. Con acceso rápido y seguro a la información relevante, mejora la eficiencia y precisión en la atención perinatal."
                            : "Simplifica y agiliza la gestión de la cartilla perinatal..."}
                        <button className="textToggleButton" onClick={toggleTextVisibility}>
                            {showFullText ? "Ver menos" : "Ver más"}
                        </button>
                    </p>
                    <button className="actionButton" onClick={handleCitaClick}>
                        Haga una cita
                    </button>
                </div>
                <div className="imageSection">
                    <img src={CartiBabyImage} alt="CartiBaby" className="roundedImage" />
                    <div>
                        <span className="cartiBabyTitle">Carti</span>
                        <span className="cartiBabyTitleSecondPart">Baby</span>
                    </div>
                    <p className="imageSubtitle">
                        Tu guía en el viaje hacia la maternidad
                    </p>
                </div>
            </div>
            <div className="valuesSection">
                <div className="valueCard whiteBg">
                    <img src={Valor1Image} alt="Eficiencia" className="icon" />
                    <h3 className="valueTitle">Eficiencia</h3>
                    <p>
                        Optimizamos los procesos para maximizar la eficiencia en cada
                        acción.
                    </p>
                </div>
                <div className="valueCard blueBg">
                    <img src={Valor2Image} alt="Accesibilidad" className="icon" />
                    <h3 className="valueTitle">Accesibilidad</h3>
                    <p>
                        Facilitamos el acceso a nuestros servicios para garantizar la
                        atención a todos.
                    </p>
                </div>
                <div className="valueCard whiteBg">
                    <img src={Valor3Image} alt="Seguridad" className="icon" />
                    <h3 className="valueTitle">Seguridad</h3>
                    <p>
                        Mantenemos los más altos estándares de seguridad en la gestión de
                        datos.
                    </p>
                </div>
                <div className="valueCard blueBg">
                    <img src={Valor4Image} alt="Personalización" className="icon" />
                    <h3 className="valueTitle">Personalización</h3>
                    <p>Cada usuario recibe una experiencia ajustada a sus necesidades.</p>
                </div>
            </div>
            <footer className="footerSection">
                <div className="footerContent">
                    <div className="footerText">
                        <h3 className="footerTitle">
                            <span className="carti">Carti</span>
                            <span className="baby">Baby</span>
                        </h3>
                        <p>
                            Buscamos simplificar el proceso de registro de datos médicos,
                            seguimiento de citas y visualización de resultados de pruebas,
                            brindando una solución tecnológica segura y fácil de usar tanto
                            para las futuras mamás como para los profesionales de la salud.
                        </p>
                    </div>
                    <div className="footerLinks">
                        <h3>Links</h3>
                        <a href="/service-area">Área de Servicio</a>
                        <a href="/about">Acerca de</a>
                        <a href="/solutions">Soluciones</a>
                    </div>
                    <div className="footerContact">
                        <h3>Contacto</h3>
                        <p>
                            <img src={Ubicacion} alt="Ubicación" /> Padre Miguel, Juigalpa
                            Chontales
                        </p>
                        <p>
                            <img src={telefono} alt="Teléfono" /> +505 89447092
                        </p>
                        <p>
                            <img src={correo} alt="Correo electrónico" />{" "}
                            cartibaby07@gmail.com
                        </p>
                    </div>

                    <div className="footerSocial">
                        <h3>Siguenos en</h3>
                        <div className="footerSocialLinks">
                            <a href="https://instagram.com">
                                <img src={InstagramIcon} alt="Instagram" />
                            </a>
                            <a href="https://facebook.com">
                                <img src={FacebookIcon} alt="Facebook" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

HomeScreen.propTypes = {
    onSignOut: PropTypes.func.isRequired,
};

export default HomeScreen;