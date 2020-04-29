import React, { Component } from 'react'
import {
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { Icon, } from 'react-native-elements'


export default class OmniSearch extends Component {

  async componentDidMount() {
  this.props.cleanSearchUrl('https://ofidy.com/shopping-browser.php')
  }

  onSubmitEditing = _ => {
    this.props.cleanSearchUrl(this.props.input)
  }

  render () {
    const { loading } = this.props
    return (
      <View style={styles.toolbar}>
        <TextInput
          underlineColorAndroid='rgba(0,0,0,0)'
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.input}
          onChangeText={this.props.setInput}
          onSubmitEditing={this.onSubmitEditing}
          value={this.props.input}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  placeholder: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 20
  },
  input: {
    height: 36,
    marginTop: 10,
    padding: 6,
   flex:1,
    backgroundColor: 'white',
    borderRadius: 5,
    textAlign: 'left',
    fontSize: 16
  },
  toolbar: {
    height: 80,
    padding: 14,
    backgroundColor: '#004701',
    flexDirection: 'row',
    alignItems: 'center',
  },
})