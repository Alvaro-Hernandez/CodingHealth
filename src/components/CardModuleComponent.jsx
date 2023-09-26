import PropTypes from "prop-types";
import '../styles/cardModuleStyle.css';
import { useLocation } from "wouter";

const CardModule = ({ imageSrc, text, route }) => {
    const [, setLocation] = useLocation();

    const handleCardClick = () => {
        setLocation(route);
    }

    return (
        <div className='card' onClick={handleCardClick}>
            <img src={imageSrc} alt='Card Content' className='card-image' />
            <p className='card-text'> {text} </p>
        </div>
    )
}

CardModule.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    route: PropTypes.string
};

export default CardModule;