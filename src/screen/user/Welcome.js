// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, TextInput, ImageBackground, View, Dimensions, TouchableOpacity, Image, StyleSheet , AsyncStorage} from 'react-native';
import { Container, Content, Text, Icon, Button, Left, } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {
  BarIndicator,
} from 'react-native-indicators';

const URL = require("../../component/server");

import Navbar from '../../component/Navbar';
import color from '../../component/color';
import colors from '../../component/color';


export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: false,
      email: '',
      password: '',
      GuserInfo: {},
    };
  }

  componentDidMount()
  {
    
  }




  processLogin() {
    const {email, password } = this.state
    if (email == "" || password == "") {
      Alert.alert('Validation failed', 'field(s) cannot be empty', [{ text: 'Okay' }])
      return;
    }
    this._signInRequest(email, password, false);

  }

  _signInRequest(email, password, social){
     console.warn(URL.url);
    this.setState({ loading: true })
    fetch(URL.url + 'users/authenticate', {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }, body: JSON.stringify({
        Username: email,
        Password: password,
        IsSocial: social
      }),
    })
      .then(res => res.json())
      .then(res => {

        if (res.status) {
          this.setState({ loading: false })
          AsyncStorage.setItem('login', 'true');
          AsyncStorage.setItem('data', JSON.stringify(res));
          AsyncStorage.setItem('bal', this.currencyFormat(res.balance));
          if(social){
            this._updateProfileRequest(res)
          }else{
            AsyncStorage.setItem('user', JSON.stringify(res.user));
            Actions.home();
          }
        } else {
          Alert.alert('Login failed', res.message, [{ text: 'Okay' }])
          this.setState({ loading: false })
        }
      }).catch((error) => {
        this.setState({ loading: false })
        console.warn(error);
        alert(error.message);
      });

  }




  

  render() {
  
  
    return (
        <Container style={{ backgroundColor: 'transparent' }}>
        
          <Content>
            <View style={styles.body}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/logo.png')} />
           </View>
              <Text style={{ color: colors.primary_color, margin: 20, fontWeight: '900', fontSize: 25, }}>Sign In </Text>
              <View style={styles.bottom}>

              
                    <View>
                      <Button onPress={() => Actions.login({type: 'replace'})} style={styles.buttonContainer} block iconLeft>
                        <Text style={{ color: '#fdfdfd', fontWeight: '600' }}>SIGN IN </Text>
                      </Button>

                      <Button onPress={() => Actions.reg({type: 'replace'})}  style={styles.whiteButtonContainer} block iconLeft>
                        <Text style={{ color: colors.primary_color,fontWeight: '600' }}>SIGN UP </Text>
                      </Button>
                    </View>



              </View>

              <View style={{height:100}}></View>

            </View>
          </Content>
        </Container>
    );
  }



  itemClicked(item) {
    Actions.product();
  }



}
const styles = StyleSheet.create({
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  gcontainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  body: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: colors.primary_color,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 20,
    marginTop: 20,
  },
  whiteButtonContainer: {
    backgroundColor: '#FFFFFF',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 0.8,
    borderColor:colors.primary_color,
  },
  top: {
  
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
   
  },
  input: {
    height: 45,
    color: '#3E3E3E',
    paddingLeft:15,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 20,
    borderColor: '#000000',
    borderWidth: 0.8,
    borderRadius:20,
    marginTop: 1
  },
  actionbutton: {
    marginTop: 2,
    marginRight: 13,
    marginLeft: 20,
    fontSize: 12,
    color: '#3E3E3E',
    textAlign: 'left',
    fontWeight: '200'
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },

  logo: {
    width: 220,
    height: 170,
    justifyContent: 'center',
    resizeMode: 'contain'
  }
});



