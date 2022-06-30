import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import UserContext from "../contexts/UserContext";

import logo from "./assets/images/MyWallet.png";

export default function SignIn(){
    return (
        <div>
            <img alt="MyWallet logo" src={logo} />
        </div>
    );
}