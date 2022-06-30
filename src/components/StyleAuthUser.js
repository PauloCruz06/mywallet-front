import styled from "styled-components";

export const Div = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    a{
        color: #FFFFFF;
        font-family: 'Raleway', sans-serif;
        font-weight: 700;
        font-size: 15px;
        text-decoration: none;
    }
`
export const Image = styled.img`
    width: 147px;
    height: 50px;
    object-fit: contain;
    margin-top: -120px;
    margin-bottom: 28px;
`
export const Form = styled.form`
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    .pale{
        filter: contrast(75%);
    }
    > input{
        width: 326px;
        height: 58px;
        background-color: #FFFFFF;
        color: #000000;
        font-family: 'Raleway', sans-serif;
        font-weight: 400;
        font-size: 20px;
        border-radius: 5px;
        border: none;
        padding-left: 15px;
        margin-bottom: 13px;
        box-sizing: border-box;
        ::placeholder{
            color: #000000;
        }
    }
    > button{
        width: 326px;
        height: 46px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #A328D6;
        color: #FFFFFF;
        font-family: 'Raleway', sans-serif;
        font-weight: 700;
        font-size: 20px;
        border-radius: 5px;
        border: none;
        margin-bottom: 32px;
    }
`