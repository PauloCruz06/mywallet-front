import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import UserContext from "../contexts/UserContext";

import { Form } from "./StyleAuthUser";
import { Div, Topbar } from "./StylePostUser"
import { Loaderspinner } from "./Loaderspinner";

export default function Deposits(){
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const { userdata } = useContext(UserContext);
    const navigate = useNavigate();

    function send(e){
        e.preventDefault();
        setLoading(true);
    }

    if(loading){
        const body = {
            description,
            amount: parseFloat(value.replace(",",".")),
            isPayment: false
        };

        if(userdata){
            const config = {
                headers: {
                    Authorization: `Bearer ${userdata.token}`
                }
            }
            const promise = axios.post(
                `${process.env.REACT_APP_URL_API}/transactions`,
                body,
                config
            );
            promise.then(() => {
                setLoading(false);
                navigate("/MyAccount");
            }).catch(() => {
                alert("Não foi possível cadastrar transação");
                navigate("/MyAccount");
            });
        } else{
            alert("Não foi possível acessar os dados, por favor entre novamente");
            localStorage.removeItem('data');
            navigate("/");
        }
    }

    return(
        <Div>
            <Topbar>
                <p>Nova entrada</p>
            </Topbar>
            <Form onSubmit={ loading ? null : send } >
                <input
                    className={ loading ? "pale" : "" }
                    type="number"
                    id={ loading ? null : "value" }
                    placeholder="Valor"
                    value={value}
                    onChange={ loading ? null : (e) => setValue(e.target.value) }
                    required
                />
                <input
                    className={ loading ? "pale" : "" }
                    type="text"
                    id={ loading ? null : "descpription" }
                    placeholder="Descrição"
                    value={description}
                    onChange={ loading ? null : (e) => setDescription(e.target.value) }
                    required
                />
                {loading ?
                    <div className="pale" >
                        <Loaderspinner />
                    </div>
                 :
                    <button type="submit" >
                        Salvar entrada
                    </button>
                }
            </Form>
        </Div>
    );
}