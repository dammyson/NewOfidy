/**
* This is the Main file
* This file contains the routes of all the pages
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Root } from 'native-base';
import { Scene, Router, Actions } from 'react-native-router-flux';




import Splash from '../../screen/onboarding/Splash';

import Login from '../../screen/user/Login';
import Register from '../../screen/user/Register';
import Home from '../../screen/activity/Home';
import Welcome from '../../screen/user/Welcome';
import ForgetPassword from '../../screen/user/ForgetPassword';
import ChangePassword from '../../screen/user/ChangePassword';
import Cart from '../../screen/activity/Cart';


''
export default class Main extends Component {
 
  componentDidMount () {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    switch (Actions.currentScene) {
      case 'home':
        BackHandler.exitApp()
        break

      default: Actions.pop()
    }

    return true
  }

  render() {
    return(
      <Root>
        <Router>
          <Scene key="root">
            <Scene initial key="splash" component={Splash} hideNavBar />
            <Scene key="login" component={Login} hideNavBar />
            <Scene key="reg" component={Register} hideNavBar />
            <Scene key="home" component={Home} hideNavBar />
            <Scene key="welcome" component={Welcome} hideNavBar />
            <Scene key="forgetpass" component={ForgetPassword} hideNavBar />
            <Scene key="changepass" component={ChangePassword} hideNavBar />
            <Scene key="cart" component={Cart} hideNavBar />
           
     
          </Scene>
        </Router>
      </Root>
    );
  }

}
