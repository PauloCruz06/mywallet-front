import styled from "styled-components";

export default function Transactionslist({day, description, amount, isPayment}){
    return(
        <Transaction>
            <div className="day_descpription"><div className="day">{`${day}`}</div> {`${description}`}</div>
            <div className={isPayment ? "amount red" : "amount green"}>{amount.toFixed(2).toString().replace(".",",")}</div>
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
`