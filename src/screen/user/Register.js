// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, TextInput, ImageBackground, View, Dimensions, TouchableOpacity, Image, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, Text, Icon, Button, Left, } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {
  BarIndicator,
} from 'react-native-indicators';

const URL = require("../../component/server");

import Navbar from '../../component/Navbar';
import color from '../../component/color';
import colors from '../../component/color';


export default class Registration extends Component {
  constructor(props) 
  {
      super(props);
      this.state = {
        loading: false,
        email: "", 
        phone: "", 
        uname: "", 
        lname: "", 
        lname: "", 
        password: "",
                  }

  }

  checkReg()
    {
    
        const {email,phone, uname, fname, lname,  password} = this.state
          if(email == "" || password == "" || phone == "" || uname == "" || lname == ""|| fname == ""){
            Alert.alert('Validation failed', 'field(s) cannot be empty', [{text: 'Okay'}])
            return
          }
        this.setState({ loading: true})
        const formData = new FormData();
        formData.append('code', "customer");
        formData.append('action', "register");
        formData.append('pwd', password);
        formData.append('email', email);
        formData.append('fname', fname);
        formData.append('lname', lname);
        formData.append('uname', uname);
        formData.append('mobile', phone);
        formData.append('telephone', phone);
        formData.append('memword', "food");
        formData.append('day', "2");
        formData.append('month', "2");
        formData.append('year', "1990");
        formData.append('gender', "M");

        fetch('https://www.ofidy.com/dev-mobile/v1/api.php', { method: 'POST',  headers: {
          Accept: 'application/json',
        }, body:formData,  
        })
        .then(res => res.json())
        .then(res => {
          console.warn(res);
          if(!res.error){
          this.setState({ loading: false})
          AsyncStorage.setItem("user_id", res.id);
          AsyncStorage.setItem("session_id", res.sid);
          Actions.home({type: 'replace'});

          }else{
        Alert.alert('Registration failed', res.message, [{text: 'Okay'}])
        this.setState({ loading: false})
          }
        }).catch((error)=>{
          console.warn(error);
          alert(error.message);
       });
   }



  render() {


    return (
      <Container style={{ backgroundColor: 'transparent' }}>

        <Content>
          <View style={styles.body}>
            <View style={styles.top}>
              <Image
                style={styles.logo}
                source={require('../../assets/logo.png')} />
            </View>
            <Text style={{ color: colors.primary_color, margin: 20, fontWeight: '900', fontSize: 25, }}>Sign Up </Text>
            <View style={styles.bottom}>

              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor='#3E3E3E'
                returnKeyType="next"
                onSubmitEditing={() => this.phone.focus()}
                keyboardType='email-address'
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                inlineImageLeft='ios-call'
                onChangeText={text => this.setState({ email: text })}
              />
              <TextInput
                placeholder="Enter your phone number"
                placeholderTextColor='#3E3E3E'
                returnKeyType="next"
                onSubmitEditing={() => this.firstname.focus()}
                keyboardType='numeric'
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                inlineImageLeft='ios-call'
                onChangeText={text => this.setState({ phone: text })}
                ref={(input) => this.phone = input}
              />
              <TextInput
                placeholder="Enter your first name"
                placeholderTextColor='#3E3E3E'
                returnKeyType="next"
                onSubmitEditing={() => this.lastname.focus()}
                keyboardType='email-address'
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                inlineImageLeft='ios-call'
                onChangeText={text => this.setState({ fname: text })}
                ref={(input) => this.firstname = input}
              />
              <TextInput
                placeholder="Enter your last name"
                placeholderTextColor='#3E3E3E'
                returnKeyType="next"
                onSubmitEditing={() => this.username.focus()}
                keyboardType='email-address'
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                inlineImageLeft='ios-call'
                onChangeText={text => this.setState({ lname: text })}
                ref={(input) => this.lastname = input}
              />
              <TextInput
                placeholder="Enter your username"
                placeholderTextColor='#3E3E3E'
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType='email-address'
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                inlineImageLeft='ios-call'
                onChangeText={text => this.setState({ uname: text })}
                ref={(input) => this.username = input}
              />
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor='#3E3E3E'
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={() => this.checkReg()}
                keyboardType='password'
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                inlineImageLeft='ios-call'
                onChangeText={text => this.setState({ password: text })}
                ref={(input) => this.passwordInput = input}
              />
              {
                this.state.loading ?
                  <View>
                    <Button style={styles.buttonContainer} block iconLeft>
                      <BarIndicator count={4} color={'#fff'} />
                    </Button>
                  </View>
                  :
                  <View>
                    <Button onPress={() => this.checkReg()} style={styles.buttonContainer} block iconLeft>
                      <Text style={{ color: '#fdfdfd', fontWeight: '600' }}>SIGN UP </Text>
                    </Button>
                  </View>
              }



              <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 30, marginRight: 30 }}>
                <TouchableOpacity onPress={() => Actions.login({ type: 'replace' })}>
                  <Text style={{ color: colors.primary_color, fontWeight: '600', fontSize: 13, }}>Login Account  </Text>
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', }} />



                <View style={{ width: 1, backgroundColor: colors.primary_color }} />

                <View style={{ flex: 1, justifyContent: 'center', }} />



                <TouchableOpacity onPress={() => Actions.forgetpass({ type: 'replace' })}>
                  <Text style={{ color: colors.primary_color, fontWeight: '400', fontSize: 13, }}>Forgot Password </Text>
                </TouchableOpacity>
              </View>
            </View>

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
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    borderRadius: 1,
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 4,
  },
  input: {
    height: 45,
    color: '#3E3E3E',
    paddingLeft: 15,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 20,
    borderColor: '#000000',
    borderWidth: 0.8,
    borderRadius: 20,
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
    width: 120,
    height: 170,
    justifyContent: 'center',
    resizeMode: 'contain'
  }
});



