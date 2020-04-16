import React, { Component } from 'react'
import {
  WebView,
  StyleSheet,
  BackHandler,
  View,
  Text,
  TouchableOpacity
} from 'react-native'



import GestureView from 'react-native-gesture-view'
import { Icon, } from 'react-native-elements'
import { PROXY_DOMAIN } from '../constants'

export default class BrowserWebView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      title:''
    };
  }

addTocart(){
console.warn(this.state.data.title)
}
  getValue = url => {
    const regEx = new RegExp(PROXY_DOMAIN, 'i')
    return regEx.test(url) ? this.props.input : url
  }

  _onNavigationStateChange(webViewState){
    this.props.setInput(this.getValue(webViewState.url))
    this.setState({
      data: webViewState,
     
    })
    console.warn(webViewState.url )
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
        {loading ?console.warn("loading page"): console.warn("Done loading page")}

      
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
        />
      </GestureView>
        </View>

        <View style={{ backgroundColor: '#004701', flexDirection: 'row', height: 45 }}>


          <View style={{ alignSelf: "center",marginLeft:10 }}>
            <TouchableOpacity onPress={()=>this.goBack()}>
            <Icon
              active
              name="left"
              type='antdesign'
              color='#D3D3D3'
            />

            </TouchableOpacity>
           
          </View>
          <View style={{ flex: 1 , flexDirection:'row', justifyContent:'center', alignSelf: "center", }}>
          <TouchableOpacity style={{ marginRight:30 }}>
            <Icon
              active
              name="shoppingcart"
              type='antdesign'
              color='#D3D3D3'
            />

            </TouchableOpacity>
           
          <TouchableOpacity onPress={()=>this.home()}>
          <Icon
              active
              name="home"
              type='antdesign'
              color='#D3D3D3'
              size={30}

            />
          </TouchableOpacity>


          <TouchableOpacity  style={{ marginLeft:30 }}>
            <Icon
              active
              name="bars"
              type='antdesign'
              color='#D3D3D3'
            />

            </TouchableOpacity>
           
          </View>


          <View style={{ alignSelf: "center",marginRight:10 }}>
          <TouchableOpacity onPress={()=>this.goForward()}>
            <Icon
              active
              name="right"
              type='antdesign'
              color='#D3D3D3'
            />
            </TouchableOpacity>
          </View>


        </View>

        <TouchableOpacity onPress={()=>this.addTocart()} style={styles.fab} >
                        <Icon
                            active
                            name="cart-plus"
                            type='material-community'
                            color='#fff'
                            size={25}
                        />
                    </TouchableOpacity>
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
})
