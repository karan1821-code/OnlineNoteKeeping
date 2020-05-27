import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useGlobalState from '../../../Context';
import Spinner from 'react-spinner-material';
import "../Css/Logout.css"
import "../../../css/main.css"
import "../../../css/react-confirm-alert.css";
import {setRegistration} from '../../../reducer/action'



const Logout =(props)=>{
    const history = useHistory()

const logout=()=>{
    localStorage.clear();
    history.replace('/');
}

return (
    <header className="header black-bg" >
     <a className="logo"><h5>Welcome {props.props}</h5></a>
    <ul className="nav pull-right pos-rel">
        <a  data-toggle="dropdown" onClick={()=>logout()}> <h5>Logout</h5> 
   </a>
    
    
    </ul>
  </header>
)
}

export default Logout