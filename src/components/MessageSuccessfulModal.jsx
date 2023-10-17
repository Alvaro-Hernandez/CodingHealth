import PropTypes from "prop-types";
import Modal from 'react-modal';
import "../styles/errorModalStyle.css";

Modal.setAppElement('#root');

function SuccessfulModal({ isOpen, onRequestClose, successfulMessage, title }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Error Modal"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                content: {
                    border: 'none',
                    background: 'none'
                }
            }}
        >
            <div className="successful-modal">
                <h2>{title}</h2>
                <p>{successfulMessage}</p>
                <button onClick={onRequestClose}>Cerrar</button>
            </div>
        </Modal>
    );
}

SuccessfulModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    successfulMessage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default SuccessfulModal;
