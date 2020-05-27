import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useGlobalState from '../../../Context';
import "../Css/SideMenu.css"

const  SideMenu =()=>{
  const history = useHistory()
  const[{AddNoteRequest,ViewNoteRequest, AssignNoteRequest},dispatch]=useGlobalState()

const myNote=()=>{
  
history.push('/MyNote')
}

const viewNote =() =>{
  history.push('/ViewNote')
}


const assignNote =() =>{
  history.push('/AssignNote')
  
}
return(
   <aside>
    
              <div id="sidebar" class="nav-collapse ">
             
                <ul class="sidebar-menu" id="nav-accordion">
                  <li className="sub-menu mt" style={{"margin-top":"100px"}}> <a onClick={(e)=>myNote(e)}> <i className="fa fa-tasks"></i> <span>My Note</span> </a>
               
                  </li>
                  <li className="mt"> <a onClick={(e)=>assignNote(e)}> <i class="fa fa-tasks"></i> <span>Assign Note</span> </a> </li>

                </ul>
              
              </div>
            </aside>
)
}

export default SideMenu