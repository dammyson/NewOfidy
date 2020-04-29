import React, { Component } from 'react'
import {
  WebView,
  StyleSheet,
  BackHandler,
  View,
  Dimensions,
  Text,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native'
import Modal, { SlideAnimation, ModalContent } from 'react-native-modals';
import {
  MaterialIndicator,
} from 'react-native-indicators';


import GestureView from 'react-native-gesture-view'
import { Icon, } from 'react-native-elements'
import { PROXY_DOMAIN } from '../constants'
import { Actions } from 'react-native-router-flux';

export default class BrowserWebView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      title: '',
      aut: '',
      user_id: '',
      session_id: '',
      is_visible_choose_color: false,
      is_visible_choose_qty: false,
      is_visible_choose_size: false,
      qty: 1,
      color: 'default',
      size: 'default',
      loading_addcart: false

    };
  }

  componentDidMount() {
    this.setState({ id: this.props.id });
    AsyncStorage.getItem('user_id').then((value) => {
      this.setState({ 'user_id': value.toString() })
    })
    AsyncStorage.getItem('session_id').then((value) => {
      this.setState({ 'session_id': value.toString() })
    })
    AsyncStorage.getItem('aut').then((value) => {
      this.setState({ 'aut': value.toString() })
    })
  }
  addTocart() {
    const { data, aut, user_id, session_id, qty, color, size, } = this.state
    this.setState({ is_visible_choose_color: false, })

    

    this.setState({ loading_addcart: true})

    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('session_id', session_id);
    formData.append('quantity', qty);
    formData.append('size', size);
    formData.append('colour', color);
    formData.append('url', data.url);
    formData.append('ttl',data.title);
    formData.append('app', Platform.OS);
    formData.append('guestlogin', 0);

    console.warn(formData)

    fetch('https://www.ofidy.com/asp_files/write_text.php', { method: 'POST',  headers: {
      Accept: 'application/json',
    }, body:formData,  
    })
    .then(res => res.text())
    .then(res => {
      console.warn(res);
      if(res.includes("Success")){
         this.setState({ loading_addcart: false})
       Alert.alert('Success', 'Thank you. has been submitted, and should appear in your cart within the next 2-3 minutes', [{text: 'Okay'}])
      }else{
        Alert.alert('Action Fail', 'Please try to add your item to cart again', [{text: 'Okay'}])
        this.setState({ loading_addcart: false})
      }
    }).catch((error)=>{
      console.warn(error);
      this.setState({ loading_addcart: false})
      alert(error.message);
   });

  }
  getValue = url => {
    const regEx = new RegExp(PROXY_DOMAIN, 'i')
    return regEx.test(url) ? this.props.input : url
  }

  _onNavigationStateChange(webViewState) {
    if(webViewState.url.includes('shopping-cart.php?user_id=')){
      this.props.setInput(this.getValue('ofidy.com'))
    }else{
      this.props.setInput(this.getValue(webViewState.url))
    }
   
    this.setState({
      data: webViewState,

    })
  }
  home() {
    this.props.cleanSearchUrl('https://www.ofidy.com/shopping-browser-welcome.php')
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.goBack.bind(this))
  }

  goBack() {
    this.props.goBack(this.webview)
    return true
  }
  goReload() {
    console.warn(this.state.data.url);
    this.props.cleanSearchUrl(this.state.data.url)
   
  }
  cart() {
    const { user_id, session_id,} = this.state
    this.props.cleanSearchUrl('https://www.ofidy.com/shopping-cart.php?user_id='+user_id+'&session_id='+session_id+ '&currency=NGN')
  }

  goForward() {
    this.props.goForward(this.webview)
  }

  render() {
    const { url, loading, onLoadEnd } = this.props
    const _style = loading
      ? styles._webview
      : styles.webview

    return (
      <View style={{ flex: 1 }}>
    

      <View style={{ flex: 1 }}>

          <GestureView
            style={_style}
            onSwipeLeft={this.goForward.bind(this)}
            onSwipeRight={this.goBack.bind(this)}>
            <WebView
              ref={c => (this.webview = c)}
              source={{ uri: url }}
              onLoadEnd={this.props.onLoadEnd}
              onNavigationStateChange={this._onNavigationStateChange.bind(this)}
              renderLoading={true}
            />
          </GestureView>
        </View>

        <View style={{ backgroundColor: '#004701', flexDirection: 'row', height: 45 }}>


          <View style={{ alignSelf: "center", marginLeft: 10 }}>
            <TouchableOpacity onPress={() => this.goBack()}>
              <Icon
                active
                name="left"
                type='antdesign'
                color='#D3D3D3'
              />

            </TouchableOpacity>

          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: "center", }}>
            <TouchableOpacity  onPress={()=> this.cart()} style={{ marginRight: 30 }}>
              <Icon
                active
                name="shoppingcart"
                type='antdesign'
                color='#D3D3D3'
              />

            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.home()}>
              <Icon
                active
                name="home"
                type='antdesign'
                color='#D3D3D3'
                size={30}

              />
            </TouchableOpacity>



            {!loading ?
           <TouchableOpacity onPress={() => this.goReload()} style={{ marginLeft: 30}}>
           <Icon
             active
             name="refresh"
             type='material-community'
             color='#D3D3D3'
           />

         </TouchableOpacity> 
          :
          <View  style={{ marginLeft: 30}}>
          <ActivityIndicator size="small" color="#fff" />
          </View>
          }


          </View>


          <View style={{ alignSelf: "center", marginRight: 10 }}>
            <TouchableOpacity onPress={() => this.goForward()}>
              <Icon
                active
                name="right"
                type='antdesign'
                color='#D3D3D3'
              />
            </TouchableOpacity>
          </View>


        </View>

        {
                this.state.loading_addcart ?

        <TouchableOpacity  style={styles.fab} >
         <MaterialIndicator color='white' />
        </TouchableOpacity>
        :
        <TouchableOpacity  onPress={() => this.setState({ is_visible_choose_qty: true })} style={styles.fab} >
        <Icon
          active
          name="cart-plus"
          type='material-community'
          color='#fff'
          size={25}
        />
      </TouchableOpacity>

  }


        <Modal
          visible={this.state.is_visible_choose_qty}
          modalAnimation={new SlideAnimation({
            slideFrom: 'right',
          })}
        >
          <ModalContent style={styles.modal}>
            <View>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingTop: 1, }}>
                <TouchableOpacity onPress={() => this.setState({ is_visible_choose_qty: false })} style={{ marginLeft: 10, backgroundColor: '#000' }}>
                  <Icon
                    name="close"
                    size={20}
                    type='antdesign'
                    color="#fff"
                  />
                </TouchableOpacity>

              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 1, paddingBottom: 10 }}>
                <Text style={styles.modal_title}>Quantity? </Text>
                <Text style={styles.modal_text}>Enter the quantity you want  </Text>


              </View>
              <View style={{ paddingTop: 1, paddingBottom: 10, }}>
                <TextInput
                  placeholder="Enter your quantity"
                  placeholderTextColor='#3E3E3E'
                  returnKeyType="next"
                  onSubmitEditing={() => this.setState({ is_visible_choose_qty: false, is_visible_choose_size: true, })}
                  keyboardType='numeric'
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                  inlineImageLeft='ios-call'
                  onChangeText={text => this.setState({ gty: text })}
                  ref={(input) => this.passwordInput = input}
                />

              </View>
              <TouchableOpacity onPress={() => this.setState({ is_visible_choose_qty: false, is_visible_choose_size: true, })} style={styles.proceed_btn}    >


                <Text style={{ color: '#fdfdfd', fontWeight: '400' }}>Proceed </Text>

              </TouchableOpacity>
            </View>
          </ModalContent>
        </Modal>

        <Modal
          visible={this.state.is_visible_choose_size}
          modalAnimation={new SlideAnimation({
            slideFrom: 'right',
          })}
        >
          <ModalContent style={styles.modal}>
            <View>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingTop: 1, }}>
                <TouchableOpacity onPress={() => this.setState({ is_visible_choose_size: false })} style={{ marginLeft: 10, backgroundColor: '#000' }}>
                  <Icon
                    name="close"
                    size={20}
                    type='antdesign'
                    color="#fff"
                  />
                </TouchableOpacity>

              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 1, paddingBottom: 10 }}>
                <Text style={styles.modal_title}>Size? </Text>
                <Text style={styles.modal_text}>If size applies to your item please choose the size you want. Else click cancel  </Text>


              </View>
              <View style={{ paddingTop: 1, paddingBottom: 10, }}>
                <TextInput
                  placeholder="Enter your Size"
                  placeholderTextColor='#3E3E3E'
                  returnKeyType="next"
                  onSubmitEditing={() => this.setState({ is_visible_choose_size: false, is_visible_choose_color: true, })}
                  keyboardType='default'
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                  inlineImageLeft='ios-call'
                  onChangeText={text => this.setState({ size: text })}
                  ref={(input) => this.passwordInput = input}
                />

              </View>
              <TouchableOpacity onPress={() => this.setState({ is_visible_choose_size: false, is_visible_choose_color: true, })} style={styles.proceed_btn}  >


                <Text style={{ color: '#fdfdfd', fontWeight: '400' }}>Proceed </Text>

              </TouchableOpacity>
            </View>
          </ModalContent>
        </Modal>

        <Modal
          visible={this.state.is_visible_choose_color}
          modalAnimation={new SlideAnimation({
            slideFrom: 'right',
          })}
        >
          <ModalContent style={styles.modal}>
            <View>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingTop: 1, }}>
                <TouchableOpacity onPress={() => this.setState({ is_visible_choose_color: false })} style={{ marginLeft: 10, backgroundColor: '#000' }}>
                  <Icon
                    name="close"
                    size={20}
                    type='antdesign'
                    color="#fff"
                  />
                </TouchableOpacity>

              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 1, paddingBottom: 10 }}>
                <Text style={styles.modal_title}>Colour? </Text>
                <Text style={styles.modal_text}>If colour applies to your item please write the colour you want. Else click cancel </Text>


              </View>
              <View style={{ paddingTop: 1, paddingBottom: 10, }}>
                <TextInput
                  placeholder="Enter your colour"
                  placeholderTextColor='#3E3E3E'
                  returnKeyType="next"
                  onSubmitEditing={() => this.addTocart()}
                  keyboardType='default'
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                  inlineImageLeft='ios-call'
                  onChangeText={text => this.setState({ color: text })}
                  ref={(input) => this.passwordInput = input}
                />

              </View>
              <TouchableOpacity style={styles.proceed_btn} onPress={() => this.addTocart()} >


                <Text style={{ color: '#fdfdfd', fontWeight: '400' }}>Proceed </Text>

              </TouchableOpacity>
            </View>
          </ModalContent>
        </Modal>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  webview: {
    flex: 1
  },
  _webview: {
    flex: 1,
    display: 'none'
  },
  fab: {
    height: 60,
    width: 60,
    borderRadius: 200,
    position: 'absolute',
    bottom: 55,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004701',
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
  proceed_btn: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#004701',
  },
  modal: {
    width: Dimensions.get('window').width - 30,
  },
  modal_title: {
    color: '#000',
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 10,
    marginTop: 5,
  },
  modal_text: {
    fontSize: 14,
    textAlign: 'center',
    paddingBottom: 10,
    marginTop: 10,
  }
})
