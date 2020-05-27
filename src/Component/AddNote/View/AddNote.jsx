import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useGlobalState from '../../../Context';
import { showAlert } from '../../../Common/CommonAlert';
import { showSuccess } from '../../../Common/CommonAlert'
import readXlsxFile from 'read-excel-file';
import Spinner from 'react-spinner-material';
import "../Css/AddNote.css"
import "../../../css/main.css"
import "../../../css/react-confirm-alert.css";
import SideMenu from '../../SideMenu/View/SideMenu';
import { setAddNoteRequest, uploadedUserforChecking } from '../../../reducer/action'
import Logout from "../../Logout/View/Logout"


const AddNote = () => {
  const [loading, setLoading] = useState(false)
  const [userList, setUserList] = useState([])
  const [fileName, setFileName] = useState('')
  const [action, showAction] = useState(false)
  const [userListSelection, setUserListSelection] = useState([{ "roleId": "101", "roleName": "Contributor" }, { "roleId": "102", "roleName": "Reader" }])
  const [roleId, setRoleId] = useState([])
  const [noteName, setNoteName] = useState('')
  const [noteDesc, setNoteDesc] = useState('')
  const [mainNote, setMainNote] = useState('')
  const history = useHistory()
  const [{ ViewEditRequest, loginName,AddNoteRequest,RegistrationDetails }, dispatch] = useGlobalState();
  const [rst, setRst] = useState([])
  const [writeNote, setWriteNote] = useState(false)
  const [flag, setFlag] = useState('')
  const [valuefor,setValueFor] = useState('')
const [uploadedUser,setUploadedUser] = useState([])
const [nonUploadedUser,setNonUploadedUser] = useState([])
const [owner,setOwner] = useState('')

  useEffect(() => {
    if (ViewEditRequest!='') {
      setNoteName(ViewEditRequest.noteName)
      setMainNote(ViewEditRequest.mainNote)
      setNoteDesc(ViewEditRequest.noteDesc)
      setFlag(ViewEditRequest.flag)
      setValueFor(ViewEditRequest.index)
      setRoleId(ViewEditRequest.roleId)
      setUploadedUser(ViewEditRequest.uploadedUser)
      if(owner==ViewEditRequest.editOwnerName){
        setOwner(ViewEditRequest.editOwnerName)
      }
      else{
        setOwner(ViewEditRequest.editOwnerName)
      }
    }
    else {
      setNoteName('')
      setMainNote('')
      setNoteDesc('')
      setFlag('')
      setValueFor('')
      setRoleId([])
      setUploadedUser([])
    }


 



  }, []);

  const fileHandler = () => {
    setUserList([])
    const input = document.getElementById('upload-storedata')
    readXlsxFile(input.files[0]).then((rows, files) => {


      var storedata = [];

      for (let i = 1; i < rows.length; i++) {
        storedata.push(rows[i])
        for (let j = 0; j < storedata.length; j++) {
          var user =
          {
            userId: "",
            firstName: "",
            lastName: "",
          }
          user.userId = storedata[j][0]
          user.firstName = storedata[j][1]
          user.lastName = storedata[j][2]
         
        }
        {
          userList.push(user)
        console.log('storeListfinal', userList)
        }

      }
     
        for(let g=0;g<RegistrationDetails.length;g++){
          for(let r=0;r<userList.length;r++){
          if(userList[r].userId==RegistrationDetails[g].userId && userList[r].userId!=loginName){
            uploadedUser.push(userList[r].userId)
            dispatch(uploadedUserforChecking(uploadedUser))
          }
          else{ 
              nonUploadedUser.push(userList[r].userId)
          }
        }
        }


    var item = [...new Set(nonUploadedUser)]
    var  item2  = [...new Set(uploadedUser)]

        console.log(`uploaded user`,uploadedUser)
        console.log(`non uploaded user`,nonUploadedUser)

// for (let r=0;r<item.length;r++){
//   for(let p=0;p<item2.length;p++){
//     if(item[r]==item2[p]){
//       item.splice(r,1)
//     }
//   }
// }
// if(item){
//   showAlert("Following ")
// }
      setFileName('File Uploaded Successfully' )
     
      showAction(true)
    })

  }


  const submitNote = () => {
    if (mainNote) {
      if (flag == 1) {
        setWriteNote(false)
        var Request = {
          "noteName": noteName,
          "noteDesc": noteDesc,
          "userList": userList,
          "roleId": roleId,
          "mainNote": mainNote,
          "uploadedUser":uploadedUser,
          "ownerName":owner,
         
        }
        if(AddNoteRequest!=''){
          for(let  k=0;k<AddNoteRequest.length;k++){
            if(k===valuefor){
              AddNoteRequest.splice(valuefor,1)
              AddNoteRequest.push(Request)
            }
          }
        }
       
     
        dispatch(setAddNoteRequest(AddNoteRequest))    
         showSuccess("Note updated successfully.")
         setNoteName('')
         setNoteDesc('')
         setFileName('')
         setMainNote('')
         setWriteNote(false)
         setFlag('')
history.push('./MyNote')
      }
      else {
        setWriteNote(true)
      }
    }
    else {

      setWriteNote(false)
      showAlert("Empty note cannot be uploaded.")
    }
  }
  const userSelection = (e) => {
    let flag = []

    for (var i = 0; i < userListSelection.length; i++) {

      userListSelection[i].roleName === e.target.value ?
        flag.push(userListSelection[i].roleId) : setRoleId('')
    }
    setRoleId(flag)
  }


  const submitUserList = () => {

    if (noteName && noteDesc) {
      if (document.getElementById("SelQType1").value == "Select User") {
        showAlert("Please select user type ")
      }
      else {
 if(uploadedUser==""){
showAlert("Note cannot be created as uploaded user does not exist")
 } 
   else{   
        var Request = {
          "noteName": noteName,
          "noteDesc": noteDesc,
          "userList": userList,
          "roleId": roleId,
          "mainNote": mainNote,
          "uploadedUser":uploadedUser.toString(),
          "ownerName":loginName
        }
          
if(AddNoteRequest!=''){
 
  setLoading(true)
  AddNoteRequest.push(Request)
  setLoading(false)
  
}
else{
        rst.push(Request)
        setLoading(true)
        dispatch(setAddNoteRequest(rst))
        setLoading(false)
             }   
         showSuccess("Note added successfully.")
         setOwner(loginName)
         setNoteName('')
         setNoteDesc('')
         setFileName('')
         setMainNote('')
         setWriteNote(false)
         history.push('/MyNote')
      }
    }
  }
    else {
      showAlert("Please enter the required fields.")
    }


  }
  return (
    <div>
      <SideMenu />
      <section id="main-content">
        <section class="wrapper">
          <div class="row mt">
            <Logout props={loginName} />
            <h3><i class="fa fa-angle-right"></i>Add Note</h3>
            <hr />

            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <label>Write Your Note here</label><span class="required-mark"  >*</span>
              <textarea id="mainNote" type="text" class="form-control" onChange={(e) => setMainNote(e.target.value)} value={mainNote} autoComplete="off" />
            </div>

            <button
              type="button" className="btn btn-primary" id="notebtn" style={{ width: "15%", marginTop: "40px", height: "50px" }}
              onClick={(e) => submitNote(e)}
              disabled={loading}
            >Done</button>

            <hr />

            {writeNote ?
              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <label>Note Name</label><span class="required-mark"  >*</span>
                <input id="noteName" type="text" class="form-control" onChange={(e) => setNoteName(e.target.value)} value={noteName} autoComplete="off" />
              </div> : ''}
            {writeNote ?

              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <label>Note Description</label><span class="required-mark"  >*</span>
                <input id="noteName" type="text" class="form-control" onChange={(e) => setNoteDesc(e.target.value)} value={noteDesc} autoComplete="off" />
              </div>
              : ''}
            {writeNote ?
              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <label>Upload File</label><span class="required-mark"  >*</span>
                <div class="upload-holder">

                  <input id="store-list" type="text" class="form-control input-upload"
                    value={fileName}
                  />

                  <span class="btn-upload" style={{ padding: "7px 25px" }}>Upload</span>
                  <input id="upload-storedata" type="file" name="Store-list-data" class="input-hidden"
                    onChange={() => fileHandler()}
                    accept=".xlsx,.xls" />


                </div>
                <span class="help-block">Sample File <a
                  href={require("../../../doc/OnlineNoteKeeping.xlsx")}
                >UserCreation.xls</a></span>

              </div> : ''}
            {action && writeNote?
              <div class="col-lg-2 col-md-4 col-sm-5 col-xs-12">
                <label>Select User</label><span class="required-mark"  >*</span>
                <br />

                <select class="form-control" id="SelQType1"
                  onChange={(e) => userSelection(e)}
                >
                  <option>Select User</option>
                  {
                    userListSelection.map(function (item, key) {
                      return (<option  >{item.roleName}</option>)
                    })
                  }
                </select>
              </div> : ''}
            {action  && writeNote ?
              <div className="btns">
                <button
                  type="button" className="btn btn-primary" id="loginbtn" style={{ width: "30%" }}
                  onClick={(e) => submitUserList(e)}
                  disabled={loading}
                >Submit</button>
              </div> : ''}
          </div>



        </section>
      </section>
    </div>

  )
}

export default AddNote