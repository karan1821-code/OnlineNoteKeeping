import checkingusername from "./checkingusername"

const checklogin =async(usnm,pswd)=>{
    const Request = {

        "userName": usnm,
        "password": pswd
    };
   
    try {
        const response = await checkingusername(Request)
     
        return response;

    } catch (error) {
        console.error(error);
    }


}



export default checklogin;