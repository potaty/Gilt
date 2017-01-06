import React from 'react'
import { StyleSheet, ToolbarAndroid, WebView, View } from 'react-native'

import http from '../http'

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#263238',
    height: 56,
  },
})

export default class Readme extends React.Component {
  state = { readme: '' }

  async componentDidMount() {
    const readme = await (await http.get(`/repos/${this.props.route.title}/readme`,
      'application/vnd.github.VERSION.html')).text()
    this.setState({
      readme: readme,
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ToolbarAndroid style={styles.toolbar} title="README" titleColor="#ffffff" />
        { !!this.state.readme && <WebView source={{ html: this.state.readme }} /> }
      </View>
    )
  }
}
