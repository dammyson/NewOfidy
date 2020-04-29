// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, TextInput, StatusBar, View, Dimensions, WebView, Image, ScrollView, ActivityIndicator, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, Text, Right, Icon, Button, Left, } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {
  BarIndicator,
} from 'react-native-indicators';

const URL = require("../../component/server");
import Navbar from '../../component/Navbar';
import colors from '../../component/color';
import GestureView from 'react-native-gesture-view'

export default class Cart extends Component {

  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.state = {
      loading: false,
      aut: '',
      user_id: '',
      session_id: '',


    }

  }

  componentDidMount() {
    this.setState({ id: this.props.id });
    AsyncStorage.getItem('user_id').then((value) => {
      this.setState({ 'user_id': value.toString() })
      console.log(value)
    })
    AsyncStorage.getItem('session_id').then((value) => {
      this.setState({ 'session_id': value.toString() })
      console.log("s      ", value)
    })
    AsyncStorage.getItem('aut').then((value) => {
      this.setState({ 'aut': value.toString() })
    })
    // this.addTocart();
  }



  addTocart() {


    const formData = new FormData();
    formData.append('user_id', "3B19C4EC-4D5F-4FCF-AA35-CE8FF769069B");
    formData.append('session_id', '337BFE1E-DEB2-4356-B051-68A9B849E3EC');
    formData.append('currency', "NGN");

    console.warn(formData)

    fetch('https://www.ofidy.com/shopping-cart.php', {
      method: 'POST', headers: {
        Accept: 'application/json',
      }, body: formData,
    })
      .then(res => res.text())
      .then(res => {
        console.warn(res);
      }).catch((error) => {
        console.warn(error);
        this.setState({ loading_addcart: false })
        alert(error.message);
      });

  }
  goBack() {
    this.props.goBack(this.webview)
    return true
  }

  goForward() {
    this.props.goForward(this.webview)
  }

  _onNavigationStateChange(webViewState) {


  }


  render() {
    const { user_id, session_id, } = this.state
    let formdata = new FormData();
    formdata.append('user_id', "3B19C4EC-4D5F-4FCF-AA35-CE8FF769069B");
    formdata.append('session_id', '337BFE1E-DEB2-4356-B051-68A9B849E3EC');
    formdata.append('currency', "NGN");

    var left = (
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={() => Actions.pop()}>
          <Icon
            active
            name="ios-arrow-back"
            type='ionicon'
            color='#FFF'
          />
        </Button>
      </Left>
    );
    var right = (
      <Right>
        <Button onpress={() => this.webview.reload()} transparent>
          <Icon
            active
            name="refresh"
            color='#FFF'
          />
        </Button>
      </Right>
    );
    return (
      <View style={styles.body}>
        <View style={{ height: 60, padding: 14, backgroundColor: '#004701', alignItems: 'center', flexDirection: 'row' }}>
          <Button style={{ backgroundColor: '#004701' }} onPress={() => Actions.pop()}>
            <Icon
              active
              name="ios-arrow-back"
              type='ionicon'
              color='#fff'
            />
          </Button>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.title}>Cart</Text>
          </View>
          <Button style={{ backgroundColor: '#004701' }} onpress={() => this.webview.reload()}  >
            <Icon
              active
              name="refresh"
              color='#fff'
            />
          </Button>

        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <WebView
            ref={c => (this.webview = c)}
            source={{ uri: 'https://m.ofidy.com/shopping-cart.php?user_id=' + user_id + '&session_id=' + session_id + '&currency=NGN', }}
            onLoadEnd={this.props.onLoadEnd}
            onNavigationStateChange={this._onNavigationStateChange.bind(this)}
          /></ScrollView>

      </View>

    );
  }



  itemClicked(item) {
    Actions.product();
  }



}
const styles = StyleSheet.create({
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
    backgroundColor: 'red',
  },
  title: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'NunitoSans-Bold'
  }

});



