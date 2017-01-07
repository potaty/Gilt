import React from 'react'
import { AppRegistry, BackAndroid, Navigator } from 'react-native'

import routes from './src/routes'
import Profile from './src/pages/profile'
import Auth from './src/pages/auth'
import Repository from './src/pages/repository'
import Readme from './src/pages/readme'
import Dashboard from './src/pages/dashboard'
import Notification from './src/pages/notification'
import UserList from './src/pages/user-list'
import Issue from './src/pages/issue'
import IssueList from './src/pages/issue-list'

class GiltApplication extends React.Component {
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
      case 'LOGIN':
        return <Auth route={route} navigator={navigator} />
      case 'DASHBOARD':
        return <Dashboard route={route} navigator={navigator} />
      case 'REPOSITORY':
        return <Repository route={route} navigator={navigator} />
      case 'README':
        return <Readme route={route} navigator={navigator} />
      case 'PROFILE':
        return <Profile route={route} navigator={navigator} />
      case 'NOTIFICATION':
        return <Notification route={route} navigator={navigator} />
      case 'USER_LIST':
        return <UserList route={route} navigator={navigator} />
      case 'ISSUE':
        return <Issue route={route} navigator={navigator} />
      case 'ISSUE_LIST':
        return <IssueList route={route} navigator={navigator} />
    }
  }
  render() {
    return (
      <Navigator initialRoute={routes[1]} renderScene={this.renderScene}
        configureScene={() => Navigator.SceneConfigs.FloatFromBottomAndroid} />
    )
  }
}

AppRegistry.registerComponent('Gilt', () => GiltApplication)
