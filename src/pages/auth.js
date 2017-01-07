import React from 'react'
import { StyleSheet, Text, ToolbarAndroid, View, WebView } from 'react-native'

import { CLIENT_ID, CLIENT_SECRET } from '../config'
import routes from '../routes'

const authURI = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user%20repo%20read:org`

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default class Auth extends React.Component {
  handleNavigationStateChange = async (state) => {
    if (state.url.indexOf('?code=') !== -1) {
      const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code: /\?code=(\w+)/.exec(state.url)[1],
        }),
      })
      const body = await response.json()
      if (!global.ACCESS_TOKEN) {
        global.ACCESS_TOKEN = body.access_token
        console.log(body.access_token)
      }
      this.props.navigator.replace(Object.assign({}, routes[5]))
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid title="Login" />
        <WebView source={{ uri: authURI }}
          onNavigationStateChange={this.handleNavigationStateChange} />
      </View>
    )
  }
}
