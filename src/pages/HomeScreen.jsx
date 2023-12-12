import PropTypes from "prop-types";
import NavBarComponent from "../components/NavbarComponent";
// import { useLocation } from "wouter";
import '../styles/homeStyle.css';

const HomeScreen = ({ onSignOut }) => {
    // Estado para navegar a la ruta que se necesita
    // const [, setLocation] = useLocation();

    // Función para manejar el evento de clic
    // const handleCardClick = () => {
    //     setLocation('/function');
    // }

    return (
        <div className="homeScreenContainer">
            <div className="navContainer">
                <NavBarComponent onSignOut={onSignOut} showCloseExpedienteButton={false} />
            </div>

            {/* Aqui puedes ver el uso de la ruta que se necesita */}
            {/* <button onClick={handleCardClick} className="homeButton">
                Ir a funciones
            </button> */}
        </div>
    )
}

HomeScreen.propTypes = {
    onSignOut: PropTypes.func.isRequired,
};


export default HomeScreen;