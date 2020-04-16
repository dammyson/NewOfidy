import { StyleSheet } from 'react-native'
const container = {
  display: 'flex',
  flex: 1
}
export default StyleSheet.create({
  placeholder: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 20
  },
  input: {
    height: 36,
    marginTop: 10,
    padding: 6,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    textAlign: 'left',
    fontSize: 16
  },
  toolbar: {
    height: 80,
    padding: 14,
    backgroundColor: '#004701',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  bg: {
    ...container
    // backgroundColor: 'grey'
  },
  webview: {
    ...container
  },
  _webview: {
    ...container,
    display: 'none'
  }
})
