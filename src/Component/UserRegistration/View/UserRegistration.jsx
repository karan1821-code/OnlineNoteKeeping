import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useGlobalState from '../../../Context';
import { showAlert } from '../../../Common/CommonAlert';
import { showSuccess } from '../../../Common/CommonAlert'
import "../Css/UserRegistration.css"
import "../../../css/main.css"
import "../../../css/react-confirm-alert.css";
import { setRegistration } from '../../../reducer/action'
import Logout from '../../Logout/View/Logout';



const UserRegistration = () => {
        const [userid, setUserId] = useState(0)
        const [firstName, setFirstName] = useState('')
        const [lastName, setLastName] = useState('')
        const [registrationDetails] = useState([])
        const [password, setPassword] = useState('')
        const [{ RegistrationDetails }, dispatch] = useGlobalState()

useEffect(()=>{
        console.log(`check`,RegistrationDetails)
       
})
        const submitUserReg = (e) => {
                if (firstName && lastName && password) {
                          setUserId(userid+1)                            
                          let registration = {
                                "userId": userid,
                                "firstName": firstName,
                                "lastName": lastName,
                                "password": password
                        }
                        registrationDetails.push(registration)
                        dispatch(setRegistration(registrationDetails))
                        showSuccess("User registration done successfully." + "Your user id is:" + userid)
                        setFirstName('')
                        setLastName('')
                        setPassword('')

                }
                else {
                        showAlert("Please enter the required fields.")
                }
        }

        return (
                <div>
                        <section id="main-content">
                                <section class="wrapper">
                                        <div class="row mt">
                                                <Logout />
                                                <h3>User Registration</h3>
                                                <hr />


                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <label>First Name</label><span class="required-mark"  >*</span>
                                                        <input id="fName" type="text" class="form-control" onChange={(e) => setFirstName(e.target.value)} value={firstName} autoComplete="off" />
                                                </div>
                                                <br />

                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <label>Last Name</label><span class="required-mark"  >*</span>
                                                        <input id="lName" type="text" class="form-control" onChange={(e) => setLastName(e.target.value)} value={lastName} autoComplete="off" />
                                                </div>


                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <label>Password</label><span class="required-mark"  >*</span>
                                                        <input id="password" type="text" class="form-control" onChange={(e) => setPassword(e.target.value)} value={password} autoComplete="off" />
                                                </div>

                                                <div className="btns">
                                                        <button type="button" className="btn btn-primary" id="loginbtn" style={{ width: "30%", marginTop: "20px" }}
                                                                onClick={(e) => submitUserReg(e)}
                                                        //disabled={loading}
                                                        >Submit</button>
                                                </div>
                                        </div>



                                </section>
                        </section>
                </div>
        )
}

export default UserRegistration