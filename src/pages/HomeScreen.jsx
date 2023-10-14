import PropTypes from "prop-types";
import NavBarComponent from "../components/NavbarComponent";
import CardFunction from "../components/CardFunctionComponent";
import imgStatistics from "../assets/estadisticas.png";
import imgPrimur from "../assets/cartillaPerinatal.png";
import imgWebHearth from "../assets/webMinsa.png";
import '../styles/homeStyle.css';

const HomeScreen = ({ onSignOut }) => {
    return (
        <div className="homeScreenContainer">
            <div className="navContainer">
                <NavBarComponent onSignOut={onSignOut} />
            </div>

            <div className="homeItemContainer">
                <div className="homeCardsContainer">
                    <CardFunction
                        imageSrc={imgStatistics}
                        text="Estadísticas"
                        route="/statistics"
                    />
                    <CardFunction
                        imageSrc={imgPrimur}
                        text="Cartilla Perinatal"
                        route="/modules"
                    />
                    <CardFunction
                        imageSrc={imgWebHearth}
                        text="Web Minsa"
                        route="/webminsa"
                    />
                </div>
            </div>
        </div>
    )
}

HomeScreen.propTypes = {
    onSignOut: PropTypes.func.isRequired,
};


export default HomeScreen;