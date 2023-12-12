import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import NavBarComponent from '../components/NavbarComponent';
import { db } from '../services/FirebaseServices';
import { categoriasMap } from '../utils/categoriaOption';
import "../styles/adminStyle.css";



const AdminScreen = ({ onSignOut }) => {
    const [articulos, setArticulos] = useState([]);
    const [articuloEditable, setArticuloEditable] = useState({ id: null, nombre: '', link: '', categoria: 0 });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const unsubscribe = db.collection('articulos_relevantes').onSnapshot(snapshot => {
            setArticulos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, []);

    const handleCrearActualizarArticulo = async (e) => {
        e.preventDefault();
        const { id, nombre, link, categoria } = articuloEditable;

        // Validar que se haya seleccionado una categoría válida
        if (categoria === 0) {
            alert('Por favor, seleccione una categoría.');
            return;
        }

        try {
            let finalUrl = link;

            // Si la URL no es de TinyURL y no es vacía, intentar acortarla
            if (!link.includes('tinyurl.com') && link !== '') {
                const tinyUrlApi = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(link)}`;
                const response = await axios.get(tinyUrlApi);
                finalUrl = response.data;
            }

            // Preparar los datos del artículo
            const articuloData = { nombre, link: finalUrl, categoria };

            // Actualizar o agregar el artículo en la base de datos
            if (id) {
                await db.collection('articulos_relevantes').doc(id).update(articuloData);
            } else {
                await db.collection('articulos_relevantes').add(articuloData);
            }

            // Resetear el formulario y cerrar el modal
            setArticuloEditable({ id: null, nombre: '', link: '', categoria: 0 });
            setShowModal(false);
        } catch (error) {
            console.error('Error al acortar la URL o interactuar con la base de datos:', error);
            // Manejar el error adecuadamente
        }
    };

    const handleEliminarArticulo = (id) => {
        db.collection('articulos_relevantes').doc(id).delete();
    };

    const handleEditarClick = (articulo) => {
        setArticuloEditable(articulo);
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let finalValue = value;

        // Si el campo es 'categoria', convertir el valor a número
        if (name === 'categoria') {
            finalValue = Number(value);
        }

        setArticuloEditable(prevState => ({ ...prevState, [name]: finalValue }));
    };

    return (
        <div className="adminScreenContainer">
            <NavBarComponent onSignOut={onSignOut} />
            <h1>Artículos Relevantes</h1>
            <button className="btn btn-add" onClick={() => setShowModal(true)}>Agregar Artículo</button>
            <div className='tableContainer'>
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Nombre del articulo</th>
                            <th>Link - URL</th>
                            <th>Categoria</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articulos.map(articulo => (
                            <tr key={articulo.id}>
                                <td>{articulo.nombre}</td>
                                <td>{articulo.link}</td>
                                <td>{categoriasMap[articulo.categoria] || 'Sin categoria'}</td>
                                <td>
                                    <button className="btn btn-edit" onClick={() => handleEditarClick(articulo)}>Editar</button>
                                    <button className="btn btn-delete" onClick={() => handleEliminarArticulo(articulo.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => { setShowModal(false); setArticuloEditable({ id: null, nombre: '', link: '', categoria: 0 }); }}>×</span>
                        <h2>{articuloEditable.id ? 'Editar Artículo' : 'Agregar Artículo'}</h2>
                        <form onSubmit={handleCrearActualizarArticulo}>
                            <div className="form-group">
                                <label>Nombre del artículo</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={articuloEditable.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Link del artículo</label>
                                <input
                                    type="text"
                                    name="link"
                                    value={articuloEditable.link}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Categoria</label>
                                <select
                                    name="categoria"
                                    value={articuloEditable.categoria}
                                    onChange={handleChange}
                                    required
                                    className='selectionCat'
                                >
                                    <option value="0">Seleccionar</option>
                                    <option value="1">Salud</option>
                                    <option value="2">Alimentacion</option>
                                    <option value="3">Cuidados</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-save">Guardar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

AdminScreen.propTypes = {
    onSignOut: PropTypes.func.isRequired,
};

export default AdminScreen;
