import PropTypes from "prop-types";
import NavBarComponent from "../components/NavbarComponent";
import "../styles/webMinsaStyle.css";

const WebMinsaScreen = ({ onSignOut }) => {
    return (
        <div className="webMinsaScreenContainer">
            <div className="navContainer">
                <NavBarComponent onSignOut={onSignOut} />
            </div>
        </div>
    )
}

WebMinsaScreen.propTypes = {
    onSignOut: PropTypes.func.isRequired,
};

export default WebMinsaScreen;