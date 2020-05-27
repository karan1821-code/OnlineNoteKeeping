
const checkingusername =(Request)=>{
if(Request.userName=="ADMIN" && Request.password=="ADMIN"){
    return "Valid Login"
}
else{
    return "Invalid Login"
}
} 

export default checkingusername