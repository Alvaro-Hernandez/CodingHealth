import PropTypes from "prop-types";
import NavBarComponent from "../components/NavbarComponent";
import CardModule from "../components/CardModuleComponent";
import imgFirstModule from "../assets/atencion-medica.png";
import imgSecondModule from "../assets/embarazada.png";
import imgThirdModule from "../assets/ultrasonido.png";
import imgFourthModule from "../assets/cadera.png";
import '../styles/modulesStyle.css';

const ModuleScreen = ({ onSignOut }) => {
    return (
        <div className="moduleScreenContainer">
            <div className="navContainer">
                <NavBarComponent onSignOut={onSignOut} />
            </div>

            <div className="itemContainer">
                <div className="cardsContainer">
                    <CardModule
                        imageSrc={imgFirstModule}
                        text="Datos de Filiación y Antecedentes"
                        route="/firstmodule"
                    />
                    <CardModule
                        imageSrc={imgSecondModule}
                        text="Gestación actual"
                        route="/secondmodule"
                    />
                    <CardModule
                        imageSrc={imgThirdModule}
                        text="Parto o Aborto"
                        route="/thirdmodule"
                    />
                    <CardModule
                        imageSrc={imgFourthModule}
                        text="Puerperio"
                        route="/fourthmodule"
                    />
                </div>
            </div>
        </div>
    )
}

ModuleScreen.propTypes = {
    onSignOut: PropTypes.func.isRequired,
};


export default ModuleScreen;