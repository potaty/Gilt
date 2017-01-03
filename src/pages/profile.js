import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Text,
  Image,
  View,
  ToolbarAndroid,
} from 'react-native'

console.log(ToolbarAndroid)

const loginHandler = () => {
  var myHeaders = new Headers()

  var myInit = { method: 'GET',
                 headers: myHeaders,
                 mode: 'cors',
                 cache: 'default' }

  fetch('https://api.github.com/authorizations',myInit)
  .then(function(response) {
    console.warn(response)
  })
  .then(function(myBlob) {
    var objectURL = URL.createObjectURL(myBlob)
    myImage.src = objectURL
  })
  return 'fetch'
}


export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = { username: 'username', password: 'password'}
  }
  onActionSelected(position) {
    if (position === 0) { // index of 'Settings'
      showSettings()
    }
  }
  render() {
    return (
      <View>
        <ToolbarAndroid style={styles.toolbar}
          title="Profile"
          actions={[{title: 'Settings', show: 'always'}]}
          onActionSelected={this.onActionSelected} />
        <View style={styles.container}>
          <Image
            style={styles.head}
            source={require('../../pic/head.png')}
          />
          <Text value={"Magica"}></Text>
          <Button title="Repositor"/>
          <Button title="Regist"/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  head: {
    height: 50,
    width: 50,
  },
  toolbar: {
    backgroundColor: '#e9eaed',
    height: 56,
  }
})
