import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { db } from '../services/FirebaseServices';
import { useLocation } from "wouter";
import NavBarComponent from "../components/NavbarComponent";
import ErrorModal from "../components/MessageErrorModal";
import SuccessfulModal from "../components/MessageSuccessfulModal";
import imgBuscar from "../assets/buscar.png";
import "../styles/searchStyle.css";

const SearchScreen = ({ onSignOut }) => {
    const [idInput, setIdInput] = useState('');
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [, setLocation] = useLocation();

    useEffect(() => {
        if (!localStorage.getItem('firstVisit')) {
            localStorage.removeItem('cachedId');
            localStorage.setItem('firstVisit', 'true');
        }
        const cachedIdFromLocalStorage = localStorage.getItem('cachedId');
        if (cachedIdFromLocalStorage) {
            setLocation("/modules");
        }
    }, [setLocation]);

    const handleIdInputChange = (event) => {
        setIdInput(event.target.value);
    };

    const closeErrorModal = () => {
        setErrorModalOpen(false);
        setLocation("/search");
    };

    const closeSuccessModal = () => {
        setSuccessModalOpen(false);
        if (shouldNavigate) {
            setLocation("/modules");
            setShouldNavigate(false);
        }
    };

    const handleCheckId = () => {
        db.collection('cartilla')
            .doc(idInput)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setIdInput('');
                    setSuccessMessage("ID encontrado con éxito");
                    setSuccessModalOpen(true);
                    setShouldNavigate(true);
                } else {
                    db.collection('cartilla')
                        .doc(idInput)
                        .set({})
                        .then(() => {
                            setSuccessMessage("Nuevo ID creado con éxito. Serás redirigido.");
                            setSuccessModalOpen(true);
                            localStorage.setItem('cachedId', idInput);
                            setShouldNavigate(true);
                        })
                        .catch((error) => {
                            console.error('Error al guardar el documento: ', error);
                            setErrorMessage("Error al guardar el documento");
                            setErrorModalOpen(true);
                        });
                }
            })
            .catch((error) => {
                console.error('Error al buscar el ID:', error);
                setErrorMessage("Error al buscar el ID");
                setErrorModalOpen(true);
            });
    };


    return (
        <div className="searchScreenContainer">
            <div className="navContainer">
                <NavBarComponent onSignOut={onSignOut} />
            </div>
            <div className="searchSection">
                <div className="searchTitle">
                    <img src={imgBuscar} alt="Search Icon" className="searchIcon" />
                    <h2 className="title">Buscar a su paciente</h2>
                </div>
                <div className="inputContainer">
                    <input
                        type="text"
                        placeholder="Ingrese su expediente unico"
                        className="customInputSearch"
                        value={idInput}
                        onChange={handleIdInputChange}
                    />
                    <button onClick={handleCheckId} className="submitButton">Buscar</button>
                </div>
            </div>

            <ErrorModal
                isOpen={errorModalOpen}
                onRequestClose={closeErrorModal}
                errorMessage={errorMessage}
                title="Error"
            />

            <SuccessfulModal
                isOpen={successModalOpen}
                onRequestClose={closeSuccessModal}
                successfulMessage={successMessage}
                title="Éxito"
            />
        </div>
    )
}

SearchScreen.propTypes = {
    onSignOut: PropTypes.func.isRequired,
};

export default SearchScreen;
