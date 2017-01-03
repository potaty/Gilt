import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  View
} from 'react-native'
import Profile from './src/pages/profile'

export default class GithubClient extends Component {
  render() {
    return (
      <Profile />
    )
  }
}

AppRegistry.registerComponent('GithubClient', () => GithubClient)
