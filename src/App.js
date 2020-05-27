
import React, { Component } from 'react';
import PrivateRoutes from './PrivateRoutes';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import WithGlobalState from './WithGlobalState';
import BackgroundLoader from './BackgroundLoader';
import ErrorBoundary from './ErrorBoundary';
import { StateProvider } from './Context';
import Login from "./Component/Login/View/Login";
import AddNote from "./Component/AddNote/View/AddNote"
import SideMenu from "./Component/SideMenu/View/SideMenu"
import ViewNote from "./Component/ViewNote/View/ViewNote"
import MyNote from "./Component/MyNote/View/MyNote"

import UserRegistration from  "./Component/UserRegistration/View/UserRegistration"
import AssignNote from "./Component/AssignNote/View/AssignNote"
import Logout from "./Component/Logout/View/Logout"
import './font-awesome/css/font-awesome.css'



class App extends Component {

  componentDidCatch(err) {
    
    this.props.history.push({
      pathname: '/',
    });
  }

  render() {
    return (
      // <BrowserRouter >
      // <Switch>
      // <Route exact path="/" component={Login}/>
      
      // </Switch>
      // </BrowserRouter> 
      <ErrorBoundary>
        <React.Suspense fallback={<BackgroundLoader />}>
        <StateProvider>
         <BrowserRouter >
       <Switch>
       <Route exact path="/" component={Login}/>
      <Route exact path="/AddNote" component={AddNote}/>
      <Route exact path ="/SideMenu" component={SideMenu}/>
      <Route exact path ="/ViewNote" component={ViewNote}/>
      <Route exact path ="/MyNote" component ={MyNote}/>
      <Route exact path ="/UserRegistration" component={UserRegistration}/>
      <Route exact path ="/AssignNote" component={AssignNote}/>
      <Route exact path ="/Logout" component={Logout}/>
       </Switch>
       
       </BrowserRouter>
       </StateProvider>
       </React.Suspense>
      </ErrorBoundary>
      
     
      //           <Route exact path="/" render={
      //             (routeProps) => {
      //               return (
      //                 <WithGlobalState>
      //                   <Login {...routeProps} />
      //                 </WithGlobalState>
      //               )
      //             }
      //           } />

              
               
      //           <Route exact path="/Login" component={Login} />      
      //           <PrivateRoutes>
      //             <Switch>
                
                  
      //             </Switch>
      //           </PrivateRoutes>
     
    );
  }
}

export default App;