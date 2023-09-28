import PropTypes from "prop-types";
import { useLocation } from "wouter";
import NavBarComponent from "../components/NavbarComponent";

const FirstModuleScreen = ({ onSignOut }) => {

    const [, setLocation] = useLocation();

    const handleLogout = () => {
        onSignOut();
        setLocation("/login");
    }

    return (
        <div>
            <NavBarComponent onSignOut={handleLogout} />
            <h1>Hola Test</h1>
        </div>
    )
}

FirstModuleScreen.propTypes = {
    onSignOut: PropTypes.func.isRequired,
};


export default FirstModuleScreen;