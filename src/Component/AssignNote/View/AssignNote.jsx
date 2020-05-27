import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {setViewEditRequest} from '../../../reducer/action'
import useGlobalState from '../../../Context';
import SideMenu from '../../SideMenu/View/SideMenu';
import '../Css/AssignNote.css'
import '../../../css/main.css'
import Logout from "../../Logout/View/Logout"
import { setAddNoteRequest } from '../../../reducer/action'


const AssignNote =() =>{
      
        const [{ AddNoteRequest, AssignNoteRequest,loginName  }, dispatch] = useGlobalState();
        const[notedisplay,setNoteDisplay] = useState('')
        const [displayNote,setDisplayNote]=useState(false)
        
        const history = useHistory()
        const display = {
          display: 'block'
        };
        const hide = {
          display: 'none'
        };
       
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
        
        useEffect(()=>{
            console.log(`assign `, AssignNoteRequest)    
        })


       const  openModal =(e,mainNote) =>{
        setDisplayNote(true)
         setNoteDisplay(mainNote)
        }

        const modalClose= (e)=>{
          setDisplayNote(false)
        }
        
            return(

                <div>
<div className="modal" role="dialog" style={displayNote?display:hide}>
<div className="modal-dialog animate">
<div className="modal-content">
<div className="modal-header">
<a className="close" style={{color: "blue","margin-right":"3px"}}
 onClick={(e)=>modalClose(e)}
 >X</a>
</div>
<div className="modal-body">
<div className="form-horizontal">
<div className="form-group">
<h4 className="control-label col-sm-4">Your Note :</h4>
<div className="col-sm-8">
<textarea class="form-control" id="mainNote" autoComplete="off" value={notedisplay} disabled></textarea>
</div>
  </div>
 
</div>


</div>
</div>

</div>
</div>





                <SideMenu/>
                <section id="main-content">
                <section className="wrapper">
                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12">
                <div className="mt">
        <Logout props={loginName}/>
       
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
        
                // if ((Search !== "" || (searchSDate) !== "" || (searchedDate) !== "" ) &&
                //   (item.tickerText.toLowerCase().indexOf(Search.toLowerCase()) ||
                //   // item.taskDescr.toLowerCase().indexOf(searcheddesc.toLowerCase())||
                //     item.startDate.toLowerCase().indexOf(searchSDate.toLowerCase()) ||
                //     item.endDate.toLowerCase().indexOf(searchedDate.toLowerCase())) === -1) {
                //   return null
                // }
        
                
        
                return (
        
                  <tr key={key}>
        
        
        {item.uploadedUser.search(loginName)>=0 ? <td  data-th="Note Name" > {item.noteName}</td>  :''}         
        {item.uploadedUser.search(loginName)>=0 ?  <td data-th="Note Desc">{item.noteDesc}</td> :''}
                    
        {item.uploadedUser.search(loginName)>=0 ?
                    <td data-th="Action">
                {item.roleId=="101" ?      <a className="edit-icon"
                        onClick={(e)=>updateNote(key,item.mainNote,item.noteName,item.noteDesc,item.roleId,item.uploadedUser,item.ownerName)}
                        > <i className="fa fa-pencil "></i> </a>:
                        <a className="black-text" onClick={(e)=>openModal(e,item.mainNote)}>View</a>}
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


export default AssignNote