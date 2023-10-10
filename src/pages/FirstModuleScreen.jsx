import PropTypes from "prop-types";
import { useLocation } from "wouter";
import NavBarComponent from "../components/NavbarComponent";
import "../styles/firstModuleStyle.css";

const FirstModuleScreen = ({ onSignOut }) => {
    const [, setLocation] = useLocation();

    const handleLogout = () => {
        onSignOut();
        setLocation("/login");
    };

    return (
        <div className="firstModuleScreenContainer">
            <div className="navContainer">
                <NavBarComponent onSignOut={handleLogout} />
                <div className="formControl">
                    <section className="sectionForm">
                    </section>
                </div>
            </div>
        </div>
    );
};

FirstModuleScreen.propTypes = {
    onSignOut: PropTypes.func.isRequired,
};

export default FirstModuleScreen;
