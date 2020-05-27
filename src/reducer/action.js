import * as actions from './actionTypes';

const setAddNoteRequest =(payload)=>{
    return {
    type:actions.SET_ADD_NOTE,
    payload
    }
}

const setViewEditRequest =(payload) =>{
    return {
        type :actions.SET_VIEW_EDIT,
        payload
    }
}


const setRegistration =(payload)=>{
    return {
        type :actions.SET_REGISTRATION_DETAIL,
        payload
    }
}

const setLoginName=(payload)=>{
    return {
        type :actions.SET_LOGIN_NAME,
        payload
    }
}

const uploadedUserforChecking=(payload)=>{
    return {
        type :actions.SET_UPLOADED_USER_FOR_CHECKING,
        payload
    }
}


const setDeleteNote=(payload)=>{
    return {
        type :actions.SET_DELETE_NOTE,
        payload
    }
}


const setRegisterLoginpage =(payload)=>{
    return {
        type :actions.SET_REGISTER_LOGIN_PAGE,
        payload
    }
}
export{
    setAddNoteRequest ,setViewEditRequest,setRegistration,setLoginName,uploadedUserforChecking,setDeleteNote,
    setRegisterLoginpage
}