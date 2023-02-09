import { useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Transactionslist from "./Transactionslist";
import UserContext from "../contexts/UserContext";
import logout from "./assets/images/Vector.png";

import { Div, Topbar } from "./StyleAuthUser";

export default function MyAccount(){
    const [transactionsList, setTransactionsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(0);
    const { userdata } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        let value = 0;
        setLoading(true);

        if(userdata){
            const config = {
                headers: {
                    Authorization: `Bearer ${userdata.token}`
                }
            };

            const promise = axios.get(
                `${process.env.REACT_APP_URL_API}/transactions`,
                config
            );

            promise.then((re) => {
                setTransactionsList(re.data);
                re.data.forEach((trans) => {
                    if(trans.isPayment){
                        value = value - trans.amount;
                    }else{
                        value = value + trans.amount;
                    }
                });
                setBalance(value);
                setLoading(false);
            }).catch(() => {
                alert("Não foi possível acessar os dados, por favor entre novamente");
                localStorage.removeItem('data');
                navigate("/");
            });
        } else{
            alert("Não foi possível acessar os dados, por favor entre novamente");
            localStorage.removeItem('data');
            navigate("/");
        }
    }, []);

    function signout(){
        localStorage.removeItem('data');
        navigate("/");
    }

    function updateTransaction(){
        let value = 0;

        if(userdata){
            const config = {
                headers: {
                    Authorization: `Bearer ${userdata.token}`
                }
            };

            const promise = axios.get(
                `${process.env.REACT_APP_URL_API}/transactions`,
                config
            );

            promise.then((re) => {
                setTransactionsList(re.data);
                re.data.forEach((trans) => {
                    if(trans.isPayment){
                        value = value - trans.amount;
                    }else{
                        value = value + trans.amount;
                    }
                });
                setBalance(value);
                setLoading(false);
            }).catch(() => {
                alert("Não foi possível acessar os dados, por favor entre novamente");
                localStorage.removeItem('data');
                navigate("/");
            });
        } else{
            alert("Não foi possível acessar os dados, por favor entre novamente");
            localStorage.removeItem('data');
            navigate("/");
        }
    }

    return (
        <Div>
            <Topbar>
                {loading ?
                    <p>Carregando...</p>
                :
                    <p>{`Olá, ${userdata.name}`}</p>
                }
                <img alt="logout" src={logout} onClick={signout} />
            </Topbar>
            <TransactionsConteiner>
                {transactionsList.length === 0 ?
                    <div className="notransactions">
                        Não há registros de entrada ou saída
                    </div>
                :
                    <div className="transactionslist">
                        {transactionsList.map((trans, index) => (
                            <Transactionslist
                                key={index}
                                day={trans.day}
                                description={trans.description}
                                amount={trans.amount}
                                isPayment={trans.isPayment}
                                id={trans.id}
                                update={updateTransaction}
                            />
                        ))}
                       <div className="balance">
                        <h1>SALDO</h1>
                        <p className={balance >= 0 ?  "green" : "red"}>
                            {balance.toFixed(2).toString().replace(".",",")}
                        </p>
                       </div>
                    </div>
                }
            </TransactionsConteiner>
            <Options>
                <Link className="box" to={"/New-deposit"}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <p>Nova entrada</p>   
                </Link>
                <Link className="box" to={"/New-payment"}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <p>Nova saída</p>
                </Link>
            </Options>
        </Div>
    );
}

const TransactionsConteiner = styled.div`
    width: 90%;
    height: 446px;
    border-radius: 5px;
    border: none;
    background-color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 13px;
    .notransactions{
        width: 180px;
        height: 46px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #868686;
        font-weight: 400;
        font-size: 20px;
        object-fit: cover;
    }
    .transactionslist{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 12px 12px 26px 12px;
        box-sizing: border-box;
        position: relative;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .balance{
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        padding: 0px 12px 0px 12px;
        box-sizing: border-box;
        left: 1px;
        bottom: 10px;
    }
    .red{
        color: #C70000;
    }
    .green{
        color: #03AC00;
    }
    h1{
        font-weight: 700;
        font-size: 17px;
        color: #000000;
    }
`
const Options = styled.div`
    width: 90%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .box{
        width: 48%;
        height: 114px;
        border-radius: 5px;
        border: none;
        background-color: #A328D6;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        padding: 10px;
        box-sizing: border-box;
        color: #FFFFFF;
    }
    ion-icon{
        width: 22px;
        height: 22px;
    }
    p{
        width: 64px;
        height: 40px;
        font-weight: 700;
        font-size: 17px;
        word-wrap: break-word;
    }
`