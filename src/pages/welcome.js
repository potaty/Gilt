import React from 'react'
import { Button, Image, StyleSheet, View } from 'react-native'

import routes from '../routes'
import WelcomeImage from '../images/welcome.png'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 275,
    height: 236,
    marginBottom: 50,
  },
})

export default class Welcome extends React.Component {
  handlePress = () => {
    this.props.navigator.push(routes[2])
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={WelcomeImage} style={styles.image} />
        <Button title="    Login with GitHub account    " color="#424242"
          onPress={this.handlePress} />
      </View>
    )
  }
}
