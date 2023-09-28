import PropTypes from "prop-types";
import { useLocation } from "wouter";
import NavBarComponent from "../components/NavbarComponent";

const FourthModuleScreen = ({ onSignOut }) => {

    const [, setLocation] = useLocation();

    const handleLogout = () => {
        onSignOut();
        setLocation("/login");
    }

    return (
        <div>
            <NavBarComponent onSignOut={handleLogout} />
            <h1>Cuarto Modulo</h1>
        </div>
    )
}

FourthModuleScreen.propTypes = {
    onSignOut: PropTypes.func.isRequired,
};

export default FourthModuleScreen;