import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import logo from "./assets/images/MyWallet.png";

import { Div, Image, Form } from "./StyleAuthUser";
import { Loaderspinner } from "./Loaderspinner";

export default function SignUp(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordconfirm, setPasswordconfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function signup(e){
        e.preventDefault();
        if(password !== passwordconfirm) return alert("Senha não confirmada")
        setLoading(true);
    }
    
    if(loading){
        const body = {
            name,
            email,
            password,
            passwordconfirm
        }
        const promise = axios.post(
            "http://localhost:5000/sign-up",
            body
        );

        promise.then(() =>
            navigate("/")
        ).catch((error) => {
            if(error.response.status === 409){
                alert("Usuário já existente");
            }else{
                alert("Erro em fazer cadastro");
            }
            setLoading(false);
        });
    }

    return (
        <Div>
            <Image className="logo" alt="MyWallet_logo" src={logo} />
            <Form onSubmit={ loading ? null : signup } >
                <input 
                    className={ loading ? "pale" : "" }
                    type="text"
                    id={ loading ? null : "name" }
                    placeholder="Nome"
                    value={name}
                    onChange={ loading ? null : (e) => setName(e.target.value) }
                    required
                />
                <input
                    className={ loading ? "pale" : "" }
                    type="email"
                    id={ loading ? null : "email" }
                    placeholder="E-mail"
                    value={email}
                    onChange={ loading ? null : (e) => setEmail(e.target.value) }
                    required
                />
                <input
                    className={ loading ? "pale" : "" }
                    type="password"
                    id={ loading ? null : "password" }
                    placeholder="Senha"
                    value={password}
                    onChange={ loading ? null : (e) => setPassword(e.target.value) }
                    required
                />
                <input
                    className={ loading ? "pale" : "" }
                    type="password"
                    id={ loading ? null : "passwordconfirm" }
                    placeholder="Confirme a senha"
                    value={passwordconfirm}
                    onChange={ loading ? null : (e) => setPasswordconfirm(e.target.value) }
                    required
                />
                <button className={loading ? "pale" : ""} type={ loading ? null : "submit" } >
                    { loading ? <Loaderspinner /> : "Cadastrar" }
                </button>
            </Form>
            <Link to={"/"}>
                <p>Já tem uma conta? Entre agora!</p>
            </Link>
        </Div>
    );
}