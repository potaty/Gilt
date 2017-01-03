import React from 'react'
import { StyleSheet, Text, ToolbarAndroid, View, WebView } from 'react-native'

import routes from '../routes'
import { CLIENT_ID, CLIENT_SECRET } from '../config'

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
      global.TOKEN = body.access_token
      this.props.navigator.replace(routes[2])
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
