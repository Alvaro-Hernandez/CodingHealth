import PropTypes from "prop-types";
import NavBarComponent from "../components/NavbarComponent";
import "../styles/statisticsStyle.css";

const StatisticsScreen = ({ onSignOut }) => {
    return (
        <div className="statisticsScreenContainer">
            <div className="navContainer">
                <NavBarComponent onSignOut={onSignOut} />
            </div>
        </div>
    )
}

StatisticsScreen.propTypes = {
    onSignOut: PropTypes.func.isRequired,
};

export default StatisticsScreen;