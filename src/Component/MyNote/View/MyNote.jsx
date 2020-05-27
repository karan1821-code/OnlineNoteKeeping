import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {setViewEditRequest} from '../../../reducer/action'
import useGlobalState from '../../../Context';
import SideMenu from '../../SideMenu/View/SideMenu';
import '../Css/MyNote.css'
import '../../../css/main.css'
import Logout from "../../Logout/View/Logout"
import { showSuccess } from '../../../Common/CommonAlert';



const MyNote =() =>{
const [{ AddNoteRequest, loginName  }, dispatch] = useGlobalState();
const history = useHistory()

const deleteNote =(e,key) =>{
  AddNoteRequest.splice(key, 1);
  showSuccess("Note deleted successfully.")
  history.push('/MyNote')
}

const updateNote =(key,mainNote,noteName,noteDesc,roleId,uploadedUser,ownerName)=>{
  let ViewEditRequest={
    "mainNote":mainNote,
    "noteName":noteName,
    "noteDesc":noteDesc,
    "roleId":roleId,
    "uploadedUser":uploadedUser,
    "flag":1,
    "index":key,
    "editOwnerName":ownerName
  }
  dispatch(setViewEditRequest(ViewEditRequest))
  history.push("./AddNote")
}

const onAddNotePage=()=>{
  let ViewEditRequest={
    "mainNote":"",
    "noteName":"",
    "noteDesc":"",
    "roleId":[],
    "uploadedUser":[],
    "editOwnerName":"",
    "ownerName":"",
  
  }
  dispatch(setViewEditRequest(ViewEditRequest))

  history.push('/AddNote')
}

useEffect(()=>{
 console.log(`View`,AddNoteRequest)
 
})

    return(
        <div>
        <SideMenu />
        <section id="main-content">

        <section className="wrapper">
        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12">
        <a className="btn btn-primary" style={{"margin-left": "850px","width": "130px"}} onClick={(e)=>onAddNotePage(e)}><span style={{color:"white"}}>+ Add Note</span></a>
       
<Logout  props={loginName} />
<div className="mt">
<div className="tbl-holder">
<table className="table table-striped table-advance table-hover table-bordered tbl-ticker tbl-hhide">
 <thead>

    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Action</th>
    </tr>
  </thead>
</table>


  <table className="table table-striped table-advance table-hover table-bordered tbl-ticker mob-tbl">
    <tbody>


      {AddNoteRequest.map(function (item, key) {
 
        return (
         
          <tr key={key}>
          {item.ownerName==loginName ?  <td  data-th="Note Name"  className="black-text" > {item.noteName}</td>    :''}       
             {item.ownerName==loginName ?  <td data-th="Note Desc">{item.noteDesc}</td> :''}
            
             {item.ownerName==loginName ?
            <td data-th="Action">
      <a className="edit-icon" onClick={(e)=>updateNote(key,item.mainNote,item.noteName,item.noteDesc,item.roleId,item.uploadedUser,item.ownerName)} > <i className="fa fa-pencil "></i> </a>
        <a className="delete-icon" onClick={(e)=>deleteNote(e,key)}> <i className="fa fa-trash-o "></i> </a>

            </td>:''}
            

          </tr>
        )
      })}</tbody>

  </table>
</div>
</div>
</div>
</section>
</section>
</div>
    )
}

export default MyNote