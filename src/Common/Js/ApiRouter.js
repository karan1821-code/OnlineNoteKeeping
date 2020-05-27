import axios from 'axios';
import { basicAuth } from './basicAuth';
import config from '../config';

// *************** For API Call **********************
const postApiCall = async (Request, ApiName) => {
  try{   
      return await axios.post(ApiName,
        Request)
    

  }
  catch (err) {
    console.log("err.message : ", err);
    return "1000";
  }
}




const createHeaderStoreID = () => {

  if (config.applicationType == 'React') {
    var basicAuthVal = basicAuth(config.userID);
    basicAuthVal = 'Basic ' + basicAuthVal
  }
  else {
    basicAuthVal = config.basicAuth
  }

  var rquestHeader = {
    Accept: 'application/json',
    'Content-Type': 'text/plain',
    authorization: basicAuthVal,
    GUID: config.guid,
    storeid: config.storeID,
    USERID: config.userID,
    Circle : config.custCircleHeader

  }

  return rquestHeader;

}



// ***************** For New Enc Headers
const createHeaderForNewEncryption = (header, basicAuth) => {
  var rquestHeader = {
    Accept: 'application/json',
    'Content-Type': 'text/plain',
    Authorization: basicAuth,
    GUID: config.guid,
    // storeid: config.storeID,
    KEY: header,
    USERID: config.userID,
    Circle : config.custCircleHeader  
  }

  return rquestHeader;
}








export {
  postApiCall, createHeaderForNewEncryption
  , createHeaderStoreID
};