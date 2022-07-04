import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";
import UserContext from "../contexts/UserContext";

export default function Transactionslist({day, description, amount, isPayment, id, update}){
    const [loading, setLoading] = useState(false);
    const { userdata } = useContext(UserContext);
    const navigate = useNavigate();
    
    function deleteTransaction(id){
        setLoading(true);
        if(userdata){
            console.log(id);
            const config = {
                headers: {
                    Authorization: `Bearer ${userdata.token}`
                }
            }
            const promise = axios.delete(
                `https://projeto13mywalletdb.herokuapp.com/transactions/${id}`,
                config,
            );

            promise.then(() => {
                setLoading(true);
                update();
            }).catch(() =>
                alert("Não foi possível deletar transação")
            );
        } else{
            setLoading(false);
        }
    }
    
    return(
        <Transaction>
            <div className="day_descpription">
                <div className="day">{`${day}`}</div>{`${description}`}
            </div>
            <div className={isPayment ? "amount red" : "amount green"}>
                {amount.toFixed(2).toString().replace(".",",")}
                <ion-icon
                    onClick ={loading ? null : () => deleteTransaction(id)} name="close-outline"
                ></ion-icon>
            </div>
        </Transaction>
    );
}

const Transaction = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    font-weight: 400;
    font-size: 16px;
    .day_descpription{
        width: auto;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: #000000;
    }
    .day{
        color: #C6C6C6;
        margin-right: 6px;
    }
    .amount{
        width: auto;
        height: auto;
    }
    .green{
        color: #03AC00;
    }
    .red{
        color: #C70000;
    }
    ion-icon{
        color: #C6C6C6;
        margin-left: 6px;
    }
`