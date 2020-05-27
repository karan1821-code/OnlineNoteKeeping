import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {setAddNoteRequest,setViewEditRequest} from '../../../reducer/action'
import useGlobalState from '../../../Context';
import SideMenu from '../../SideMenu/View/SideMenu';
import '../Css/ViewNote.css'
import Logout from "../../Logout/View/Logout"
import { confirmAlert } from 'react-confirm-alert';
import { showSuccess } from '../../../Common/CommonAlert';



const ViewNote =() =>{
const [data,setData] =useState([])
const [dataView,setDataView] = useState([])
const [viewData,setViewData] = useState(false)
const [{ AddNoteRequest,ViewNoteRequest, loginName  }, dispatch] = useGlobalState();
const history = useHistory()



const updateNote =(key,mainNote,noteName,noteDesc,roleId,uploadedUser)=>{
  let ViewEditRequest={
    "mainNote":mainNote,
    "noteName":noteName,
    "noteDesc":noteDesc,
    "roleId":roleId,
    "uploadedUser":uploadedUser,
    "flag":1,
    "index":key,
  }
  dispatch(setViewEditRequest(ViewEditRequest))
  history.push("./AddNote")
}

useEffect(()=>{
 console.log(`View`,AddNoteRequest)
 
})

    return(
        <div>
        <SideMenu />
        <section id="main-content">
          {console.log(`pt`,AddNoteRequest)}
        <section className="wrapper">
        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12">
        <div className="mt">
<Logout  props={loginName} />
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


            <td  data-th="Note Name"  className="black-text" > {item.noteName}</td>           
            <td data-th="Note Desc">{item.noteDesc}</td>
            
            
            <td data-th="Action">
            {item.uploadedUser!=loginName ? <a className="edit-icon" onClick={(e)=>updateNote(key,item.mainNote,item.noteName,item.noteDesc,item.roleId,item.uploadedUser)} > <i className="fa fa-pencil "></i> </a>:''}
            {/* {item.uploadedUser!=loginName || item.roleId==undefined ?   <a className="delete-icon" onClick={(e)=>deleteNote(e,key)} */}
              {/* > <i className="fa fa-trash-o "></i> </a>:''} */}

            </td>
            

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

export default ViewNote