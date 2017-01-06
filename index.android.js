import React from 'react'
import { Alert, AppRegistry, BackAndroid, Button, Navigator, StyleSheet, TextInput, View } from 'react-native'

import routes from './src/routes'
import Profile from './src/pages/profile'
import Auth from './src/pages/auth'
import Welcome from './src/pages/welcome'
import Repository from './src/pages/repository'
import Readme from './src/pages/readme'

class GithubClient extends React.Component {
  initNavigator = navigator => {
    this.navigator = navigator
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (navigator.getCurrentRoutes().length !== 1) {
        this.navigator.pop()
        return true
      }
      return false
    })
  }
  renderScene = (route, navigator) => {
    if (!this.navigator) {
      this.initNavigator(navigator)
    }
    switch (route.name) {
      case 'WELCOME':
        return <Welcome route={route} navigator={navigator} />
      case 'LOGIN':
        return <Auth route={route} navigator={navigator} />
      case 'DASHBOARD':
        return <Profile route={route} navigator={navigator} />
      case 'REPOSITORY':
        return <Repository route={route} navigator={navigator} />
      case 'README':
        return <Readme route={route} navigator={navigator} />
    }
  }
  render() {
    return (
      <Navigator initialRoute={routes[0]} renderScene={this.renderScene} />
    )
  }
}

AppRegistry.registerComponent('GithubClient', () => GithubClient)
