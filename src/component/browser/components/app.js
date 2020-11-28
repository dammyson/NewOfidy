import React from 'react'
import {
  Text,
  View
} from 'react-native'

import styles from '../styles'
import OmniSearch from './omniSearch'
import BrowserWebView from './browserWebview'

export default (props) => {
  const { url, loading } = props
  return (
    <View style={styles.bg}>
      <BrowserWebView {...props} />
    </View>
  )
}
