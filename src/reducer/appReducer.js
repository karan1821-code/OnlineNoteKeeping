import initialState from './initialState';
import * as actions from './actionTypes';

const reducer = (state = initialState, action) => {
    console.log(action.payload);
    switch (action.type) {
        case actions.SET_ADD_NOTE: {
            
            return {
                ...state,
                AddNoteRequest: action.payload,
                ViewNoteRequest:action.payload,
                AssignNoteRequest:action.payload
            }
        }
     
        case actions.SET_VIEW_EDIT: {
            
            return {
                ...state,
                ViewEditRequest: action.payload
            }
        }
     
        case actions.SET_REGISTRATION_DETAIL: {
            
            return {
                ...state,
                RegistrationDetails: action.payload
            }
        }

        case actions.SET_REGISTER_LOGIN_PAGE:{
            return{
                ...state,
                RegistrationDetails:action.payload
            }
        }
       case actions.SET_LOGIN_NAME :{
           return{
               ...state,
               loginName:action.payload
           }
       }

       case actions.SET_UPLOADED_USER_FOR_CHECKING :{
        return{
            ...state,
            checkingUser:action.payload
        }
    }


    case actions.SET_DELETE_NOTE:{
return {
    ...state,
    AddNoteRequest:action.payload
}
    }
        default: {
            return state;
        }
    }
}

export default reducer;