import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useGlobalState from '../../../Context';
import { showAlert } from '../../../Common/CommonAlert';
import Spinner from 'react-spinner-material';
import "../Css/Login.css"
import "../../../css/main.css"
import "../../../css/react-confirm-alert.css";
import {setLoginName,setRegisterLoginpage} from '../../../reducer/action'



const Login = () =>{
    const [loading, setLoading] = useState(false)
    const[userName,setUserName] = useState('')
    const [passwords,setPasswords] = useState('')
    const history = useHistory()
    const [{RegistrationDetails,checkingUser}, dispatch] = useGlobalState();

    useEffect(() => {
console.log(`checkingUser`,checkingUser)
    }, []);


    const onChangeUserName =(e) =>{
        setUserName(e.target.value)
    }
    

    const onChangePassword =(e)=>{
        setPasswords(e.target.value)
    }

    const handleKeyPress =(target) =>{
        if (target.charCode == 13) { 
            document.getElementById("loginbtn").click() 
        }
    }


   const  onRegisterPage =()=>{
     dispatch(setRegisterLoginpage(RegistrationDetails))
     history.push("/UserRegistration")
   }
    const loginValid=async() =>{
      let a=0
    if(userName && passwords){
      for(let i=0;i<RegistrationDetails.length;i++){
        if(RegistrationDetails[i].userId==userName && RegistrationDetails[i].password==passwords ){
                                      a=a+1;
                                      break;
        }
        else{
                                      a=0
        }
      }
// const  checkresponse = await checkLogin(userName,passwords)
if(a>0)
{
dispatch(setLoginName(userName))
history.push("/MyNote")
} 

else{
  showAlert("Invalid Login")
}
}
    else{
        showAlert("Please Enter the Required Fields.")
    }
} 
return (
  
  <div id="login-page" className="back-image" style={{ height: "100vh" }}>
    <div className="container" >
      <form className="form-login animate" action="index.html" autocomplete="off">
        <h2 className="form-login-heading">sign in now</h2>
        <div className="login-wrap ">
            <div className="spin">
              <Spinner visible={loading}  spinnerColor={"rgba(0, 0, 0, 0.3)"} />
             </div>

          <label>User ID</label>
          <input type="text" input  value={userName}  id="userLogin"  onChange={(e)=>onChangeUserName(e)}  className="form-control" placeholder="User ID" maxLength="10" autofocus="true" onKeyPress={(e)=>handleKeyPress(e)}
            readonly onfocus="this.removeAttribute('readonly');" autoComplete="off"/>
          <br />
        

          <label>Password</label>
          <input type="password"  value ={passwords} className="form-control" placeholder="Password" id="userPassword" maxLength="20" onChange={(e)=>onChangePassword(e)}  onKeyPress={(e)=>handleKeyPress(e)}
           readonly
            onfocus="this.removeAttribute('readonly');"  autoComplete="off" />
           <br />

         
           <div className="btns">
           <button
                  type="button"  className="btn btn-primary"   id="loginbtn"  style={{ width: "100%" }} onClick={(e) => loginValid(e)}
                  disabled={loading}
                >Login</button>
           </div>
           <div style={{"text-align":"end"}}>
                  <a
                onClick={()=>onRegisterPage()}
                  id="registerbtn" >Register here</a>
                </div>

        </div>
      </form>
    </div>
  </div>
)
}

export default Login