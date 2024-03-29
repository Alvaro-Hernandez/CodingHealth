import PropTypes from "prop-types";
import NavBarComponent from "../components/NavbarComponent";
import CardFunction from "../components/CardFunctionComponent";
import imgStatistics from "../assets/estadisticas.png";
import imgPrimur from "../assets/cartillaPerinatal.png";
import imgInformenes from "../assets/ManualesPNG.png";
import '../styles/functionStyle.css'

const FunctionScreen = ({ onSignOut }) => {
    return (
        <div className="functionScreenContainer">
            <div className="navContainer">
                <NavBarComponent onSignOut={onSignOut} showCloseExpedienteButton={false} />

            </div>

            <div className="functionItemContainer">
                <div className="functionCardsContainer">
                    <CardFunction
                        imageSrc={imgStatistics}
                        text="Estadísticas"
                        route="/statistics"
                    />
                    <CardFunction
                        imageSrc={imgPrimur}
                        text="Cartilla Perinatal"
                        route="/search"
                    />
                    <CardFunction
                        imageSrc={imgInformenes}
                        text="Informes"
                        route="/webminsa"
                    />
                </div>
            </div>
        </div>
    )
}

FunctionScreen.propTypes = {
    onSignOut: PropTypes.func.isRequired,
};


export default FunctionScreen;