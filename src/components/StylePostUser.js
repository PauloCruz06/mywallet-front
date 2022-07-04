import styled from "styled-components";

export const Div = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: 25px;
`

export const Topbar = styled.div`
    width: 326px;
    height: auto;
    margin-bottom: 22px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    > p{
        color: #FFFFFF;
        font-weight: 700;
        font-size: 26px;
        margin-bottom: 20px;
    }
`