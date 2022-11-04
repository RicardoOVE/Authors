import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const TodosAutores = () => {

    const [autores, setAutores] = useState([]); // lista vacía

    useEffect(() => {
        axios.get("http://localhost:8000/api/autores")
            .then(res => setAutores(res.data))
            .catch(err => console.log(err));
    }, [])

    const borrarAutor = id => {
        axios.delete("http://localhost:8000/api/autores/" + id)
            .then( res => {
                //Actualizar la lista de autores por medio de filter
                let nuevaLista = autores.filter(autor => autor._id !== id)
                setAutores(nuevaLista);
            })
    }

    return (
        <div>
            <h1>Autores</h1>
            <Link to="/nuevo" className="btn btn-success mb-3">Nuevo Autor</Link>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Imagen</th>
                        <th>Libros</th>
                        <th>Cuentos</th>
                        <th>Artículos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        autores.map((autor, index)=> (
                            <tr key={index}>
                                <td>{autor.nombre}</td>
                                <td>
                                    <img src={autor.imagen} alt="autor" className="img-fluid" />
                                </td>
                                <td>
                                    {
                                        autor.libros ? <span className="bi bi-check text-success"></span> : <span className="bi bi-x text-danger"></span>
                                    }
                                </td>
                                <td>
                                    {
                                        autor.cuentos ? <span className="bi bi-check text-success"></span> : <span className="bi bi-x text-danger"></span>
                                    }
                                </td>
                                <td>
                                    {
                                        autor.articulos ? <span className="bi bi-check text-success"></span> : <span className="bi bi-x text-danger"></span>
                                    }
                                </td>
                                <td>
                                    <Link className="btn btn-warning mb-2" to={`/autor/editar/${autor._id}`}>Editar</Link>
                                    <button className="btn btn-danger mb-2" onClick={()=>  borrarAutor(autor._id)}>Borrar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )

}

export default TodosAutores;
