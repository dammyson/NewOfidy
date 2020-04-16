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


export default class Login extends Component {
 
  constructor(props) 
  {
      super(props);
      this.emailRef = React.createRef();
      this.state = {
        loading: false,
        email: "", 
        password: "",
        demail: "", 
        token: "", 

                  }

  }
  componentDidMount() {
       

  }

  componentWillMount() {
    if(this.props.email) {
    //  this.setState({email: this.props.email});
    }
  }



  checkLogin(){
   
          let mail = "";
          const {email, demail,isChecked, token, password} = this.state
           if(email == "" ){
           
           if(demail == "" ){
             Alert.alert('Validation failed', 'Email field cannot be empty', [{text: 'Okay'}])
             return
           }else{
             mail = demail;
           }
          
         }else{
           mail = email;
         }
           if(password == "" ){
             Alert.alert('Validation failed', 'Password field cannot be empty', [{text: 'Okay'}])
             return
           }

         this.setState({ loading: true}) 
         const formData = new FormData();
         formData.append('feature', "user");
         formData.append('action', "login");
         formData.append('email', mail);
         formData.append('password', password);

         fetch('https://www.ita-obe.com/mobile/v1/user.php', { method: 'POST',  headers: {
            Accept: 'application/json',
         }, body:formData,  
        })
         .then(res => res.json())
         .then(res => {
          this.setState({ loading: false})
        console.warn(res);
          if(!res.error){
            AsyncStorage.setItem('aut', "yes");
            AsyncStorage.setItem('email', mail);
            AsyncStorage.setItem("user_id",  res.id);
            AsyncStorage.setItem("session_id",  res.sid);
            AsyncStorage.setItem("first",  res.id);
            AsyncStorage.setItem("last",  res.id);
            Actions.home()
            }else{
              if(res.message =='Please update password'){
                Actions.changepassword()
              }else{
                Alert.alert('Login failed', "Check your email and password", [{text: 'Okay'}])
                this.setState({ loading: false})
              }
             
              
            }


         }).catch((error)=>{
           console.log("Api call error");
           console.warn(error);
           alert(error.message);
           this.setState({ loading: false})
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
              <Text style={{ color: colors.primary_color, margin: 20, fontWeight: '900', fontSize: 25, }}>Sign In </Text>
              <View style={styles.bottom}>

                <TextInput
                  placeholder="Enter your email address"
                  placeholderTextColor='#3E3E3E'
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  keyboardType='email-address'
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                  inlineImageLeft='ios-call'
                  onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor='#3E3E3E'
                  secureTextEntry
                  returnKeyType="next"
                  onSubmitEditing={() => this.checkLogin()}
                  keyboardType='password'
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                  inlineImageLeft='ios-call'
                  onChangeText={text => this.setState({ password: text })}
                  ref={(input)=> this.passwordInput = input}
                />
                {
                  this.state.loading ?
                    <View>
                      <Button style={styles.buttonContainer} block iconLeft>
                        <BarIndicator count={4} color={color.primary_color} />
                      </Button>
                    </View>
                    :
                    <View>
                      <Button onPress={() => Actions.checkLogin()} style={styles.buttonContainer} block iconLeft>
                        <Text style={{ color: '#fdfdfd', fontWeight: '600' }}>SIGN IN </Text>
                      </Button>
                    </View>
                }



<View style={{ flexDirection: 'row', marginTop: 20, marginLeft:30, marginRight:30}}>
                                    <TouchableOpacity onPress={()=> Actions.reg({type: 'replace'})}>
                                        <Text style={{ color: colors.primary_color, fontWeight: '600', fontSize: 13, }}>Create New Account  </Text>
                                        </TouchableOpacity>    
                                        <View style={{ flex: 1, justifyContent: 'center', }} />



                                        <View style={{ width: 1, backgroundColor: colors.primary_color }} />

                                        <View style={{ flex: 1, justifyContent: 'center', }} />



                                        <TouchableOpacity onPress={()=> Actions.forgot({type: 'replace'})}>
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
    width: 120,
    height: 170,
    justifyContent: 'center',
    resizeMode: 'contain'
  }
});



