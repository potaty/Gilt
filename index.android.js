import React from 'react'
import { Alert, AppRegistry, Button, Navigator, StyleSheet, TextInput, View } from 'react-native'

import routes from './src/routes'
import Profile from './src/pages/profile'
import Auth from './src/pages/auth'
import Welcome from './src/pages/welcome'

class GithubClient extends React.Component {
  renderScene(route, navigator) {
    switch (route.name) {
      case 'DASHBOARD':
        return <Profile navigator={navigator} />
      case 'WELCOME':
        return <Welcome navigator={navigator} />
      case 'LOGIN':
        return <Auth navigator={navigator} />
    }
  }
  render() {
    return (
      <Navigator initialRoute={routes[1]} initialRouteStack={routes}
        renderScene={this.renderScene} />
    )
  }
}

AppRegistry.registerComponent('GithubClient', () => GithubClient)
