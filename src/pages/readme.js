import React from 'react'
import { StyleSheet, ToolbarAndroid, WebView, View } from 'react-native'

import http from '../http'

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#263238',
    height: 56,
  },
})

// README 页面
export default class Readme extends React.Component {
  state = { readme: '' }

  async componentDidMount() {
    // API 可以获得 HTML 版本，使用 webview 渲染。
    const readme = await (await http.get(`/repos/${this.props.route.repo}/readme`,
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
