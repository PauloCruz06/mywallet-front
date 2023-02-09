import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import UserContext from "../contexts/UserContext";
import logo from "./assets/images/MyWallet.png";

import { Div, Image, Form } from "./StyleAuthUser";
import { Loaderspinner } from "./Loaderspinner"

export default function SignIn(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[loading, setLoading] = useState(false);
    const{ setUserdata } = useContext(UserContext);
    const navigate = useNavigate();

    const userlogin = localStorage.getItem('data');
    if(userlogin){
        setUserdata(JSON.parse(userlogin));
        navigate("/MyAccount");
    }

    function signin(e){
        e.preventDefault();
        setLoading(true);
    }

    if(loading){
        const body = { email, password };
        const promise = axios.post(
            `${process.env.REACT_APP_URL_API}/sign-in`,
            body
        );

        promise.then((re) => {
            setLoading(false);
            setUserdata(re.data);
            const data = { ...re.data };
            const dataString = JSON.stringify(data);
            localStorage.setItem('data', dataString);
            navigate("/MyAccount");
        }).catch((error) => {
            if(error.response.status === 401){
                alert("Usuário inválido");
            }else{
                alert("Não foi possível entrar");
            }
            setLoading(false);
        });
    }

    return (
        <Div>
            <Image className="logo" alt="MyWallet_logo" src={logo} />
            <Form onSubmit={ loading ? null : signin } >
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
                {loading ?
                    <div className="pale" >
                        <Loaderspinner />
                    </div>
                 :
                    <button type="submit" >
                        Entrar
                    </button>
                }
            </Form>
            <Link to={"/SignUp"}>
                <p>Primeira vez? Cadastre-se!</p>
            </Link>
        </Div>
    );
}