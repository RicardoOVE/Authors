import React, {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

const LoginRegistro = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");

    const [errorsRegistro, setErrorsRegistro] = useState({});
    const [errorsLogin, setErrorsLogin] = useState("");

    const history = useHistory();

    const registro = e => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/register',{
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        }, {withCredentials: true})
            .then(res => history.push('/'))
            .catch(err => setErrorsRegistro(err.response.data.errors));
    }


    return (

        <div className="row">
            <div className="col-6">
                <h2>Registro</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="firstName">Nombre</label>
                        <input type="text" name="firstName" id="firstName" className="form-control" value={firstName} onChange={e=> setFirstName(e.target.value)}  />
                        {errorRegistro.firstName ? <span className="text-danger">{errorRegistro.firstName.message}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Apellido</label>
                        <input type="text" name="lastName" id="lastName" className="form-control" value={lastName} onChange={e=> setLastName(e.target.value)}  />
                        {errorRegistro.lastName ? <span className="text-danger">{errorRegistro.lastName.message}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="email" id="email" className="form-control" value={email} onChange={e=> setEmail(e.target.value)}  />
                        {errorRegistro.email ? <span className="text-danger">{errorRegistro.email.message}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="form-control" value={password} onChange={e=> setPassword(e.target.value)}  />
                        {errorRegistro.password ? <span className="text-danger">{errorRegistro.password.message}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmaci??n</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" className="form-control" value={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)}  />
                        {errorRegistro.confirmPassword ? <span className="text-danger">{errorRegistro.confirmPassword.message}</span> : null}
                    </div>
                    <input type="submit" value="Registarme" className="btn btn-primary" />
                </form>
            </div>
            <div className="col-6">

            </div>
        </div>


    )
}

export default LoginRegistro;